"use client";

import Link from "next/link";
import { useApps } from "@/hooks/useApps";

export default function ExtensionsPage() {
  const { apps, loading } = useApps();
  const extensions = apps.filter(
    (a) => a.category === "chrome" || a.platform === "Extension"
  );

  return (
    <section className="mx-auto max-w-5xl space-y-6 py-6 font-mono">
      <div className="flex flex-col items-center justify-center text-center gap-1 mb-2">
        <span className="relative flex h-2.5 w-2.5 mb-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></span>
        </span>
        <h1 className="symbolics-title text-xl md:text-2xl font-black tracking-widest uppercase">EXTENSIONS</h1>
        <p className="text-[11px] tracking-wider text-cyan-200/70">
          {loading ? "..." : `${extensions.length} BROWSER EXTENSION AVAILABLE`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {extensions.map((app) => (
          <div key={app.id} className="symbolics-card flex flex-col rounded-xl bg-[#030a0d]/90 p-4 backdrop-blur-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-pink-500 font-semibold tracking-wider">
                  v{app.version} • {app.status.toUpperCase()}
                </span>
                <span className="text-[10px] text-cyan-300/60 font-mono">EXTENSION</span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {app.icon && (
                  <img src={app.icon} alt={app.name} className="h-7 w-7 rounded-lg border border-cyan-500/30 object-contain p-0.5 bg-black/60 shadow-[0_0_8px_rgba(0,242,255,0.2)]" />
                )}
                <h2 className="text-sm font-bold text-white tracking-wide">{app.name}</h2>
                {app.highlight && (
                  <span className="flex items-center gap-1 rounded border border-green-400/50 bg-green-950/30 px-2 py-0.5 text-[10px] font-semibold text-green-400 shadow-[0_0_8px_rgba(74,222,128,0.2)]">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                    </span>
                    {app.highlight}
                  </span>
                )}
              </div>

              <p className="text-[11px] leading-relaxed text-zinc-300/80 line-clamp-2">{app.description}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-cyan-500/20 flex items-center justify-between gap-2">
              <span className="rounded-full border border-cyan-400/40 bg-cyan-950/40 px-2 py-0.5 text-[10px] font-bold tracking-wider text-cyan-300">
                {app.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/apps/${app.slug}`}
                  className="rounded border border-cyan-400/50 bg-black/50 px-3 py-1 text-[11px] font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_10px_rgba(0,242,255,0.4)]"
                >
                  DETAILS
                </Link>
                <a
                  href={app.downloadUrl}
                  className="rounded bg-[#8a2be2] px-3 py-1 text-[11px] font-bold text-white shadow-[0_0_12px_rgba(138,43,226,0.6)] transition-all hover:bg-[#9d35ff] hover:shadow-[0_0_20px_rgba(157,53,255,0.9)]"
                >
                  DOWNLOAD
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
