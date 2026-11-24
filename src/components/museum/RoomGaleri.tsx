"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import { SplitText } from "@/components/ui/TextEffects";
import { ParticleField } from "@/components/ui/CardEffects";

export const MAJACRAFT = "https://majacraft.id";

export type CertItem = {
  id: string; productName: string; sellerName: string; sellerStore: string;
  imageUrl: string | null; nftTokenId: string | null; issuedAt: string; source?: string;
};

export function certThumb(c: { id: string; imageUrl: string | null }) {
  return `${MAJACRAFT}/uploads/certificates/thumbs/${c.id}.jpg`;
}

/** Ruang "Galeri Sertifikat" — sertifikat kepemilikan terbaru, data langsung dari MajaCraft. */
export default function RoomGaleri() {
  const isMobile = useIsMobile();
  const [certs, setCerts] = useState<CertItem[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(`${MAJACRAFT}/api/certificate?limit=4`)
      .then((r) => r.json())
      .then((d) => { setCerts(d?.data?.certificates ?? []); setTotal(d?.data?.pagination?.total ?? null); })
      .catch(() => setCerts([]));
  }, [isMobile]);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim().replace(/^#?MC-(?=\d{4}-)/i, "MAJA-"); // format cetak "#MC-…"
    if (v) window.location.href = /^MAJA-/i.test(v) ? `/sertifikat/?id=${encodeURIComponent(v.toUpperCase())}` : `/sertifikat/?q=${encodeURIComponent(v)}`;
  };

  return (
    <section id="galeri" className="room room-auto flex items-center justify-center room-vignette relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0B07] via-[#1A1008] to-[#0D0A06]" />
      <ParticleField count={isMobile ? 8 : 16} color="#C6A75E" minSize={1} maxSize={2} speed="slow" direction="random" />

      <div className="room-content relative z-10">
        <div className="min-h-full px-4 pb-24 pt-10 sm:pb-12 sm:pt-12 sm:pl-24 md:pl-28 sm:pr-8 md:pr-12 flex flex-col items-center justify-center">
          <motion.div className="text-center mb-6 sm:mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
            <span className="text-sm sm:text-base tracking-[0.5em] uppercase text-[#C6A75E]/40 block mb-2" style={{ fontFamily: "var(--font-philosopher)" }}>Ruang Arsip</span>
            <SplitText text="Galeri Sertifikat" className="text-2xl sm:text-3xl md:text-5xl font-bold text-glow-gold" style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }} delay={0.2} stagger={0.04} />
            <p className="mt-3 text-base sm:text-xl text-[#F5EBDD]/60 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-cormorant)" }}>
              Karya-karya yang kepemilikannya telah tercatat{total ? ` — ${total} sertifikat` : ""}. Periksa sertifikat mana pun tanpa akun.
            </p>
          </motion.div>

          <form onSubmit={go} className="flex w-full max-w-md gap-2 mb-6 sm:mb-8">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ID sertifikat (MAJA-2026-…) atau nama karya"
              className="flex-1 h-11 px-4 rounded-lg bg-[#1A1008]/80 border border-[#C6A75E]/30 text-[#F5EBDD] placeholder:text-[#F5EBDD]/30 text-sm focus:outline-none focus:border-[#C6A75E]" style={{ fontFamily: "var(--font-inter)" }} />
            <button className="h-11 px-5 rounded-lg border border-[#C6A75E]/60 text-[#C6A75E] text-xs tracking-widest uppercase hover:bg-[#C6A75E]/10" style={{ fontFamily: "var(--font-cinzel)" }}>Cek</button>
          </form>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl">
            {certs.map((c, i) => (
              <motion.a key={c.id} href={`/sertifikat/?id=${c.id}`} className="group block border border-[#C6A75E]/20 bg-[#1A1008]/60 rounded-lg overflow-hidden hover:border-[#C6A75E]/60 transition-colors"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} viewport={{ once: true }}>
                <div className="aspect-[3/2] bg-[#0D0A06] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={certThumb(c)} alt={c.productName} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { if (c.imageUrl) (e.target as HTMLImageElement).src = `${MAJACRAFT}${c.imageUrl}`; }} />
                </div>
                <div className="p-2.5 sm:p-3">
                  <p className="text-xs sm:text-sm text-[#F5EBDD] line-clamp-1" style={{ fontFamily: "var(--font-inter)" }}>{c.productName}</p>
                  <p className="text-[10px] sm:text-xs text-[#C6A75E]/70 line-clamp-1" style={{ fontFamily: "var(--font-inter)" }}>{c.sellerName}{c.source === "certified" ? " · MAJA Certified" : ""}</p>
                  <p className="text-[9px] sm:text-[10px] text-[#F5EBDD]/30 font-mono mt-0.5">{c.id}</p>
                </div>
              </motion.a>
            ))}
            {certs.length === 0 && Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[3/2] rounded-lg border border-[#C6A75E]/10 bg-[#1A1008]/40 animate-pulse" />)}
          </div>

          <Link href="/sertifikat/" className="mt-6 sm:mt-8 px-8 py-3 border-2 border-[#C6A75E]/50 text-[#C6A75E] rounded-xl tracking-widest uppercase text-xs sm:text-sm hover:bg-[#C6A75E]/10 transition-colors" style={{ fontFamily: "var(--font-cinzel)" }}>
            Lihat Semua Sertifikat
          </Link>
        </div>
      </div>
    </section>
  );
}
