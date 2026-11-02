"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Bot } from "lucide-react";
import type { AgentFlowNode } from "./canvas-types";

export default function AgentNode({
  data,
  selected,
}: NodeProps<AgentFlowNode>) {
  const statusColor = {
    connected: "text-green-600 dark:text-green-400",
    disconnected: "text-red-600 dark:text-red-400",
    pending: "text-yellow-600 dark:text-yellow-400",
  }[data.status];

  return (
    <div
      className={`min-w-44 rounded-xl border p-4 shadow-md transition-colors
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
        className="!h-2.5 !w-2.5 !border-2 !border-background !bg-cyan-500"
      />

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <Bot size={21} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold">{data.label}</p>
          <p className="text-xs text-[var(--muted)]">{data.role}</p>
        </div>
      </div>

      <p className={`mt-3 text-xs capitalize ${statusColor}`}>
        ● {data.status}
      </p>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2.5 !w-2.5 !border-2 !border-background !bg-cyan-500"
      />
    </div>
  );
}