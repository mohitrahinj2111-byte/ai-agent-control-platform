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
  const buttonClass =
    "rounded-lg p-2 text-foreground transition-colors hover:bg-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

  return (
    <div className="absolute right-4 top-4 z-20 flex flex-wrap gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 text-foreground shadow-xl">
      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom in"
        aria-label="Zoom in"
        className={buttonClass}
      >
        <Plus size={18} />
      </button>

      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom out"
        aria-label="Zoom out"
        className={buttonClass}
      >
        <Minus size={18} />
      </button>

      <button
        type="button"
        onClick={onFitView}
        title="Fit to screen"
        aria-label="Fit to screen"
        className={buttonClass}
      >
        <Maximize2 size={18} />
      </button>

      <button
        type="button"
        onClick={onToggleFullscreen}
        title="Toggle fullscreen"
        aria-label="Toggle fullscreen"
        className={buttonClass}
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