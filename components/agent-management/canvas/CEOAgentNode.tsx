"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Network } from "lucide-react";
import type { AgentFlowNode } from "./canvas-types";

export default function CEOAgentNode({
  data,
  selected,
}: NodeProps<AgentFlowNode>) {
  return (
    <div
      className={`min-w-52 rounded-2xl border p-5 shadow-xl transition-colors
        bg-[var(--surface)] text-foreground
        ${
          selected
            ? "border-blue-500 ring-2 ring-blue-500/30"
            : "border-[var(--border)]"
        }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2.5 !w-2.5 !border-2 !border-background !bg-blue-500"
      />

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
          <Network size={23} />
        </div>

        <div className="min-w-0">
          <p className="font-bold">{data.label}</p>
          <p className="text-xs text-[var(--muted)]">{data.role}</p>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
        {data.description}
      </p>

      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        Main Coordinator
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2.5 !w-2.5 !border-2 !border-background !bg-blue-500"
      />
    </div>
  );
}