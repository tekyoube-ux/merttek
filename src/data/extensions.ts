import type { ExtensionInfo } from "@/types";

export const extensions: ExtensionInfo[] = [
  {
    id: "ig-chat-cleaner",
    slug: "ig-chat-cleaner",
    name: "IG Chat Cleaner",
    description:
      "İnstagram Mesaj Silme — Instagram direkt mesajlarını (DM) otomatik, hızlı ve güvenli şekilde toplu silen Chrome eklentisi.",
    longDescription:
      "IG Chat Cleaner, Instagram web arayüzü üzerinden mesaj kutunuzdaki sohbetleri otomatik olarak siler. Maksimum silme limiti, ayarlanabilir çalışma hızı, DOM güvenliği ve canlı işlem günlüğü desteği sunar.",
    version: "1.1.0",
    browser: ["Chrome", "Brave", "Edge", "Chromium"],
    category: "chrome",
    status: "stable",
    icon: "/apps/ig-chat-cleaner/icon.png",
    screenshots: ["/apps/ig-chat-cleaner/screenshot.png"],
    installUrl:
      "https://www.dropbox.com/scl/fi/ll14l69ge0znjhgljn7h2/mesajsil-MT.rar?rlkey=pvu8z7qq1zwajptmx2gk8uvzk&st=tibwp6d4&dl=1",
    releaseDate: "2025-01-10",
    updatedAt: "2026-08-25",
  },
  {
    id: "1",
    slug: "mrt-dark-reader",
    name: "MRT Dark Reader",
    description:
      "Göz yorgunluğunu azaltan akıllı karanlık mod eklentisi.",
    longDescription:
      "Dark Reader, sitelerdeki aydınlık temaları okunabilir koyu temalara dönüştürerek gece görünümü sunar.",
    version: "3.1.0",
    browser: ["Chrome", "Chromium"],
    status: "stable",
    icon: "/apps/mrt-dark-reader/icon.svg",
    screenshots: [],
    installUrl: "#install-mrt-dark-reader",
    releaseDate: "2024-05-20",
    updatedAt: "2025-08-01",
  },
  {
    id: "2",
    slug: "mrt-ad-blocker",
    name: "MRT Ad Blocker",
    description:
      "Hızlı ve güçlü reklam engelleyici eklentisi.",
    longDescription:
      "Reklam ve tracker’ları filtreleyerek daha temiz, daha hızlı bir gezinme deneyimi sunar.",
    version: "2.5.0",
    browser: ["Chrome", "Chromium", "Firefox"],
    status: "stable",
    icon: "/apps/mrt-ad-blocker/icon.svg",
    screenshots: [],
    installUrl: "#install-mrt-ad-blocker",
    releaseDate: "2024-06-15",
    updatedAt: "2025-03-22",
  },
];
