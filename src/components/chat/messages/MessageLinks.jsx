export default function MessageLinks({ links }) {
  if (!links?.length) return null;

  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
      {links.map((link, i) => {
        const Icon = link.icon;
        return (
           <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text hover:border-accent hover:text-accent transition-colors"
          >
            {Icon && <Icon className="text-lg shrink-0" />}
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}