"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { apps as staticApps } from "@/data/apps";

type App = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  highlight: string;
  version: string;
  platform: string;
  category: string;
  status: string;
  icon: string;
  downloadUrl: string;
  features: string;
  requirements: string;
  updatedAt: string;
};

const emptyApp: App = {
  id: "",
  name: "",
  slug: "",
  description: "",
  longDescription: "",
  highlight: "",
  version: "",
  platform: "Windows",
  category: "windows",
  status: "stable",
  icon: "",
  downloadUrl: "",
  features: "",
  requirements: "",
  updatedAt: new Date().toISOString().split("T")[0],
};

export default function AdminDashboard() {
  const router = useRouter();
  const [apps, setApps] = useState<App[]>([]);
  const [selected, setSelected] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/admin");
      else fetchApps();
    });
    return () => unsub();
  }, [router]);

  async function fetchApps() {
    setLoading(true);
    const snap = await getDocs(collection(db, "apps"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as App));
    setApps(data);
    setLoading(false);
  }

  async function handleSeedStatic() {
    if (!confirm("Mevcut tüm statik uygulamaları Firestore'a yükle?")) return;
    setSaving(true);
    setMessage("");
    try {
      for (const app of staticApps) {
        await setDoc(doc(db, "apps", app.slug), {
          ...app,
          features: app.features.join("\n"),
          requirements: app.requirements.join("\n"),
        });
      }
      setMessage("✅ Tüm uygulamalar yüklendi!");
      fetchApps();
    } catch {
      setMessage("❌ Hata oluştu.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    setMessage("");
    try {
      const ref = doc(db, "apps", selected.slug);
      await setDoc(ref, {
        ...selected,
        features: selected.features,
        requirements: selected.requirements,
        updatedAt: new Date().toISOString().split("T")[0],
      });
      setMessage("✅ Kaydedildi!");
      fetchApps();
    } catch {
      setMessage("❌ Hata oluştu.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Silmek istediğine emin misin?")) return;
    await deleteDoc(doc(db, "apps", slug));
    setSelected(null);
    fetchApps();
  }

  function handleNew() {
    setSelected({ ...emptyApp });
  }

  return (
    <div className="font-mono min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></span>
          </span>
          <span className="text-sm font-black tracking-widest text-white uppercase">Admin Dashboard</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSeedStatic}
            disabled={saving}
            className="rounded border border-cyan-500/40 px-3 py-1 text-xs text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50"
          >
            MEVCUT UYGULAMALARI YÜKLE
          </button>
          <button
            onClick={() => signOut(auth).then(() => router.push("/admin"))}
            className="rounded border border-red-500/40 px-3 py-1 text-xs text-red-400 hover:bg-red-500/10"
          >
            ÇIKIŞ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sol: Uygulama Listesi */}
        <div className="symbolics-card rounded-xl bg-[#030a0d]/90 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold tracking-wider text-cyan-400 uppercase">Uygulamalar</h2>
            <button
              onClick={handleNew}
              className="rounded bg-cyan-500/20 border border-cyan-500/40 px-2 py-1 text-[10px] text-cyan-300 hover:bg-cyan-500/30"
            >
              + YENİ
            </button>
          </div>

          {loading ? (
            <p className="text-xs text-zinc-500">Yükleniyor...</p>
          ) : (
            <ul className="space-y-2">
              {apps.map((app) => (
                <li key={app.id}>
                  <button
                    onClick={() => setSelected({ ...app })}
                    className={`w-full text-left rounded px-3 py-2 text-xs transition-all ${
                      selected?.slug === app.slug
                        ? "bg-cyan-500/20 border border-cyan-500/40 text-white"
                        : "border border-white/5 text-zinc-400 hover:border-cyan-500/30 hover:text-white"
                    }`}
                  >
                    <div className="font-semibold">{app.name || "İsimsiz"}</div>
                    <div className="text-[10px] text-zinc-600">v{app.version} • {app.platform}</div>
                  </button>
                </li>
              ))}
              {apps.length === 0 && (
                <p className="text-xs text-zinc-600">Henüz uygulama yok. + YENİ ile ekle.</p>
              )}
            </ul>
          )}
        </div>

        {/* Sağ: Düzenleme Formu */}
        <div className="md:col-span-2 symbolics-card rounded-xl bg-[#030a0d]/90 p-4 backdrop-blur-md">
          {!selected ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-xs text-zinc-600">Düzenlemek için bir uygulama seç veya yeni oluştur.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xs font-bold tracking-wider text-cyan-400 uppercase mb-2">
                {selected.id ? "Düzenle" : "Yeni Uygulama"}
              </h2>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field label="İsim" value={selected.name} onChange={(v) => setSelected({ ...selected, name: v })} />
                <Field label="Slug (URL)" value={selected.slug} onChange={(v) => setSelected({ ...selected, slug: v })} />
                <Field label="Versiyon" value={selected.version} onChange={(v) => setSelected({ ...selected, version: v })} />
                <Field label="Platform" value={selected.platform} onChange={(v) => setSelected({ ...selected, platform: v })} placeholder="Windows / Extension / Web" />
                <Field label="Kategori" value={selected.category} onChange={(v) => setSelected({ ...selected, category: v })} placeholder="windows / chrome / tools" />
                <Field label="Durum" value={selected.status} onChange={(v) => setSelected({ ...selected, status: v })} placeholder="stable / beta" />
                <Field label="İkon URL" value={selected.icon} onChange={(v) => setSelected({ ...selected, icon: v })} placeholder="/apps/slug/icon.png" />
                <Field label="Download URL" value={selected.downloadUrl} onChange={(v) => setSelected({ ...selected, downloadUrl: v })} />
              </div>

              <Field label="Kısa Açıklama" value={selected.description} onChange={(v) => setSelected({ ...selected, description: v })} textarea />
              <Field label="Uzun Açıklama" value={selected.longDescription} onChange={(v) => setSelected({ ...selected, longDescription: v })} textarea />
              <Field label="Öne Çıkan Bilgi (yeşil yanıp sönen çerçeve)" value={selected.highlight || ""} onChange={(v) => setSelected({ ...selected, highlight: v })} placeholder="✓ Instagram giriş bilgisi istemez" />
              <Field label="Özellikler (her satıra bir tane)" value={selected.features} onChange={(v) => setSelected({ ...selected, features: v })} textarea placeholder="Toplu silme&#10;Hızlı erişim&#10;..." />
              <Field label="Gereksinimler (her satıra bir tane)" value={selected.requirements} onChange={(v) => setSelected({ ...selected, requirements: v })} textarea placeholder="Windows 10+&#10;4 GB RAM&#10;..." />

              {message && <p className="text-xs font-semibold">{message}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded bg-[#8a2be2] px-5 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(138,43,226,0.6)] hover:bg-[#9d35ff] disabled:opacity-50"
                >
                  {saving ? "KAYDEDİLİYOR..." : "KAYDET"}
                </button>
                {selected.slug && (
                  <button
                    onClick={() => handleDelete(selected.slug)}
                    className="rounded border border-red-500/40 px-5 py-2 text-xs text-red-400 hover:bg-red-500/10"
                  >
                    SİL
                  </button>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="rounded border border-white/10 px-5 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  İPTAL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, textarea, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  const cls = "mt-1 w-full rounded border border-cyan-500/30 bg-black/60 px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_8px_rgba(0,242,255,0.2)]";
  return (
    <div>
      <label className="text-[10px] text-zinc-500 tracking-wider uppercase">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}
