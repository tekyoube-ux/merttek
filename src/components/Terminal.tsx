"use client";

import { useEffect, useRef, useState } from "react";
import TerminalOutput from "@/components/TerminalOutput";
import type { Message } from "@/hooks/useTerminal";

export default function Terminal({
  lines,
  prompt,
  onCommand,
  placeholder = "Type a command...",
  disabled = false,
}: {
  lines: Message[];
  prompt: string;
  onCommand: (raw: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="terminal w-full rounded-xl border border-white/10 bg-black/70 p-4 shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-zinc-500">Merttekinler.com</span>
      </div>

      <TerminalOutput lines={lines} />

      <div className="mt-4 flex items-center gap-2">
        <span className="select-none font-mono text-sm text-indigo-300">{prompt}&gt;</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) {
              onCommand(value);
              setValue("");
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus
          className="terminal-input flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-zinc-500"
        />
      </div>
    </div>
  );
}
