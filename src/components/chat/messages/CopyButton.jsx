import { useState } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {}
  }

  return (
    <button
      onClick={handleCopy}
      className="
        flex items-center gap-1.5
        rounded-md border border-border
        px-2.5 py-1
        text-[11px] text-text3
        transition-colors
        hover:border-border2
        hover:text-text1
      "
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}