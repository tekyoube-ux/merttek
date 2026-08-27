import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Merttekinler.com.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-6 py-10">
      <div className="rounded-xl border border-white/10 bg-black/70 p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="text-xs text-zinc-500">MERTTEKINLER.COM</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-white">ABOUT</h1>
          <p className="text-sm text-zinc-300">
            Merttekinler.com is a modern terminal-style software platform built by Mert Tekin.
            It distributes Windows applications, browser extensions, and small utilities.
          </p>
          <p className="text-sm text-zinc-300">
            The platform is designed with a command-line inspired aesthetic while keeping
            navigation simple and accessible. Browse applications and extensions, view details,
            and download directly.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <QuickLink href="/" label="HOME" />
        <QuickLink href="/apps" label="APPLICATIONS" />
        <QuickLink href="/extensions" label="EXTENSIONS" />
        <QuickLink href="/contact" label="CONTACT" />
      </div>
    </section>
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
