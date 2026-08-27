"use client";

import { useRef, useEffect } from "react";
import type { Message } from "@/hooks/useTerminal";

export default function TerminalOutput({ lines }: { lines: Message[] }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="terminal-output space-y-1 text-sm leading-6">
      {lines.map((line, idx) => (
        <div
          key={idx}
          className={
            line.type === "error"
              ? "text-red-400"
              : line.type === "input"
                ? "text-zinc-300"
                : line.type === "info"
                  ? "text-indigo-300"
                  : "text-zinc-200"
          }
        >
          {line.content}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
