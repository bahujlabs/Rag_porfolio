export default function MessageSources({ sources }) {
  return (
    <div className="w-full rounded-xl border border-border bg-surface2 p-3">
      
      <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-text3">
        Sources
      </p>

      <div className="space-y-2">
        {sources.map((source, index) => (
          <SourceCard
            key={index}
            source={source}
          />
        ))}
      </div>
    </div>
  );
}

function SourceCard({ source }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      
      {source.url ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-xs text-accent-dim
            transition-colors
            hover:text-accent
          "
        >
          {source.title}
        </a>
      ) : (
        <p className="text-xs font-medium text-text2">
          {source.title}
        </p>
      )}

      {source.snippet && (
        <p className="mt-1 text-[11px] leading-relaxed text-text3">
          {source.snippet}
        </p>
      )}
    </div>
  );
}