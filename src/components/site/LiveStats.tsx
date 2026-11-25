"use client";

import React, { useEffect, useState } from "react";

type Stats = { karya: number; pengrajin: number; provinsi: number; sertifikat: number };

/** Angka ekosistem langsung dari MajaCraft */
export default function LiveStats() {
  const [s, setS] = useState<Stats | null>(null);
  useEffect(() => {
    fetch("https://majacraft.id/api/stats/public").then((r) => r.json())
      .then((j) => j?.success && setS(j.data)).catch(() => {});
  }, []);
  const items = [
    { v: s?.karya, l: "Karya aktif" },
    { v: s?.pengrajin, l: "Seniman bergabung" },
    { v: s?.provinsi, l: "Provinsi" },
    { v: s?.sertifikat, l: "Sertifikat tercatat" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border-y border-[#C6A75E]/20 divide-x divide-[#C6A75E]/15">
      {items.map((it, i) => (
        <div key={it.l} className={`py-5 text-center ${i >= 2 ? "border-t sm:border-t-0 border-[#C6A75E]/15" : ""}`}>
          <p className="text-3xl sm:text-4xl text-[#E8D5A3]" style={{ fontFamily: "var(--font-cormorant)" }}>{it.v ?? "–"}</p>
          <p className="mt-1 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#F5EBDD]/50">{it.l}</p>
        </div>
      ))}
    </div>
  );
}
