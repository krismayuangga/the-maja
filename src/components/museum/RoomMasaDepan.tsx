"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { SplitText } from "@/components/ui/TextEffects";
import { ParticleField } from "@/components/ui/CardEffects";

const visionItems = [
  { num: "01", title: "Catatan Kepemilikan", desc: "MAJA Certified menjadi catatan kepemilikan karya orisinil yang dapat diperiksa siapa pun" },
  { num: "02", title: "Pasar untuk Pengrajin", desc: "MajaCraft membuka akses pembeli nasional & internasional bagi pengrajin daerah" },
  { num: "03", title: "Cerita Budaya", desc: "Museum Digital & Ruang Budaya merawat kisah di balik setiap karya" },
  { num: "04", title: "Komunitas & Regenerasi", desc: "Duta Daerah, Program Kampus, dan Kontributor menumbuhkan ekosistem dari bawah" },
  { num: "05", title: "Karya Nusantara Mendunia", desc: "Membawa karya budaya Indonesia ke panggung global, dengan pengrajin sebagai pusatnya" },
];

/* Perjalanan MAJA — hanya fakta yang sudah terjadi */
const journey = [
  { when: "2025", what: "Brand MAJA lahir" },
  { when: "Feb 2026", what: "MAJA Museum Digital" },
  { when: "Jul 2026", what: "Marketplace MajaCraft diluncurkan" },
  { when: "Nov 2026", what: "MAJA Certified & program komunitas" },
];

/* Typewriter quote component */
function TypewriterQuote({ inView }: { inView: boolean }) {
  const line1 = "MAJA adalah rumah bagi ekosistem seni dan kerajinan Nusantara — tempat karya dijual dengan adil, dicatat kepemilikannya, dan diceritakan kepada dunia.";
  const charDelay = 0.025;

  return (
    <div className="text-center max-w-5xl mx-auto">
      <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#F5EBDD]/80 leading-relaxed" style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}>
        {line1.split("").map((char, i) => (
          <motion.span
            key={`l1-${i}`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: i * charDelay, duration: 0.02 }}
          >
            {char}
          </motion.span>
        ))}
        {/* Blinking cursor */}
        <motion.span
          className="inline-block w-[2px] h-[1.1em] bg-[#C6A75E] ml-1 align-middle"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
        />
      </p>
    </div>
  );
}

