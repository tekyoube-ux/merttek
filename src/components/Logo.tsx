"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface LogoProps {
  /** Typewriter animasyonunu devre dışı bırak (BootScreen gibi statik kullanımlar için) */
  static?: boolean;
}

export default function Logo({ static: isStatic = false }: LogoProps) {
  const fullText = "merttekinler";
  const [displayed, setDisplayed] = useState(isStatic ? fullText : "");
  const [showCursor, setShowCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(isStatic);

  // Typewriter effect
  useEffect(() => {
    if (isStatic) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        setTypingDone(true);
      }
    }, 70);
    return () => clearInterval(timer);
  }, [isStatic]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <Link href="/" className="flex items-center gap-3 select-none">
      {/* ── Terminal Box ── */}
      <div
        className="relative flex flex-col gap-[3px] rounded-xl border border-green-400 bg-black px-3 py-2 font-mono"
        style={{
          width: 88,
          height: 52,
          boxShadow:
            "0 0 8px 2px #00ff4488, 0 0 20px 4px #00ff4422, inset 0 0 8px #00ff4411",
        }}
      >
        {/* Line 1 */}
        <div className="flex items-center gap-1 leading-none" style={{ fontSize: 9 }}>
          <span className="text-green-400">$</span>
          <span className="text-zinc-300">init</span>
          <span className="text-green-400">()</span>
        </div>
        {/* Line 2 */}
        <div className="flex items-center gap-1 leading-none" style={{ fontSize: 9 }}>
          <span className="text-green-400">●</span>
          <span className="text-green-300">live</span>
          <span className="text-zinc-600">:3000</span>
        </div>
        {/* Blinking cursor line */}
        <div className="flex items-center gap-0.5 leading-none" style={{ fontSize: 9 }}>
          <span className="text-green-400">&gt;_</span>
          <span
            className="inline-block bg-green-400"
            style={{
              width: 5,
              height: 9,
              opacity: showCursor ? 1 : 0,
              transition: "opacity 0.1s",
            }}
          />
        </div>
      </div>

      {/* ── Right: text block ── */}
      <div className="flex flex-col justify-center gap-1">
        {/* Main name line */}
        <div className="flex items-center font-mono text-lg font-bold leading-none tracking-tight">
          {/* Typed text */}
          <span className="text-white">{displayed}</span>

          {/* Blinking cursor while typing */}
          {!typingDone && (
            <span
              className="inline-block w-[2px] h-[18px] bg-green-400 ml-[1px]"
              style={{ opacity: showCursor ? 1 : 0 }}
            />
          )}

          {/* .com — always green */}
          <span
            className="text-green-400 font-black"
            style={{
              textShadow: "0 0 8px #00ff44, 0 0 16px #00ff4488",
            }}
          >
            .com
          </span>
        </div>

        {/* Subtitle line */}
        <div className="flex items-center font-mono text-[10px] leading-none tracking-widest text-zinc-400">
          <span>SOFTWARE.&nbsp;</span>
          <span
            className="text-green-400 font-semibold"
            style={{ textShadow: "0 0 6px #00ff4466" }}
          >
            EXTENSIONS.
          </span>
          <span>&nbsp;TOOLS.</span>
        </div>
      </div>
    </Link>
  );
}
