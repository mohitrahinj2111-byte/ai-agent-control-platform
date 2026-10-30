"use client";

import { useState } from "react";
import ChatToggle from "./ChatToggle";
import ChatPanel from "./ChatPanel";

export default function ControlChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <ChatPanel onClose={() => setIsOpen(false)} />
      )}

      {!isOpen && (
        <ChatToggle
          isOpen={false}
          onClick={() => setIsOpen(true)}
        />
      )}
    </>
  );
}