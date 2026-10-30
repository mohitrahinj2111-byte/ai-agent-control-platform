"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AgentFlowNode } from "./canvas-types";

export default function CEOAgentNode({
  data,
  selected,
}: NodeProps<AgentFlowNode>) {
  return (
    <div
      className={`min-w-52 rounded-2xl border bg-[#172554] p-5 text-white shadow-xl ${
        selected ? "border-blue-400 ring-2 ring-blue-400/40" : "border-blue-500/50"
      }`}
    >
      <Handle type="target" position={Position.Top} />

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-xl">
          👑
        </div>
        <div>
          <p className="font-bold">{data.label}</p>
          <p className="text-xs text-blue-200">{data.role}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-blue-100">
        {data.description}
      </p>

      <div className="mt-3 text-xs text-green-300">
        ● Main Coordinator
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}