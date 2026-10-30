import Link from "next/link";

const agents = [
  {
    id: "agent-001",
    name: "Research Agent",
    type: "Research",
    status: "Connected",
    description: "Handles research and information analysis.",
  },
  {
    id: "agent-002",
    name: "Data Agent",
    type: "Data Processing",
    status: "Disconnected",
    description: "Handles data processing and analysis.",
  },
  {
    id: "agent-003",
    name: "Support Agent",
    type: "Customer Support",
    status: "Pending",
    description: "Handles customer support tasks.",
  },
];

export default function AgentsPage() {
  return (
    <div className="space-y-8 text-white">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Agents</h1>
          <p className="mt-2 text-gray-400">
            Discover, manage and monitor your AI workforce.
          </p>
        </div>

        <Link
          href="/control-panel/add-agent"
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
        >
          + Add New Agent
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Agents", value: agents.length },
          {
            label: "Connected",
            value: agents.filter((a) => a.status === "Connected").length,
          },
          {
            label: "Disconnected",
            value: agents.filter((a) => a.status === "Disconnected").length,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-[#101927] p-5"
          >
            <p className="text-sm text-gray-400">{item.label}</p>
            <p className="mt-3 text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Agent List */}
      <div className="rounded-xl border border-white/10 bg-[#101927] p-5">
        <div className="mb-5">
          <h2 className="text-xl font-semibold">All Agents</h2>
          <p className="mt-1 text-sm text-gray-400">
            Your registered agent workspace.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-white/10 bg-[#080D16] p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{agent.name}</h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    agent.status === "Connected"
                      ? "bg-green-500/10 text-green-400"
                      : agent.status === "Disconnected"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {agent.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-400">
                {agent.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p className="text-gray-400">
                  Type: <span className="text-white">{agent.type}</span>
                </p>

                <p className="text-gray-400">
                  ID: <span className="text-white">{agent.id}</span>
                </p>
              </div>

              <Link
                href={`/agent-management/agents/${agent.id}`}
                className="mt-5 inline-block rounded-lg border border-blue-500/40 px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/10"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}