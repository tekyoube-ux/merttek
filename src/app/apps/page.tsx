import { apps } from "@/data/apps";
import Link from "next/link";

export const metadata = {
  title: "Applications",
  description: "Browse available applications.",
};

export default function AppsPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-6 py-10">
      <div className="rounded-xl border border-white/10 bg-black/70 p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="text-xs text-zinc-500">MERTTEKINLER.COM</span>
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">APPLICATIONS</h1>
            <p className="mt-1 text-xs text-zinc-400">
              {apps.length} applications available.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {apps.map((app) => (
              <div
                key={app.id}
                className="rounded-lg border border-white/10 bg-white/5 p-4 transition hover:border-white/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{app.name}</h3>
                    <p className="mt-1 text-xs text-zinc-400">{app.description}</p>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300">
                    v{app.version}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">
                    {app.platform} • {app.status.toUpperCase()}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={`/apps/${app.slug}`}
                      className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white/20 hover:text-white"
                    >
                      DETAILS
                    </Link>
                    <a
                      href={app.downloadUrl}
                      className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
                    >
                      DOWNLOAD
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <QuickLink href="/" label="HOME" />
        <QuickLink href="/extensions" label="EXTENSIONS" />
        <QuickLink href="/about" label="ABOUT" />
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
