"use client";

const engines = [
  {
    name: "Coordination Engine",
    description: "Coordinates managers and worker agents.",
    status: "Demo",
  },
  {
    name: "Execution Engine",
    description: "Responsible for agent task execution.",
    status: "Demo",
  },
  {
    name: "Policy Engine",
    description: "Responsible for permissions and policies.",
    status: "Demo",
  },
  {
    name: "Monitoring Engine",
    description: "Tracks agent health and activity.",
    status: "Demo",
  },
];

export default function EngineStatus() {
  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Platform Engines
        </h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Core control-plane modules — illustrative status only
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {engines.map((engine) => (
          <div
            key={engine.name}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-foreground transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">
                {engine.name}
              </span>

              <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                {engine.status}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
              {engine.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}