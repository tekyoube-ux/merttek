import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Merttekinler<span className="text-indigo-500">.com</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Modern, hızlı ve güvenilir yazılım çözümleri. Ücretsiz uygulamalarımızı
            keşfedin, indirin ve üretkenliğinizi artırın.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apps"
              className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg"
            >
              Uygulamaları Keşfet
            </Link>
            <Link
              href="/apps"
              className="rounded-full border border-white/10 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white/20"
            >
              Tüm Liste
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
