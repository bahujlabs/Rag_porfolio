import { useRef, useState } from "react";

const SUGGESTIONS = [
  "What's your experience?",
  "Show me your projects",
  "What's your tech stack?",
  "How can I contact you?",
];

export default function InputBox({ onSend, onCancel, isLoading, showSources, onToggleSources, onClear }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }

  return (
    <div className="flex-shrink-0 border-t border-border bg-bg px-4 md:px-6 pt-3 pb-4">

      {/* Suggestion chips */}
      {!isLoading && value === "" && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSend(s)}
              className="text-xs text-text2 border border-border bg-surface px-3 py-1.5
                         rounded-full hover:border-accent-dim hover:text-text1 transition-colors
                         max-w-[260px] truncate"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="flex gap-2 items-end bg-surface border border-border rounded-xl
                      px-4 py-2 focus-within:border-border2 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          rows={1}
          disabled={isLoading}
          placeholder="Ask anything or type /help for commands…"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          className="flex-1 bg-transparent border-none outline-none resize-none
                     text-text1 text-sm font-mono placeholder-text3
                     min-h-[24px] max-h-[140px] py-1
                     disabled:opacity-60 disabled:cursor-not-allowed"
        />

        {/* Stop / Send */}
        {isLoading ? (
          <button
            onClick={onCancel}
            aria-label="Stop"
            className="flex-shrink-0 w-9 h-9 rounded-lg bg-surface2 border border-border2
                       text-text2 flex items-center justify-center
                       hover:border-error hover:text-error transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!value.trim()}
            aria-label="Send"
            className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent text-bg
                       flex items-center justify-center
                       hover:opacity-85 transition-opacity
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between pt-2.5">

        {/* Clear */}
        <button
          onClick={onClear}
          title="Clear chat"
          className="flex items-center gap-1.5 text-[12px] text-text3 hover:text-text2
                     transition-colors px-1.5 py-1 rounded"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6M9 6V4h6v2" />
          </svg>
          Clear
        </button>

        {/* Sources toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text3">Show AI Sources</span>
          <button
            role="switch"
            aria-checked={showSources}
            aria-label="Toggle AI sources"
            onClick={onToggleSources}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200
              ${showSources ? "bg-accent" : "bg-border2"}`}
          >
            <span
              className={`absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white
                          transition-transform duration-200
                          ${showSources ? "translate-x-4" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
