import { useState, useRef } from "react";

export type Message = {
  id: string;
  type: "input" | "output" | "error" | "info";
  content: string;
};

export function useTerminal(initialLines: Message[] = []) {
  const [lines, setLines] = useState<Message[]>(initialLines);
  const historyRef = useRef<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  function pushLine(content: string, type: Message["type"] = "output") {
    setLines((prev) => [...prev, { id: crypto.randomUUID(), type, content }]);
  }

  function clear() {
    setLines([]);
  }

  function execute(raw: string) {
    const value = raw.trim();
    if (!value) return;
    historyRef.current = [...historyRef.current, value];
    setHistoryIndex(-1);
    pushLine(`$ ${value}`, "input");
  }

  function navigateHistory(direction: -1 | 1) {
    setHistoryIndex((prev) => {
      const next = prev + direction;
      if (next < -1) return -1;
      if (next >= historyRef.current.length) return historyRef.current.length - 1;
      return next;
    });
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  return {
    lines,
    pushLine,
    clear,
    execute,
    historyIndex,
    navigateHistory,
    inputRef,
    focusInput,
  };
}
