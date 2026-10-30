import type { Node } from "@xyflow/react";

export type AgentNodeKind = "ceo" | "manager" | "worker";

export interface AgentNodeData extends Record<string, unknown> {
  label: string;
  role: string;
  status: "connected" | "disconnected" | "pending";
  description: string;
  department?: string;
  agentId: string;
}

export type AgentFlowNode = Node<AgentNodeData, AgentNodeKind>;