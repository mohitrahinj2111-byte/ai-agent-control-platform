"use client";

import { X } from "lucide-react";
import type { AgentFlowNode } from "./canvas-types";

interface AgentDetailsPanelProps {
  node: AgentFlowNode | null;
  onClose: () => void;
}

export default function AgentDetailsPanel({
  node,
  onClose,
}: AgentDetailsPanelProps) {
  if (!node) return null;

  const statusColor = {
    connected: "text-green-400",
    disconnected: "text-red-400",
    pending: "text-yellow-400",
  }[node.data.status];

  return (
    <aside className="absolute right-4 top-20 z-30 w-72 max-w-[calc(100%-2rem)] rounded-xl border border-white/10 bg-[#101927] p-5 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Node Details</h2>

        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-white/10"
          aria-label="Close details"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-xs text-gray-400">Name</p>
          <p className="mt-1 font-semibold">{node.data.label}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Role</p>
          <p className="mt-1">{node.data.role}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">ID</p>
          <p className="mt-1 break-all text-sm">{node.data.agentId}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Type</p>
          <p className="mt-1 capitalize">{node.type}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Status</p>
          <p className={`mt-1 text-sm capitalize ${statusColor}`}>
            {node.data.status}
          </p>
        </div>

        {node.data.department && (
          <div>
            <p className="text-xs text-gray-400">Department</p>
            <p className="mt-1">{node.data.department}</p>
          </div>
        )}

        <div>
          <p className="text-xs text-gray-400">Description</p>
          <p className="mt-1 text-sm text-gray-300">
            {node.data.description}
          </p>
        </div>
      </div>
    </aside>
  );
}