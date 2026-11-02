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
    connected: "text-green-600 dark:text-green-400",
    disconnected: "text-red-600 dark:text-red-400",
    pending: "text-yellow-600 dark:text-yellow-400",
  }[node.data.status];

  const detailLabelClass = "text-xs text-[var(--muted)]";

  return (
    <aside className="absolute right-4 top-20 z-30 w-72 max-w-[calc(100%-2rem)] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-foreground shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Node Details</h2>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Close details"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className={detailLabelClass}>Name</p>
          <p className="mt-1 font-semibold">{node.data.label}</p>
        </div>

        <div>
          <p className={detailLabelClass}>Role</p>
          <p className="mt-1">{node.data.role}</p>
        </div>

        <div>
          <p className={detailLabelClass}>ID</p>
          <p className="mt-1 break-all text-sm">{node.data.agentId}</p>
        </div>

        <div>
          <p className={detailLabelClass}>Type</p>
          <p className="mt-1 capitalize">{node.type}</p>
        </div>

        <div>
          <p className={detailLabelClass}>Status</p>
          <p className={`mt-1 text-sm capitalize ${statusColor}`}>
            {node.data.status}
          </p>
        </div>

        {node.data.department && (
          <div>
            <p className={detailLabelClass}>Department</p>
            <p className="mt-1">{node.data.department}</p>
          </div>
        )}

        <div>
          <p className={detailLabelClass}>Description</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {node.data.description}
          </p>
        </div>
      </div>
    </aside>
  );
}