import { NAV_ITEMS } from "../../constant/navigation.js";

export default function Sidebar({ sendMessage, isLoading }) {
  return (
    <aside className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-border bg-surface">
      
      {/* Header */}
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-accent">◈</span>

          <h1 className="font-head font-black tracking-tight text-lg">
            Portfolio
            <span className="text-accent">.ai</span>
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ label, cmd }) => (
          <button
            key={cmd}
            onClick={() => sendMessage(cmd)}
            disabled={isLoading}
            className="
              w-full rounded-xl px-3 py-2.5 text-left text-sm
              text-text2 transition-all duration-200
              hover:bg-surface2 hover:text-text1
              disabled:opacity-40
            "
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-4 border-t border-border">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#b8f67a]" />

        <span className="text-xs text-text3 tracking-wide uppercase">
          RAG Online
        </span>
      </div>
    </aside>
  );
}