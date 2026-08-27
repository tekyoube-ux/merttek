"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Terminal from "@/components/Terminal";
import { useTerminal } from "@/hooks/useTerminal";
import { createCommands } from "@/lib/commands";

export default function AppsClient() {
  const router = useRouter();
  const terminal = useTerminal([
    { id: "apps-1", type: "info", content: "Loading applications..." },
  ]);

  const commands = useMemo(() => createCommands((path) => {
    router.push(path);
  }), [router]);

  const handleCommand = (raw: string) => {
    const parts = raw.trim().split(/\s+/);
    const name = parts[0].toLowerCase();
    const args = parts.slice(1);
    const cmd = commands.find((c) => c.name === name);
    if (!cmd) {
      terminal.pushLine(`Command not found: ${name}. Type 'help' for available commands.`, "error");
      return;
    }
    cmd.run(
      {
        pushLine: terminal.pushLine,
        clear: terminal.clear,
        navigate: (path: string) => router.push(path),
      },
      args
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Terminal
        prompt="MERTTEKINLER.COM"
        lines={terminal.lines}
        onCommand={handleCommand}
        placeholder="Type 'help' or select a command"
      />

      <div className="flex flex-wrap gap-2">
        <QuickCommand label="apps" onClick={() => handleCommand("apps")} />
        <QuickCommand label="extensions" onClick={() => handleCommand("extensions")} />
        <QuickCommand label="about" onClick={() => handleCommand("about")} />
        <QuickCommand label="contact" onClick={() => handleCommand("contact")} />
        <QuickCommand label="clear" onClick={() => terminal.clear()} />
      </div>
    </div>
  );
}

function QuickCommand({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
    >
      [{label}]
    </button>
  );
}
