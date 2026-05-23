const COMMANDS = [
  "/about",
  "/skills",
  "/projects",
  "/contact",
];

export default function Banner({ onCommand }) {
  return (
    <section className="relative mx-auto mt-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface">
      {/* Background Grid */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.035]">
        <div className="banner-grid h-full w-full" />
      </div>

      {/* Glow Effects */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[380px] w-[700px] -translate-x-1/2 bg-accent/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-48 w-48 bg-accent/5 blur-2xl pointer-events-none"
      />

      {/* Content */}
      <div className="relative px-6 py-12 md:px-12 md:py-16">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            Available for Work · Open to Opportunities
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl font-head text-4xl font-black tracking-tight text-text1 md:text-6xl md:leading-[1.05]">
          Hey, I'm Bayo.{" "}
          <span className="block mt-1 text-accent">
            I build things that matter.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-sm leading-7 text-text2 md:text-base">
          Fullstack & AI engineer who turns ideas into production-ready products —
          from sleek frontends to scalable backends and intelligent AI systems.{" "}
          <span className="text-text1 font-medium">
            This assistant knows everything about my work.
          </span>{" "}
          Ask it anything, or try a command below.
        </p>

        {/* Command Pills */}
        <div className="mt-8 flex flex-wrap gap-3">
          {COMMANDS.map((command) => (
            <button
              key={command}
              onClick={() => onCommand?.(command)}
              className="
                group rounded-xl border border-border2
                bg-surface2 px-4 py-2
                font-mono text-xs text-text2
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-accent/30
                hover:bg-accent/5
                hover:text-text1
              "
            >
              <span className="opacity-60 group-hover:opacity-100">$</span>{" "}
              {command}
            </button>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-text3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            AI-Powered Assistant
          </div>
          <div>5+ Projects Shipped</div>
          <div>Fullstack · AI · DevOps</div>
        </div>

      </div>
    </section>
  );
}