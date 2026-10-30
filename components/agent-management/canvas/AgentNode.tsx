"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AgentFlowNode } from "./canvas-types";

export default function AgentNode({
  data,
  selected,
}: NodeProps<AgentFlowNode>) {
  const statusColor = {
    connected: "text-green-400",
    disconnected: "text-red-400",
    pending: "text-yellow-400",
  }[data.status];

  return (
    <div
      className={`min-w-44 rounded-xl border bg-[#101927] p-4 text-white shadow-md ${
        selected ? "border-blue-400 ring-2 ring-blue-400/30" : "border-white/15"
      }`}
    >
      <Handle type="target" position={Position.Top} />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15">
          🤖
        </div>
        <div>
          <p className="text-sm font-semibold">{data.label}</p>
          <p className="text-xs text-gray-400">{data.role}</p>
        </div>
      </div>

      <p className={`mt-3 text-xs capitalize ${statusColor}`}>
        ● {data.status}
      </p>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}