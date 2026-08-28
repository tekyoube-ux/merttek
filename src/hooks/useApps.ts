"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { apps as staticApps } from "@/data/apps";
import { extensions as staticExtensions } from "@/data/extensions";
import type { AppInfo, ExtensionInfo } from "@/types";

// Firestore'dan AppInfo formatına dönüştür
function toAppInfo(id: string, data: Record<string, unknown>): AppInfo {
  return {
    id,
    slug: (data.slug as string) || id,
    name: (data.name as string) || "",
    category: (data.category as AppInfo["category"]) || "other",
    platform: (data.platform as AppInfo["platform"]) || "Windows",
    status: (data.status as AppInfo["status"]) || "stable",
    version: (data.version as string) || "1.0.0",
    description: (data.description as string) || "",
    longDescription: (data.longDescription as string) || "",
    icon: (data.icon as string) || "",
    screenshots: [],
    features: typeof data.features === "string"
      ? (data.features as string).split("\n").filter(Boolean)
      : (data.features as string[]) || [],
    requirements: typeof data.requirements === "string"
      ? (data.requirements as string).split("\n").filter(Boolean)
      : (data.requirements as string[]) || [],
    downloadUrl: (data.downloadUrl as string) || "#",
    releaseDate: (data.releaseDate as string) || "",
    updatedAt: (data.updatedAt as string) || "",
  };
}

export function useApps() {
  const [apps, setApps] = useState<AppInfo[]>(staticApps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "apps"))
      .then((snap) => {
        if (!snap.empty) {
          const data = snap.docs.map((d) => toAppInfo(d.id, d.data() as Record<string, unknown>));
          setApps(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { apps, loading };
}

export function useApp(slug: string) {
  const [app, setApp] = useState<AppInfo | undefined>(staticApps.find((a) => a.slug === slug));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "apps", slug))
      .then((d) => {
        if (d.exists()) {
          setApp(toAppInfo(d.id, d.data() as Record<string, unknown>));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  return { app, loading };
}

export function useExtensions() {
  const [exts, setExts] = useState<ExtensionInfo[]>(staticExtensions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "apps"))
      .then((snap) => {
        if (!snap.empty) {
          const data = snap.docs
            .map((d) => toAppInfo(d.id, d.data() as Record<string, unknown>))
            .filter((a) => a.category === "chrome" || a.platform === "Extension")
            .map((a): ExtensionInfo => ({
              id: a.id,
              slug: a.slug,
              name: a.name,
              description: a.description,
              longDescription: a.longDescription,
              version: a.version,
              browser: ["Chrome", "Brave", "Edge"],
              category: a.category,
              status: a.status,
              icon: a.icon,
              screenshots: a.screenshots,
              installUrl: a.downloadUrl,
              releaseDate: a.releaseDate,
              updatedAt: a.updatedAt,
            }));
          if (data.length > 0) setExts(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { extensions: exts, loading };
}
