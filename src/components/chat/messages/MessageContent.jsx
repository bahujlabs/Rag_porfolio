import { renderMarkdown } from "../../../utils/markdown";
import StreamingCursor from "./StreamingCursor";

export default function MessageContent({ message }) {
  const isUser = message.role === "user";

  const html = !isUser
    ? renderMarkdown(message.content)
    : null;

  return (
    <div
      className={`
        relative rounded-2xl px-4 py-3 leading-relaxed

        ${
          isUser
            ? "rounded-br-sm border border-user-border bg-user-bg"
            : "rounded-bl-sm border border-border bg-surface"
        }
      `}
    >
      {isUser ? (
        <p className="whitespace-pre-wrap text-user-text">
          {message.content}
        </p>
      ) : (
        <div
          className="prose-rag"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      )}

      {message.isStreaming && <StreamingCursor />}
    </div>
  );
}