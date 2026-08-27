import Image from "next/image";
import Link from "next/link";
import type { AppInfo } from "@/types";

export default function AppCard({ app }: { app: AppInfo }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/10 hover:bg-white/10">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
          <Image
            src={app.icon}
            alt={`${app.name} ikonu`}
            width={48}
            height={48}
            className="h-10 w-10 object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">
              {app.name}
            </h3>
            <span className="rounded-full bg-indigo-600/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
              v{app.version}
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-300">
            {app.category === "windows"
              ? "Windows"
              : app.category === "chrome"
                ? "Chrome"
                : app.category === "tools"
                  ? "Araç"
                  : "Diğer"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-200">
        {app.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-5">
        <Link
          href={`/apps/${app.slug}`}
          className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Detayları Gör →
        </Link>
        <a
          href={app.downloadUrl}
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all hover:bg-zinc-200"
        >
          İndir
        </a>
      </div>
    </article>
  );
}
