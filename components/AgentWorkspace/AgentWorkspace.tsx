"use client";

import { useState } from "react";
import { Bot, Minus, Plus, X, Maximize2 } from "lucide-react";

type Agent = {
  id?: string | number;
  agent_name?: string;
  agentName?: string;
  name?: string;
  runtime?: string;
  status?: string;
  created_at?: string;
  [key: string]: unknown;
};

type AgentWorkspaceProps = {
  agents: Agent[];
  loading: boolean;
  onAddAgent: () => void;
};

export default function AgentWorkspace({
  agents,
  loading,
  onAddAgent,
}: AgentWorkspaceProps) {
  const [zoom, setZoom] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPointer, setLastPointer] = useState({ x: 0, y: 0 });

  const getName = (agent: Agent) =>
    agent.agent_name ?? agent.agentName ?? agent.name ?? "Unnamed Agent";

  function startPan(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;

    setDragging(true);
    setLastPointer({ x: event.clientX, y: event.clientY });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function movePan(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;

    const dx = event.clientX - lastPointer.x;
    const dy = event.clientY - lastPointer.y;

    setPan((current) => ({
      x: current.x + dx,
      y: current.y + dy,
    }));

    setLastPointer({ x: event.clientX, y: event.clientY });
  }

  return (
    <>
      <section className="relative h-[610px] overflow-hidden rounded-2xl border border-slate-700 bg-[#0b1120] text-white shadow-lg">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(#64748b 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute left-4 top-4 z-20 rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm font-semibold">
          Agent Workspace
          <span className="ml-2 text-xs font-normal text-slate-400">
            {agents.length} agents
          </span>
        </div>

        <div className="absolute right-4 top-4 z-20 flex gap-2">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            className="rounded-lg border border-slate-700 bg-slate-900 p-2 hover:bg-slate-800"
          >
            <Minus size={17} />
          </button>

          <button
            type="button"
            aria-label="Reset zoom and position"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 text-xs hover:bg-slate-800"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.1))}
            className="rounded-lg border border-slate-700 bg-slate-900 p-2 hover:bg-slate-800"
          >
            <Plus size={17} />
          </button>
        </div>

        {loading ? (
          <div className="relative z-10 flex h-full items-center justify-center text-sm text-slate-400">
            Loading your agents...
          </div>
        ) : agents.length === 0 ? (
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <Bot size={42} className="text-blue-400" />
            <h3 className="mt-4 text-lg font-semibold">
              No agents yet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Add an agent to display it in this workspace.
            </p>
            <button
              type="button"
              onClick={onAddAgent}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
            >
              Add your first agent
            </button>
          </div>
        ) : (
          <div
            className="relative z-10 h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
            onPointerDown={startPan}
            onPointerMove={movePan}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            onLostPointerCapture={() => setDragging(false)}
          >
            <div
              className="absolute left-1/2 top-1/2 grid w-max max-w-none grid-cols-2 gap-5 p-8 sm:grid-cols-3"
              style={{
                transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
                transformOrigin: "center",
              }}
            >
              {agents.map((agent, index) => {
                const name = getName(agent);

                return (
                  <button
                    key={agent.id ?? `${name}-${index}`}
                    type="button"
                    onDoubleClick={() => setSelectedAgent(agent)}
                    title="Double-click to view agent details"
                    className="flex min-h-[118px] w-[150px] flex-col items-center justify-center rounded-2xl border border-blue-500/50 bg-slate-900/95 p-4 text-center shadow-lg transition hover:border-cyan-400 hover:bg-slate-800"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-cyan-300">
                      <Bot size={27} />
                    </span>
                    <span className="mt-3 max-w-full break-words text-sm font-semibold">
                      {name}
                    </span>
                    <span className="mt-1 text-xs text-slate-400">
                      {agent.status ?? "Registered"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <p className="absolute bottom-3 left-4 z-20 text-[11px] text-slate-500">
          Drag to move · Double-click a node for details
        </p>
      </section>

      {selectedAgent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="agent-detail-title"
          onClick={() => setSelectedAgent(null)}
        >
          <section
            className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/15 p-3 text-cyan-300">
                  <Bot size={28} />
                </div>
                <div>
                  <h2 id="agent-detail-title" className="text-xl font-bold">
                    {getName(selectedAgent)}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Agent details
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close agent details"
                onClick={() => setSelectedAgent(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-xs text-slate-400">Runtime</p>
                <p className="mt-2 break-words text-sm">
                  {selectedAgent.runtime ?? "Not specified"}
                </p>
              </div>
              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-xs text-slate-400">Status</p>
                <p className="mt-2 text-sm">
                  {selectedAgent.status ?? "Registered"}
                </p>
              </div>
              <div className="rounded-xl bg-slate-800 p-4 sm:col-span-2">
                <p className="text-xs text-slate-400">Agent ID</p>
                <p className="mt-2 break-all text-sm">
                  {selectedAgent.id ?? "Not provided"}
                </p>
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-slate-400">
              <Maximize2 size={14} />
              This view displays registry information; it does not execute the agent.
            </p>
          </section>
        </div>
      )}
    </>
  );
}