export default function RoomMasaDepan() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; }[]>([]);
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const count = isMobile ? 30 : 80;
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
      }))
    );
  }, [isMobile]);

  return (
    <section className="room room-6 room-auto flex items-center justify-center room-vignette relative">
      {/* Deep sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A10] via-[#0D0A06] to-[#1A1008]" />

      {/* Digital sky background image */}
      <img loading="lazy" decoding="async"
        src="/images/museum/masa-depan/digital-sky.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000"
        onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      {/* Star field */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        ref={registerParallax(12, 10)}
        style={{ willChange: "transform" }}
      >
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-[#C6A75E]"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Gold particle field */}
      <ParticleField count={isMobile ? 8 : 15} color="#C6A75E" minSize={1} maxSize={2} speed="slow" direction="random" />

      {/* Ambient cosmic glow — parallax layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        ref={registerParallax(-14, -10)}
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(198,167,94,0.04) 0%, transparent 60%)",
          willChange: "transform",
        }}
      />

      {/* Island silhouettes at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        ref={registerParallax(-8, -4)}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 1200 200" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,180 Q60,140 120,160 Q160,120 200,150 L200,200 L0,200 Z" fill="#1A1008" opacity="0.6" />
          <path d="M250,170 Q320,110 400,140 Q430,120 460,150 L460,200 L250,200 Z" fill="#1A1008" opacity="0.6" />
          <path d="M500,165 Q560,130 620,155 Q650,140 680,160 L680,200 L500,200 Z" fill="#1A1008" opacity="0.6" />
          <path d="M730,170 Q800,100 880,130 Q920,110 980,150 L980,200 L730,200 Z" fill="#1A1008" opacity="0.6" />
          <path d="M1020,175 Q1080,140 1140,155 Q1170,145 1200,165 L1200,200 L1020,200 Z" fill="#1A1008" opacity="0.6" />

          {/* Connecting light lines */}
          <motion.path d="M120,155 Q200,120 380,140" stroke="#C6A75E" strokeWidth="0.8" fill="none" opacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} viewport={{ once: true }} />
          <motion.path d="M400,140 Q480,110 580,150" stroke="#C6A75E" strokeWidth="0.8" fill="none" opacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }} viewport={{ once: true }} />
          <motion.path d="M620,150 Q700,100 840,130" stroke="#C6A75E" strokeWidth="0.8" fill="none" opacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.5 }} viewport={{ once: true }} />
          <motion.path d="M880,135 Q960,105 1100,150" stroke="#C6A75E" strokeWidth="0.8" fill="none" opacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 2 }} viewport={{ once: true }} />

          {[120, 380, 580, 840, 1100].map((x, i) => (
            <motion.circle key={i} cx={x} cy={[155, 140, 150, 130, 150][i]} r="3" fill="#C6A75E"
              initial={{ opacity: 0 }} whileInView={{ opacity: [0, 0.8, 0.4] }}
              transition={{ duration: 2, delay: 0.5 + i * 0.5, repeat: Infinity }} viewport={{ once: true }} />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 ml-12 sm:ml-16 md:ml-20 mr-4 sm:mr-8 md:mr-12 w-auto flex flex-col items-center h-full"
        style={{ justifyContent: "flex-start", paddingTop: isMobile ? "2rem" : "3rem" }}
      >
        {/* ── HEADER (matching RoomEkonomi style) ── */}
        <motion.div
          className="text-center"
          style={{ marginBottom: isMobile ? "0.5rem" : "1rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-[#C6A75E]/50 block mb-1 sm:mb-2"
            style={{ fontFamily: "var(--font-philosopher)" }}
          >
            Ruang Visi
          </span>
          <div className="mb-1 sm:mb-2">
            <SplitText
              text="Rumah Karya Nusantara"
              className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-glow-gold"
              style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }}
              delay={0.2}
              stagger={0.05}
            />
          </div>
          <p
            className="text-xs sm:text-base md:text-lg text-[#F5EBDD]/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Visi &amp; perjalanan ekosistem MAJA
          </p>
        </motion.div>

        {/* ── Typewriter Quote ── */}
        <div
          ref={quoteRef}
          className="w-full max-w-5xl px-2 sm:px-4"
          style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}
        >
          <TypewriterQuote inView={quoteInView} />
        </div>

        {/* ── 5 Vision Items — clean numbered grid ── */}
        <motion.div
          className="w-full max-w-5xl"
          style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Row 1: 3 items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-2 sm:mb-4">
            {visionItems.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.num}
                className="relative border border-[#C6A75E]/20 bg-[#1A1008]/50 p-3 sm:p-4 md:p-5 rounded-lg group hover:bg-[#C6A75E]/5 hover:border-[#C6A75E]/40 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Top gold accent line */}
                <motion.div
                  className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#C6A75E] to-[#C6A75E]/0"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ delay: 0.8 + i * 0.12, duration: 0.6 }}
                  viewport={{ once: true }}
                />
                <span className="text-xl sm:text-3xl md:text-4xl font-bold text-[#C6A75E]/15 block mb-1 sm:mb-2 leading-none" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {item.num}
                </span>
                <h3 className="text-xs sm:text-base md:text-lg font-semibold text-[#C6A75E] mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-sm md:text-base text-[#F5EBDD]/60 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
          {/* Row 2: 2 items centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 sm:max-w-[66.7%] sm:mx-auto">
            {visionItems.slice(3).map((item, i) => (
              <motion.div
                key={item.num}
                className="relative border border-[#C6A75E]/20 bg-[#1A1008]/50 p-3 sm:p-4 md:p-5 rounded-lg group hover:bg-[#C6A75E]/5 hover:border-[#C6A75E]/40 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#C6A75E] to-[#C6A75E]/0"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ delay: 1.2 + i * 0.12, duration: 0.6 }}
                  viewport={{ once: true }}
                />
                <span className="text-xl sm:text-3xl md:text-4xl font-bold text-[#C6A75E]/15 block mb-1 sm:mb-2 leading-none" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {item.num}
                </span>
                <h3 className="text-xs sm:text-base md:text-lg font-semibold text-[#C6A75E] mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-sm md:text-base text-[#F5EBDD]/60 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Perjalanan MAJA ── */}
        <motion.div
          className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
          style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          {journey.map((j) => (
            <div key={j.when} className="border-l-2 border-[#C6A75E]/40 pl-3 py-1">
              <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>{j.when}</p>
              <p className="text-[11px] sm:text-sm text-[#F5EBDD]/70" style={{ fontFamily: "var(--font-inter)" }}>{j.what}</p>
            </div>
          ))}
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-5xl"
          style={{ marginBottom: isMobile ? "6rem" : "2rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
        >
          {[
            { href: "https://majacraft.id", label: "Kunjungi MajaCraft", primary: true },
            { href: "https://majacraft.id/certified", label: "MAJA Certified" },
            { href: "https://majacraft.id/karir", label: "Bergabung" },
          ].map((b) => (
            <a key={b.label} href={b.href} target="_blank" rel="noopener"
              className={`w-full sm:w-auto text-center px-8 py-3 rounded-xl tracking-widest uppercase text-xs sm:text-sm transition-colors ${b.primary ? "border-2 border-[#C6A75E]/70 text-[#C6A75E] hover:bg-[#C6A75E]/10" : "border border-[#C6A75E]/30 text-[#F5EBDD]/75 hover:border-[#C6A75E]/60"}`}
              style={{ fontFamily: "var(--font-cinzel)" }}>
              {b.label}
            </a>
          ))}
        </motion.div>

        {/* Footer signature */}
        <motion.div
          className="pb-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-[#C6A75E]/40" />
            <span className="text-[#C6A75E]/60 text-4xl sm:text-5xl md:text-6xl" style={{ fontFamily: "serif" }}>ꦩꦗ</span>
            <div className="w-20 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-[#C6A75E]/40" />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-[#C6A75E]/50 tracking-[0.35em] uppercase text-center" style={{ fontFamily: "var(--font-cinzel)" }}>
            Rumah Ekosistem Seni &amp; Kerajinan Nusantara
          </p>
        </motion.div>
      </div>
    </section>
  );
}
