import AgentCanvas from "@/components/agent-management/canvas/AgentCanvas";
import SystemHealth from "@/components/agent-management/telemetry/SystemHealth";
import ActivityFeed from "@/components/agent-management/telemetry/ActivityFeed";
import ResourceUsage from "@/components/agent-management/telemetry/ResourceUsage";
import EngineStatus from "@/components/agent-management/engines/EngineStatus";
import ControlChat from "@/components/agent-management/chat/ControlChat";

export default function AgentManagementPage() {
  return (
    <main className="min-h-screen space-y-6 bg-[#080D16] p-4 text-white sm:p-6">

      {/* Workspace Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            AI Agent Control Plane
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Agent Workspace
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Visualize and manage your company's AI workforce.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-300">
            Demo Workspace
          </span>
        </div>
      </header>

      {/* Main Workspace */}
      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">

        {/* Central Agent Canvas */}
        <div className="min-w-0 overflow-hidden rounded-xl">
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

      {/* Bottom Platform Engines */}
      <section>
        <EngineStatus />
      </section>

      {/* Floating AI Command Chat */}
      <ControlChat />

    </main>
  );
}