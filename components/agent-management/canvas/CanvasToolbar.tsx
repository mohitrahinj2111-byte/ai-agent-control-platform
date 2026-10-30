"use client";

import {
  Maximize,
  Minimize,
  Plus,
  Minus,
  Maximize2,
} from "lucide-react";

interface CanvasToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function CanvasToolbar({
  onZoomIn,
  onZoomOut,
  onFitView,
  onToggleFullscreen,
  isFullscreen,
}: CanvasToolbarProps) {
  return (
    <div className="absolute right-4 top-4 z-20 flex flex-wrap gap-2 rounded-xl border border-white/10 bg-[#101927] p-2 shadow-xl">
      <button
        onClick={onZoomIn}
        title="Zoom in"
        className="rounded-lg p-2 text-white hover:bg-white/10"
      >
        <Plus size={18} />
      </button>

      <button
        onClick={onZoomOut}
        title="Zoom out"
        className="rounded-lg p-2 text-white hover:bg-white/10"
      >
        <Minus size={18} />
      </button>

      <button
        onClick={onFitView}
        title="Fit to screen"
        className="rounded-lg p-2 text-white hover:bg-white/10"
      >
        <Maximize2 size={18} />
      </button>

      <button
        onClick={onToggleFullscreen}
        title="Toggle fullscreen"
        className="rounded-lg p-2 text-white hover:bg-white/10"
      >
        {isFullscreen ? (
          <Minimize size={18} />
        ) : (
          <Maximize size={18} />
        )}
      </button>
    </div>
  );
}