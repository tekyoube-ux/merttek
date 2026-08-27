"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContactClient() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setVisible(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/70 p-6 md:p-8">
      <div className="mb-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="text-xs text-zinc-500">MERTTEKINLER.COM</span>
        </div>
      </div>

      <div className="space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">CONTACT</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Establish a connection
          </p>
        </div>

        {loading && (
          <div className="space-y-2 text-left font-mono text-sm leading-6 text-zinc-300">
            <p>&gt; Resolving host...</p>
            <p>&gt; Checking credentials...</p>
            <p>&gt; Loading contact channels...</p>
            <p>&gt; Connection established.</p>
            <p className="text-indigo-300">STATUS: ONLINE</p>
          </div>
        )}

        {visible && (
          <div className="space-y-4 text-left">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="grid grid-cols-1 gap-4 text-sm text-zinc-300 md:grid-cols-2">
                <div>
                  <span className="text-xs text-zinc-500">Email</span>
                  <div className="mt-1 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-zinc-400">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13 2 4" />
                    </svg>
                    <span>tekinler@yahoo.com</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">Instagram</span>
                  <div className="mt-1 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-zinc-400">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" />
                    </svg>
                    <span>@_whitecoder</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <QuickLink href="/" label="HOME" />
              <QuickLink href="/apps" label="APPLICATIONS" />
              <QuickLink href="/extensions" label="EXTENSIONS" />
              <QuickLink href="/about" label="ABOUT" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
    >
      [{label}]
    </Link>
  );
}
