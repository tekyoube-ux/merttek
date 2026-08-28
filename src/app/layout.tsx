import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Merttekinler.com",
    template: "%s | Merttekinler.com",
  },
  description:
    "Modern terminal-style software platform for Windows apps, browser extensions, and tools by Mert Tekin.",
  keywords: [
    "Merttekinler",
    "Windows uygulamaları",
    "Chrome eklentileri",
    "yazılım araçları",
    "MRT Task Manager",
    "MRT Clipboard Pro",
  ],
  authors: [{ name: "Mert Tekin" }],
  openGraph: {
    title: "Merttekinler.com — Terminal-style Software Platform",
    description:
      "Discover and download Windows apps, browser extensions, and tools from a modern terminal experience.",
    type: "website",
    locale: "tr_TR",
    siteName: "Merttekinler.com",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-zinc-200 bg-[#020708]">
        {/* Symbolics.com CRT Scanlines & Glow Background */}
        <div
          aria-hidden
          className="symbolics-bg fixed inset-0 pointer-events-none z-0"
        />

        {/* Content above background */}
        <div className="relative z-10 flex min-h-full flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4 md:px-6 flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
        {/* Remove Netlify badge */}
        <Script id="remove-netlify-badge" strategy="afterInteractive">{`
          (function removeBadge() {
            function kill() {
              var selectors = [
                '#netlify-badge-anchor',
                '[data-netlify-badge]',
                '.netlify-badge',
                'a[href*="www.netlify.com"][style]',
              ];
              selectors.forEach(function(sel) {
                var el = document.querySelector(sel);
                if (el) { el.remove(); return; }
              });
              // Also remove by text content
              document.querySelectorAll('a').forEach(function(a) {
                if (a.href && a.href.includes('netlify.com') && a.style && a.style.position) {
                  a.parentElement ? a.parentElement.remove() : a.remove();
                }
              });
            }
            kill();
            var obs = new MutationObserver(kill);
            obs.observe(document.body, { childList: true, subtree: true });
          })();
        `}</Script>
      </body>
    </html>
  );
}
