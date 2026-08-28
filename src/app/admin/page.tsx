"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch {
      setError("Email veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="symbolics-card w-full max-w-md rounded-xl bg-[#030a0d]/90 p-8 backdrop-blur-md font-mono">
        <div className="mb-6 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></span>
          </span>
          <span className="text-xs tracking-widest text-cyan-300/70 uppercase">Admin Panel</span>
        </div>

        <h1 className="text-xl font-black text-white tracking-wide mb-6">GİRİŞ YAP</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 tracking-wider uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded border border-cyan-500/30 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,242,255,0.2)]"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 tracking-wider uppercase">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded border border-cyan-500/30 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,242,255,0.2)]"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#8a2be2] py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(138,43,226,0.6)] transition-all hover:bg-[#9d35ff] disabled:opacity-50"
          >
            {loading ? "GİRİŞ YAPILIYOR..." : "GİRİŞ YAP"}
          </button>
        </form>
      </div>
    </div>
  );
}
