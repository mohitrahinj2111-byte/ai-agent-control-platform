"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Connection,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CEOAgentNode from "./CEOAgentNode";
import ManagerNode from "./ManagerNode";
import AgentNode from "./AgentNode";
import CanvasToolbar from "./CanvasToolbar";
import AgentDetailsPanel from "./AgentDetailsPanel";

import type { AgentFlowNode } from "./canvas-types";

const nodeTypes = {
  ceo: CEOAgentNode,
  manager: ManagerNode,
  worker: AgentNode,
};

const initialNodes: AgentFlowNode[] = [
  {
    id: "ceo-001",
    type: "ceo",
    position: { x: 400, y: 40 },
    data: {
      label: "Main CEO Agent",
      role: "Central Coordinator",
      status: "connected",
      description: "Coordinates department managers.",
      agentId: "ceo-001",
    },
  },
  {
    id: "manager-001",
    type: "manager",
    position: { x: 150, y: 260 },
    data: {
      label: "Manager A",
      role: "Department Manager",
      department: "Custom Department A",
      status: "connected",
      description: "Coordinates its assigned worker agents.",
      agentId: "manager-001",
    },
  },
  {
    id: "manager-002",
    type: "manager",
    position: { x: 650, y: 260 },
    data: {
      label: "Manager B",
      role: "Department Manager",
      department: "Custom Department B",
      status: "pending",
      description: "Coordinates its assigned worker agents.",
      agentId: "manager-002",
    },
  },
  {
    id: "worker-001",
    type: "worker",
    position: { x: 80, y: 480 },
    data: {
      label: "Worker Agent 1",
      role: "Research Worker",
      status: "connected",
      description: "Performs assigned research tasks.",
      agentId: "worker-001",
    },
  },
  {
    id: "worker-002",
    type: "worker",
    position: { x: 300, y: 480 },
    data: {
      label: "Worker Agent 2",
      role: "Analysis Worker",
      status: "pending",
      description: "Performs assigned analysis tasks.",
      agentId: "worker-002",
    },
  },
  {
    id: "worker-003",
    type: "worker",
    position: { x: 650, y: 480 },
    data: {
      label: "Worker Agent 3",
      role: "Operations Worker",
      status: "connected",
      description: "Performs assigned operations tasks.",
      agentId: "worker-003",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "edge-ceo-manager1",
    source: "ceo-001",
    target: "manager-001",
    animated: true,
  },
  {
    id: "edge-ceo-manager2",
    source: "ceo-001",
    target: "manager-002",
    animated: true,
  },
  {
    id: "edge-manager1-worker1",
    source: "manager-001",
    target: "worker-001",
  },
  {
    id: "edge-manager1-worker2",
    source: "manager-001",
    target: "worker-002",
  },
  {
    id: "edge-manager2-worker3",
    source: "manager-002",
    target: "worker-003",
  },
];

function CanvasContent() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<AgentFlowNode>(initialNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState<Edge>(initialEdges);

  const [selectedNode, setSelectedNode] =
    useState<AgentFlowNode | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((currentEdges) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: {
              stroke: "#3B82F6",
              strokeWidth: 2,
            },
          },
          currentEdges
        )
      );
    },
    [setEdges]
  );

  const onNodeClick: NodeMouseHandler<AgentFlowNode> = useCallback(
    (_event, node) => {
      setSelectedNode(node);
    },
    []
  );

  const handleFullscreen = () => {
    setIsFullscreen((current) => !current);
  };

  return (
    <div
      className={`${
        isFullscreen
          ? "fixed inset-0 z-50"
          : "relative w-full"
      } overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-foreground shadow-sm`}
      style={{ height: isFullscreen ? "100vh" : "720px" }}
    >
      {/* Canvas Heading */}
      <div className="absolute left-4 top-4 z-20 rounded-xl border border-[var(--border)] bg-background/95 px-4 py-3 shadow-sm backdrop-blur">
        <p className="text-sm font-bold text-foreground">
          Agent Organization Workspace
        </p>

        <p className="mt-1 text-xs text-[var(--muted)]">
          Visualize your agent hierarchy
        </p>
      </div>

      {/* Toolbar */}
      <CanvasToolbar
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView({ padding: 0.2, duration: 300 })}
        onToggleFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* React Flow */}
      <ReactFlow<AgentFlowNode>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={() => setSelectedNode(null)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable
        nodesConnectable
        elementsSelectable
        deleteKeyCode={["Backspace", "Delete"]}
        defaultEdgeOptions={{
          animated: false,
          style: {
            stroke: "var(--border)",
            strokeWidth: 2,
          },
        }}
        className="!bg-background"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="var(--border)"
        />

        <Controls
          position="bottom-left"
          className="!overflow-hidden !rounded-xl !border !border-[var(--border)] !bg-background !shadow-lg [&>button]:!border-[var(--border)] [&>button]:!bg-background [&>button]:!fill-current [&>button]:!text-foreground [&>button:hover]:!bg-[var(--surface)]"
        />

        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          nodeColor={(node) => {
            if (node.type === "ceo") return "#2563EB";
            if (node.type === "manager") return "#7C3AED";
            return "#0891B2";
          }}
          maskColor="rgba(100, 116, 139, 0.15)"
          className="!overflow-hidden !rounded-xl !border !border-[var(--border)] !bg-[var(--surface)]"
        />
      </ReactFlow>

      {/* Selected Agent Details */}
      <AgentDetailsPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      {/* Fullscreen Exit */}
      {isFullscreen && (
        <button
          type="button"
          onClick={handleFullscreen}
          className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-xl border border-[var(--border)] bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg transition hover:bg-[var(--surface)]"
        >
          Exit Fullscreen
        </button>
      )}
    </div>
  );
}

export default function AgentCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasContent />
    </ReactFlowProvider>
  );
}