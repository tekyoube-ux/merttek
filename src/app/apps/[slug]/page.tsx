import Link from "next/link";
import { apps } from "@/data/apps";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = apps.find((item) => item.slug === slug);
  if (!app) return { title: "Bulunamadı" };
  return {
    title: `${app.name} v${app.version}`,
    description: app.description,
  };
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = apps.find((item) => item.slug === slug);
  if (!app) notFound();

  const isExtension = app.category === "chrome" || app.platform === "Extension" || app.platform === "Web";

  return (
    <section className="mx-auto max-w-4xl space-y-6 py-6 font-mono">
      <div className="symbolics-card rounded-xl bg-[#030a0d]/90 p-6 backdrop-blur-md">
        {/* Header Bar */}
        <div className="mb-6 flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></span>
            </span>
            <span className="text-xs tracking-wider text-cyan-300/70 uppercase">
              {isExtension ? "BROWSER EXTENSION" : app.platform} • {app.status}
            </span>
          </div>
          <span className="rounded-full border border-pink-500/40 bg-pink-950/30 px-3 py-0.5 text-xs font-semibold text-pink-400">
            v{app.version}
          </span>
        </div>

        <div className="space-y-6">
          {/* Title & Icon & Description */}
          <div className="flex items-start gap-4">
            {app.icon && (
              <img
                src={app.icon}
                alt={app.name}
                className="h-16 w-16 rounded-xl border border-cyan-500/40 bg-black/60 object-contain p-1 shadow-[0_0_15px_rgba(0,242,255,0.3)]"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">
                {app.name}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {app.longDescription || app.description}
              </p>
              {app.slug === "ig-chat-cleaner" && (
                <p className="mt-3 text-xs font-semibold text-green-400">
                  ✓ Instagram giriş bilgisi istemez
                </p>
              )}
            </div>
          </div>

          {/* Information & Requirements Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-cyan-500/30 bg-black/40 p-4">
              <h3 className="text-xs font-bold tracking-wider text-cyan-400 mb-3 uppercase">
                INFORMATION
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500">Platform</span>
                  <span className="text-white font-medium">{app.platform}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500">Status</span>
                  <span className="text-green-400 font-medium">{app.status.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500">Category</span>
                  <span className="text-cyan-300 font-medium">{app.category}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-zinc-500">Updated</span>
                  <span className="text-zinc-400">{app.updatedAt}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-cyan-500/30 bg-black/40 p-4">
              <h3 className="text-xs font-bold tracking-wider text-cyan-400 mb-3 uppercase">
                REQUIREMENTS
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {app.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chrome & Brave Installation Guide */}
          {isExtension && (
            <div className="rounded-lg border border-[#00f2ff]/50 bg-cyan-950/20 p-4 shadow-[0_0_15px_rgba(0,242,255,0.15)]">
              <h3 className="text-xs font-bold tracking-wider text-cyan-300 mb-2.5 flex items-center gap-2">
                <span>⚙️</span> NASIL YÜKLENİR? (CHROME & BRAVE KURULUM REHBERİ)
              </h3>
              <ol className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-bold text-cyan-300">1</span>
                  <span>Aşağıdaki butondan eklenti dosyasını indirin ve ZIP / RAR içeriğini bilgisayarınızda bir klasöre çıkartın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-bold text-cyan-300">2</span>
                  <span>Tarayıcınızın adres çubuğuna Chrome için <code className="bg-black px-1.5 py-0.5 rounded text-cyan-300 border border-cyan-500/30">chrome://extensions</code> veya Brave için <code className="bg-black px-1.5 py-0.5 rounded text-cyan-300 border border-cyan-500/30">brave://extensions</code> yazıp Enter&apos;a basın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-bold text-cyan-300">3</span>
                  <span>Açılan sayfanın sağ üst köşesindeki <strong className="text-white">&quot;Geliştirici modu&quot; (Developer mode)</strong> anahtarını açın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-bold text-cyan-300">4</span>
                  <span>Sol üstte beliren <strong className="text-white">&quot;Paketlenmemiş öğe yükle&quot; (Load unpacked)</strong> butonuna tıklayın ve 1. adımda çıkarttığınız klasörü seçin. Eklenti anında kurulacaktır!</span>
                </li>
              </ol>
            </div>
          )}

          {/* Features */}
          {app.features && app.features.length > 0 && (
            <div className="rounded-lg border border-cyan-500/30 bg-black/40 p-4">
              <h3 className="text-xs font-bold tracking-wider text-cyan-400 mb-3 uppercase">
                FEATURES & CAPABILITIES
              </h3>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {app.features.map((feature) => (
                  <li key={feature} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">&gt;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={app.downloadUrl}
              className="rounded bg-[#8a2be2] px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(138,43,226,0.6)] transition-all hover:bg-[#9d35ff] hover:shadow-[0_0_25px_rgba(157,53,255,0.9)]"
            >
              {isExtension ? "DOWNLOAD / INSTALL" : "DOWNLOAD"} v{app.version}
            </a>
            <Link
              href="/apps"
              className="rounded border border-cyan-500/40 bg-black/50 px-5 py-2.5 text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-300 hover:text-white hover:shadow-[0_0_12px_rgba(0,242,255,0.3)]"
            >
              ← BACK TO APPLICATIONS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
