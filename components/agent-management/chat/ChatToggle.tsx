"use client";

import { MessageSquare, X, Sparkles } from "lucide-react";

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatToggle({
  isOpen,
  onClick,
}: ChatToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close AI command chat" : "Command your agents"}
      className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-500 px-5 py-3 text-white shadow-xl shadow-cyan-950/40 transition-all duration-200 hover:scale-105 hover:bg-cyan-400"
    >
      {isOpen ? (
        <X size={21} />
      ) : (
        <MessageSquare size={21} />
      )}

      <span className="flex flex-col items-start">
        <span className="text-sm font-bold">
          {isOpen ? "Close Chat" : "Command Your Agents"}
        </span>

        {!isOpen && (
          <span className="text-[10px] text-cyan-50">
            AI Workforce Control
          </span>
        )}
      </span>

      {!isOpen && <Sparkles size={16} />}
    </button>
  );
}