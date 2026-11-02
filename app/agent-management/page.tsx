import AgentCanvas from "@/components/agent-management/canvas/AgentCanvas";
import SystemHealth from "@/components/agent-management/telemetry/SystemHealth";
import ActivityFeed from "@/components/agent-management/telemetry/ActivityFeed";
import ResourceUsage from "@/components/agent-management/telemetry/ResourceUsage";
import EngineStatus from "@/components/agent-management/engines/EngineStatus";
import ControlChat from "@/components/agent-management/chat/ControlChat";

export default function AgentManagementPage() {
  return (
    <div className="min-h-full space-y-6 bg-background p-4 text-foreground sm:p-6">

      {/* Workspace Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            AI Agent Control Plane
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Agent Workspace
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Visualize and manage your company&apos;s AI workforce.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-xs font-semibold text-blue-600">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Workspace Preview
        </div>
      </header>

      {/* Main Workspace */}
      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">

        {/* Central Agent Canvas */}
        <div className="min-h-[520px] min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <AgentCanvas />
        </div>

        {/* Right Telemetry Panel */}
        <aside className="min-w-0 space-y-4">

          <SystemHealth
            totalAgents={6}
            connectedAgents={4}
            activeTasks={3}
          />

          <ActivityFeed />

          <ResourceUsage />

        </aside>
      </section>

      {/* Platform Engines */}
      <section className="min-w-0">
        <EngineStatus />
      </section>

      {/* AI Command Chat */}
      <ControlChat />

    </div>
  );
}