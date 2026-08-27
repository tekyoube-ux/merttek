"use client";

import { useState } from "react";
import type { AppCategory } from "@/types";

export default function SearchFilter({
  initialSearch,
  initialCategory,
}: {
  initialSearch: string;
  initialCategory: AppCategory | "all";
}) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<AppCategory | "all">(initialCategory);

  function updateFilter(nextSearch: string, nextCategory: AppCategory | "all") {
    setSearch(nextSearch);
    setCategory(nextCategory);

    const url = new URL(window.location.href);
    if (nextSearch) {
      url.searchParams.set("search", nextSearch);
    } else {
      url.searchParams.delete("search");
    }
    if (nextCategory !== "all") {
      url.searchParams.set("category", nextCategory);
    } else {
      url.searchParams.delete("category");
    }
    window.location.href = url.toString();
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-sm">
        <input
          type="text"
          placeholder="Uygulama ara..."
          value={search}
          onChange={(e) => updateFilter(e.target.value, category)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 text-white placeholder:text-zinc-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterButton
          label="Tümü"
          active={category === "all"}
          onClick={() => updateFilter(search, "all")}
        />
        <FilterButton
          label="Windows"
          active={category === "windows"}
          onClick={() => updateFilter(search, "windows")}
        />
        <FilterButton
          label="Chrome"
          active={category === "chrome"}
          onClick={() => updateFilter(search, "chrome")}
        />
        <FilterButton
          label="Araçlar"
          active={category === "tools"}
          onClick={() => updateFilter(search, "tools")}
        />
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "border border-white/10 text-zinc-200 hover:border-white/20"
      }`}
    >
      {label}
    </button>
  );
}
