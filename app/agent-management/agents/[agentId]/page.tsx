interface AgentDetailsPageProps {
  params: Promise<{
    agentId: string;
  }>;
}

export default async function AgentDetailsPage({
  params,
}: AgentDetailsPageProps) {
  const { agentId } = await params;

  return (
    <div className="space-y-6 text-white">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-400">
          Agent Management / Agents / Details
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Agent Details
        </h1>

        <p className="mt-2 text-gray-400">
          View and manage individual AI agent information.
        </p>
      </div>

      {/* Agent Information */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#101927] p-6">
          <h2 className="text-lg font-semibold">
            Agent Information
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-sm text-gray-400">Agent ID</p>
              <p className="mt-1 font-medium">{agentId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Agent Name</p>
              <p className="mt-1 font-medium">Not connected</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Agent Type</p>
              <p className="mt-1 font-medium">Not configured</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Status</p>
              <span className="mt-1 inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                Demo
              </span>
            </div>
          </div>
        </div>

        {/* Agent Controls */}
        <div className="rounded-xl border border-white/10 bg-[#101927] p-6">
          <h2 className="text-lg font-semibold">
            Agent Controls
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            Agent execution controls will be integrated
            with the Control Engine later.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              disabled
              className="cursor-not-allowed rounded-lg bg-green-600/20 px-4 py-2 text-sm text-gray-500"
            >
              Start Agent
            </button>

            <button
              disabled
              className="cursor-not-allowed rounded-lg bg-red-600/20 px-4 py-2 text-sm text-gray-500"
            >
              Stop Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}