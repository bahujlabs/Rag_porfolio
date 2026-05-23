import { useCallback, useEffect, useRef, useState } from "react";
import { sendChat } from "../services/api.js";
import { handleCommand } from "../utils/commandHandler.js";

// ── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "rag-portfolio:chat";
const SESSION_KEY = "rag-portfolio:sessionId";
const API_BASE    = import.meta.env.VITE_API_URL ?? "";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeId() {
  return (
    (typeof crypto !== "undefined" && crypto.randomUUID?.()) ||
    `id_${Date.now()}_${Math.random().toString(36).slice(2)}`
  );
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt data */
  }
  const sessionId = localStorage.getItem(SESSION_KEY) ?? makeId();
  localStorage.setItem(SESSION_KEY, sessionId);
  return { sessionId, messages: [] };
}

// ── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useChat — all chat state, streaming, persistence and error handling.
 *
 * Returned values:
 *   sessionId  {string}
 *   messages   {Array}   — [{ id, role, content, sources, createdAt, isStreaming }]
 *   isLoading  {boolean}
 *   error      {string|null}
 *   sendMessage(input: string) => Promise<void>
 *   cancel()   => void   — abort an in-flight stream
 *   clear()    => void   — wipe history + localStorage
 */
export function useChat() {
  const initial    = useRef(loadState());
  const abortRef   = useRef(new AbortController());

  const [sessionId]           = useState(() => initial.current.sessionId);
  const [messages, setMessages] = useState(() => initial.current.messages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  // Persist to localStorage on every messages change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId, messages }));
  }, [sessionId, messages]);

  // ── Local streaming (slash commands only) ──────────────────────────────────
  // Simulates token-by-token reveal for slash-command responses
  // so they feel consistent with real streamed responses.

const streamLocal = useCallback(
  (fullText, sources, extras = {}) =>
    new Promise((resolve) => {
      const id = makeId();

      setMessages((prev) => [
        ...prev,
        {
          id,
          role: "assistant",
          content: "",
          sources: sources ?? [],
          createdAt: Date.now(),
          isStreaming: true,
          ...extras, // 👈 THIS is the key
        },
      ]);

      const tokens = fullText.split(/(\s+)/);
      let i = 0;

      const tick = () => {
        i += Math.max(1, Math.floor(tokens.length / 80));
        const next = tokens.slice(0, i).join("");

        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, content: next } : m))
        );

        if (i < tokens.length) {
          setTimeout(tick, 16);
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === id
                ? { ...m, content: fullText, isStreaming: false }
                : m
            )
          );
          resolve();
        }
      };

      tick();
    }),
  []
);

  // ── Real SSE streaming from backend ───────────────────────────────────────
  // Reads the response as a ReadableStream.
  // Backend must respond with Content-Type: text/event-stream and lines like:
  //   data: hello\n\n              ← plain text chunk
  //   data: {"chunk":"hi"}\n\n    ← JSON chunk (with optional sources at end)
  //   data: [DONE]\n\n            ← signals end of stream

  const streamFromBackend = useCallback(
    async (message) => {
      const id = makeId();

      // Add empty assistant bubble immediately so the UI shows something
      setMessages((prev) => [
        ...prev,
        {
          id,
          role: "assistant",
          content: "",
          sources: [],
          createdAt: Date.now(),
          isStreaming: true,
        },
      ]);

      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        throw new Error(`API error ${res.status}: ${text}`);
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer    = "";

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE splits events by double newline; keep any incomplete line in buffer
        const lines = buffer.split("\n");
        buffer = lines.pop(); // last element may be incomplete

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6).trim(); // strip "data: "
          if (data === "[DONE]") break;

          try {
            // ── JSON chunk (backend sends structured data) ──
            // Expected shape: { chunk?: string, sources?: Array }
            const parsed = JSON.parse(data);

            if (parsed.chunk) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === id ? { ...m, content: m.content + parsed.chunk } : m
                )
              );
            }

            if (parsed.sources) {
              setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, sources: parsed.sources } : m))
              );
            }
          } catch {
            // ── Plain text chunk ──
            setMessages((prev) =>
              prev.map((m) =>
                m.id === id ? { ...m, content: m.content + data } : m
              )
            );
          }
        }
      }

      // Mark bubble as done
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isStreaming: false } : m))
      );
    },
    [sessionId]
  );

  // ── sendMessage ────────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (input) => {
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;

      setError(null);

      // Add the user's message bubble
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "user", content: trimmed, createdAt: Date.now() },
      ]);

      // ── Slash command → handle locally, never hits the backend ──
      const command = handleCommand(trimmed);
      if (command) {
        setIsLoading(true);
        await streamLocal(
          command.answer,
          command.sources,
        {
          projects: command.projects,
          links: command.links,
          icon: command.icon,
        }
      );
              setIsLoading(false);
        return;
      }

      // ── RAG backend ──
      setIsLoading(true);
      try {
        if (API_BASE) {
          // Real streaming
          await streamFromBackend(trimmed);
        } else {
          // Dummy server (no real backend configured)
          const res = await sendChat({ message: trimmed, sessionId });
          await streamLocal(res.answer, res.sources);
        }
      } catch (e) {
        if (e.name === "AbortError") return; // user cancelled — no error shown

        const msg = e instanceof Error ? e.message : "Something went wrong.";
        setError(msg);
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content: `⚠️ ${msg}`,
            sources: [],
            createdAt: Date.now(),
            isStreaming: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, sessionId, streamLocal, streamFromBackend]
  );

  // ── cancel ─────────────────────────────────────────────────────────────────

  const cancel = useCallback(() => {
    abortRef.current.abort();
    abortRef.current = new AbortController(); // reset for next request

    setIsLoading(false);
    // Mark any still-streaming bubble as done
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m))
    );
  }, []);

  // ── clear ──────────────────────────────────────────────────────────────────

  const clear = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { sessionId, messages, isLoading, error, sendMessage, cancel, clear };
}
