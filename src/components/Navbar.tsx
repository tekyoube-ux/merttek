import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <header className="border-b border-cyan-500/20 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 text-xs font-mono font-medium text-cyan-200/70 md:flex">
          <Link href="/" className="transition-all hover:text-cyan-300 hover:drop-shadow-[0_0_8px_#00f2ff]">anasayfa</Link>
          <Link href="/apps" className="transition-all hover:text-cyan-300 hover:drop-shadow-[0_0_8px_#00f2ff]">uygulamalar</Link>
          <Link href="/extensions" className="transition-all hover:text-cyan-300 hover:drop-shadow-[0_0_8px_#00f2ff]">eklentiler</Link>
          <Link href="/about" className="transition-all hover:text-cyan-300 hover:drop-shadow-[0_0_8px_#00f2ff]">hakkında</Link>
          <Link href="/contact" className="transition-all hover:text-cyan-300 hover:drop-shadow-[0_0_8px_#00f2ff]">iletişim</Link>
        </nav>
      </div>
    </header>
  );
}
