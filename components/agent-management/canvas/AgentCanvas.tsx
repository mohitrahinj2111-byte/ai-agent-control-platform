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
            style: { stroke: "#60A5FA", strokeWidth: 2 },
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
      } overflow-hidden rounded-xl border border-white/10 bg-[#080D16]`}
      style={{ height: isFullscreen ? "100vh" : "720px" }}
    >
      <div className="absolute left-4 top-4 z-20 rounded-lg border border-white/10 bg-[#101927] px-3 py-2 text-sm text-gray-300">
        Agent Organization Workspace
      </div>

      <CanvasToolbar
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView({ padding: 0.2, duration: 300 })}
        onToggleFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

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
          style: { stroke: "#64748B", strokeWidth: 2 },
        }}
        className="bg-[#080D16]"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="#334155"
        />

        <Controls
          position="bottom-left"
          className="!border-white/10 !bg-[#101927] !shadow-lg"
        />

        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          nodeColor={(node) => {
            if (node.type === "ceo") return "#3B82F6";
            if (node.type === "manager") return "#8B5CF6";
            return "#0891B2";
          }}
          maskColor="rgba(8, 13, 22, 0.7)"
          className="!border !border-white/10 !bg-[#101927]"
        />
      </ReactFlow>

      <AgentDetailsPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      {isFullscreen && (
        <button
          onClick={handleFullscreen}
          className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-lg border border-white/10 bg-[#101927] px-4 py-2 text-sm text-white hover:bg-white/10"
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