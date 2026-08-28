import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-6 px-4 py-6 text-xs font-medium text-zinc-400 md:justify-end md:px-6">
        <Link href="/" className="transition-colors hover:text-white">home</Link>
        <Link href="/apps" className="transition-colors hover:text-white">apps</Link>
        <Link href="/extensions" className="transition-colors hover:text-white">extensions</Link>
        <Link href="/about" className="transition-colors hover:text-white">about</Link>
      </div>
    </footer>
  );
}
