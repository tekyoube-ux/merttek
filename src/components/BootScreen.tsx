"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const bootLines = [
  { text: "> Initializing system...........  [OK]", color: "text-green-400" },
  { text: "> Loading modules................  [OK]", color: "text-green-400" },
  { text: "> Network interface..............  UP",   color: "text-green-400" },
  { text: "> STATUS: ONLINE",                        color: "text-green-400" },
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [skipped, setSkipped] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = "";
    const lineSpeed = 90;
    const charSpeed = 14;

    const tick = () => {
      if (skipped) return;
      if (lineIndex >= bootLines.length) {
        setDone(true);
        setTimeout(() => { setShowCursor(false); onComplete(); }, 400);
        return;
      }
      const fullText = bootLines[lineIndex].text;
      if (charIndex < fullText.length) {
        currentLine += fullText[charIndex];
        setVisibleLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine;
          return next;
        });
        charIndex++;
        setTimeout(tick, charSpeed);
      } else {
        currentLine = "";
        charIndex = 0;
        lineIndex++;
        setTimeout(tick, lineSpeed);
      }
    };

    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [skipped, onComplete]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  function handleSkip() {
    setSkipped(true);
    setDone(true);
    setVisibleLines(bootLines.map((l) => l.text));
    setShowCursor(false);
    setTimeout(() => onComplete(), 80);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col font-mono overflow-hidden bg-[#020708]">
      {/* Symbolics CRT Scanlines & Glow Background */}
      <div
        aria-hidden
        className="symbolics-bg absolute inset-0 pointer-events-none"
      />

      {/* Top green line */}
      <div
        className="relative z-20 h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #00ff44 30%, #00ff44 70%, transparent)",
          boxShadow: "0 0 10px 1px #00ff4455",
        }}
      />

      {/* Content — centered like symbolics.com */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-xl">
          {/* Logo */}
          <div className="mb-8">
            <Logo static />
          </div>

          {/* Thin divider */}
          <div
            className="mb-6 h-px w-full"
            style={{ background: "linear-gradient(90deg, #00ff4444, transparent)" }}
          />

          {/* Boot lines */}
          <div className="space-y-1 text-xs tracking-wider">
            {visibleLines.map((line, idx) => (
              <div
                key={idx}
                style={{
                  color: "#00ff44",
                  textShadow: "0 0 8px #00ff4466",
                }}
              >
                {line}
              </div>
            ))}

            {/* Blinking cursor */}
            {!done && (
              <span
                className="inline-block"
                style={{
                  width: 8,
                  height: 13,
                  background: "#00ff44",
                  opacity: showCursor ? 1 : 0,
                  boxShadow: "0 0 6px #00ff44",
                  verticalAlign: "middle",
                  transition: "opacity 0.1s",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Skip */}
      <div className="relative z-20 flex justify-center pb-6">
        <button
          onClick={handleSkip}
          className="border border-zinc-800 px-4 py-1.5 text-[10px] text-zinc-600 transition hover:border-green-400/40 hover:text-green-400/70"
          style={{ letterSpacing: "0.18em" }}
        >
          [ SKIP ]
        </button>
      </div>

      {/* Bottom green line */}
      <div
        className="relative z-20 h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #00ff44 30%, #00ff44 70%, transparent)",
          boxShadow: "0 0 10px 1px #00ff4455",
        }}
      />
    </div>
  );
}
