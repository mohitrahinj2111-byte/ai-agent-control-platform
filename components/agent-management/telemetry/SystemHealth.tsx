"use client";

interface SystemHealthProps {
  totalAgents?: number;
  connectedAgents?: number;
  activeTasks?: number;
}

export default function SystemHealth({
  totalAgents = 6,
  connectedAgents = 4,
  activeTasks = 3,
}: SystemHealthProps) {
  const health = totalAgents
    ? Math.round((connectedAgents / totalAgents) * 100)
    : 0;

  return (
    <section className="rounded-xl border border-white/10 bg-[#101927] p-4 text-white">
      <h2 className="text-sm font-semibold">System Telemetry</h2>
      <p className="mt-1 text-xs text-gray-400">Workspace overview</p>

      <div className="mt-5 flex items-center gap-4">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-400 text-xl font-bold"
          style={{ boxShadow: "0 0 18px rgba(34,211,238,0.15)" }}
        >
          {health}%
        </div>
        <div>
          <p className="font-semibold">Connection Ratio</p>
          <p className="mt-1 text-xs text-gray-400">
            Demo workspace metrics
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-gray-400">Total Agents</p>
          <p className="mt-2 text-2xl font-bold">{totalAgents}</p>
        </div>

        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-gray-400">Connected</p>
          <p className="mt-2 text-2xl font-bold text-green-400">
            {connectedAgents}
          </p>
        </div>

        <div className="rounded-lg bg-white/5 p-3 col-span-2">
          <p className="text-xs text-gray-400">Active Tasks</p>
          <p className="mt-2 text-2xl font-bold">{activeTasks}</p>
        </div>
      </div>
    </section>
  );
}