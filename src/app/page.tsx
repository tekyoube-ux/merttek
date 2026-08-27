"use client";

import { useState } from "react";
import Link from "next/link";
import BootScreen from "@/components/BootScreen";
import { apps } from "@/data/apps";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="mx-auto max-w-5xl py-4">
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      {booted && (
        <section className="space-y-8">
          {/* Main Title Section - Symbolics style */}
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></span>
              </span>
            </div>
            <h1 className="symbolics-title text-2xl md:text-3xl font-black tracking-widest uppercase">
              AVAILABLE APPLICATIONS
            </h1>
            <p className="text-xs tracking-wider text-cyan-200/70 font-mono">
              4 APPLICATIONS AVAILABLE FOR DOWNLOAD
            </p>
          </div>

          {/* 4 Cards Grid - Compact & Full Viewport Fitting */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {apps.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="symbolics-card flex flex-col justify-between rounded-xl bg-[#030a0d]/90 p-5 backdrop-blur-sm"
              >
                {/* Info & Description */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-pink-500 font-semibold tracking-wider">
                      v{app.version} • {app.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-cyan-300/60 font-mono">
                      {app.platform.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {app.icon && (
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="h-8 w-8 rounded-lg border border-cyan-500/30 object-contain p-0.5 bg-black/60 shadow-[0_0_8px_rgba(0,242,255,0.2)]"
                      />
                    )}
                    <h2 className="text-base font-bold text-white tracking-wide">
                      {app.name}
                    </h2>
                  </div>

                  <p className="text-xs leading-relaxed text-zinc-300/80 line-clamp-2">
                    {app.description}
                  </p>
                </div>

                {/* Bottom section: Tag & Action Buttons */}
                <div className="pt-4 mt-4 border-t border-cyan-500/20 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-cyan-400/40 bg-cyan-950/40 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-cyan-300">
                    {app.category.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/apps/${app.slug}`}
                      className="rounded border border-cyan-400/50 bg-black/50 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_10px_rgba(0,242,255,0.4)]"
                    >
                      DETAILS
                    </Link>
                    <a
                      href={app.downloadUrl}
                      className="rounded bg-[#8a2be2] px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_0_12px_rgba(138,43,226,0.6)] transition-all hover:bg-[#9d35ff] hover:shadow-[0_0_20px_rgba(157,53,255,0.9)]"
                    >
                      DOWNLOAD
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <QuickLink href="/apps" label="ALL APPLICATIONS" />
            <QuickLink href="/extensions" label="EXTENSIONS" />
            <QuickLink href="/about" label="ABOUT" />
            <QuickLink href="/contact" label="CONTACT" />
          </div>
        </section>
      )}
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border border-cyan-500/30 bg-black/40 px-4 py-2 text-xs font-medium text-cyan-300/80 transition-all hover:border-cyan-400 hover:text-cyan-200 hover:shadow-[0_0_12px_rgba(0,242,255,0.3)]"
    >
      [{label}]
    </Link>
  );
}
