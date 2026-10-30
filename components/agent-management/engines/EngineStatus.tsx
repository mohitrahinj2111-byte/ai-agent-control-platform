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
        <h2 className="text-lg font-semibold text-white">
          Platform Engines
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Core control-plane modules — illustrative status only
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {engines.map((engine) => (
          <div
            key={engine.name}
            className="rounded-xl border border-white/10 bg-[#101927] p-4 text-white"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">
                {engine.name}
              </span>
              <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
                {engine.status}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-gray-400">
              {engine.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}