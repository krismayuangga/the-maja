"use client";

import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import { SplitText } from "@/components/ui/TextEffects";
import { ParticleField, SpotlightCard } from "@/components/ui/CardEffects";

/** Ruang "Ekosistem MAJA" — empat pilar yang dipayungi MAJA, masing-masing dengan tautan aktif. */
const pillars = [
  {
    tag: "Marketplace",
    title: "MajaCraft",
    desc: "Jual beli karya pengrajin Nusantara dengan pembayaran aman, ongkir ke seluruh Indonesia, dan asuransi untuk karya seni.",
    href: "https://majacraft.id",
    cta: "Kunjungi MajaCraft",
    icon: "M4 10h24l-2 16H6L4 10zm6 0V8a6 6 0 0112 0v2",
  },
  {
    tag: "Sertifikasi",
    title: "MAJA Certified",
    desc: "Sertifikat kepemilikan phygital untuk karya orisinil — bagi seniman dan kolektor, termasuk karya yang dijual di luar MajaCraft.",
    href: "https://majacraft.id/certified",
    cta: "Ajukan Sertifikat",
    icon: "M16 3l10 4v8c0 7-4.5 11-10 14C10.5 26 6 22 6 15V7l10-4zm-4 13l3 3 6-6",
  },
  {
    tag: "Budaya",
    title: "Ruang Budaya",
    desc: "Kisah di balik karya, profil pengrajin, dan liputan tradisi dari seluruh Nusantara.",
    href: "https://majacraft.id/ruang-budaya",
    cta: "Baca Kisahnya",
    icon: "M6 6h9a3 3 0 013 3v17a2 2 0 00-2-2H6V6zm20 0h-9a3 3 0 00-3 3v17a2 2 0 012-2h10V6z",
  },
  {
    tag: "Komunitas",
    title: "Komunitas MAJA",
    desc: "Duta Daerah, Program Kampus, dan Kontributor yang menumbuhkan ekosistem dari daerah.",
    href: "https://majacraft.id/karir",
    cta: "Bergabung",
    icon: "M11 14a4 4 0 100-8 4 4 0 000 8zm10 0a4 4 0 100-8 4 4 0 000 8zM3 26c0-4 3.5-7 8-7s8 3 8 7m2-7c4.5 0 8 3 8 7",
  },
];

export default function RoomEkosistem() {
  const isMobile = useIsMobile();
  return (
    <section className="room room-auto flex items-center justify-center room-vignette relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#120C07] via-[#1E150E] to-[#0D0A06]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C6A75E] opacity-[0.06] blur-[160px] pointer-events-none" />
      <ParticleField count={isMobile ? 10 : 20} color="#C6A75E" minSize={1} maxSize={2} speed="slow" direction="up" />

      <div className="room-content relative z-10">
        <div className="min-h-full px-4 pb-24 pt-10 sm:pb-12 sm:pt-12 sm:pl-24 md:pl-28 sm:pr-8 md:pr-12 flex flex-col items-center justify-center">
          <motion.div className="text-center mb-8 sm:mb-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
            <span className="text-sm sm:text-base tracking-[0.5em] uppercase text-[#C6A75E]/40 block mb-2" style={{ fontFamily: "var(--font-philosopher)" }}>
              Ruang Ekosistem
            </span>
            <SplitText text="Ekosistem MAJA" className="text-2xl sm:text-3xl md:text-5xl font-bold text-glow-gold" style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }} delay={0.2} stagger={0.04} />
            <p className="mt-3 text-base sm:text-xl text-[#F5EBDD]/60 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-cormorant)" }}>
              Satu rumah untuk pengrajin, seniman, dan kolektor — dari menjual karya, mencatat kepemilikannya, hingga menceritakannya.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-6xl">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }} viewport={{ once: true }}>
                <SpotlightCard className="h-full border border-[#C6A75E]/20 bg-[#1A1008]/60 backdrop-blur-sm rounded-lg hover:border-[#C6A75E]/50 transition-all duration-500">
                  <a href={p.href} target="_blank" rel="noopener" className="flex flex-col h-full p-5 sm:p-6 group">
                    <svg viewBox="0 0 32 32" className="w-9 h-9 mb-3" fill="none" stroke="#C6A75E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/50" style={{ fontFamily: "var(--font-inter)" }}>{p.tag}</span>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#C6A75E] mt-1 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>{p.title}</h3>
                    <p className="text-sm sm:text-base text-[#F5EBDD]/60 leading-relaxed flex-1" style={{ fontFamily: "var(--font-cormorant)" }}>{p.desc}</p>
                    <span className="mt-4 text-xs tracking-widest uppercase text-[#C6A75E]/80 group-hover:text-[#C6A75E]" style={{ fontFamily: "var(--font-inter)" }}>{p.cta} →</span>
                  </a>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
