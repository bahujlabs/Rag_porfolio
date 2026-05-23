import { memo } from "react";

function ThinkingIndicator() {
  return (
    <div
      className="flex gap-3 items-start animate-fadeUp"
      aria-live="polite"
      aria-label="Assistant is thinking"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-surface2 border-border2 text-accent shrink-0">
        <BotIcon />
      </div>

      <div className="flex items-center gap-1.5 px-4 py-3 border rounded-2xl rounded-bl-sm bg-surface border-border">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 120}ms` }}
            className="w-1.5 h-1.5 rounded-full bg-accent-dim animate-bounce"
          />
        ))}

        <span className="ml-1 text-xs italic text-text3">
          Thinking...
        </span>
      </div>
    </div>
  );
}

function BotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a2 2 0 0 1 2 2..." />
    </svg>
  );
}

export default memo(ThinkingIndicator);