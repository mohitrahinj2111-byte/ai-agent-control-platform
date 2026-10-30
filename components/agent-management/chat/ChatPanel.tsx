"use client";

import { useState } from "react";
import {
  X,
  Minus,
  Maximize2,
  Minimize2,
  GripVertical,
  MessageSquare,
} from "lucide-react";

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [width, setWidth] = useState(400);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const resize = (event: React.PointerEvent<HTMLDivElement>) => {
    const startX = event.clientX;
    const startWidth = width;

    const handleMove = (moveEvent: PointerEvent) => {
      const nextWidth = startWidth + startX - moveEvent.clientX;
      setWidth(Math.min(650, Math.max(320, nextWidth)));
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  return (
    <aside
      className={`fixed right-0 z-[60] flex flex-col overflow-hidden border border-white/10 bg-[#0B1421] text-white shadow-2xl ${
        isMaximized
          ? "inset-0"
          : "bottom-0 top-0"
      } ${isMinimized ? "h-[62px] top-auto" : ""}`}
      style={{
        width: isMaximized ? "100%" : `${width}px`,
        maxWidth: "100vw",
      }}
    >
      {!isMaximized && (
        <div
          onPointerDown={resize}
          className="absolute left-0 top-0 z-20 flex h-full w-2 cursor-col-resize items-center justify-center hover:bg-cyan-400/20"
          title="Drag to resize chat"
        >
          <GripVertical size={15} className="text-gray-500" />
        </div>
      )}

      <header className="flex min-h-[62px] items-center justify-between border-b border-white/10 bg-[#101D2C] px-4 pl-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-500/15 p-2 text-cyan-300">
            <MessageSquare size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold">AI Control Assistant</h2>
            <p className="text-xs text-gray-400">Command Workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="Minimize chat"
          >
            <Minus size={17} />
          </button>

          <button
            onClick={() => {
              setIsMaximized(!isMaximized);
              setIsMinimized(false);
            }}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="Maximize chat"
          >
            {isMaximized ? (
              <Minimize2 size={17} />
            ) : (
              <Maximize2 size={17} />
            )}
          </button>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="Close chat"
          >
            <X size={17} />
          </button>
        </div>
      </header>

      {!isMinimized && (
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-300">
            <MessageSquare size={30} />
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            AI Workforce Control
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">
            Send instructions to your selected agents and departments.
            Command preview and approval controls will be added next.
          </p>

          <div className="mt-5 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
            Demo interface — commands are not executed.
          </div>
        </div>
      )}
    </aside>
  );
}