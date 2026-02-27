"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { SplitText, Magnetic } from "@/components/ui/TextEffects";
import { ParticleField } from "@/components/ui/CardEffects";

const visionItems = [
  { num: "01", title: "Sertifikasi Seni Digital", desc: "Standar digital sertifikasi seni Indonesia — identitas on-chain yang tak bisa dipalsukan" },
  { num: "02", title: "Ekspor Budaya", desc: "Infrastruktur ekspor karya budaya ke panggung global" },
  { num: "03", title: "UMKM Kreatif", desc: "Ekosistem ekonomi mandiri untuk UMKM kreatif Nusantara" },
  { num: "04", title: "Cultural Web3 Hub", desc: "Pusat inovasi blockchain untuk pelestarian seni Asia Tenggara" },
  { num: "05", title: "Ekonomi Nasional", desc: "Platform ekonomi kreatif nasional berbasis blockchain" },
];

/* Typewriter quote component */
function TypewriterQuote({ inView }: { inView: boolean }) {
  const line1 = "Gajah Mada mempersatukan Nusantara secara politik melalui Sumpah Palapa.";
  const line2 = "Hari ini, Nusantara disatukan kembali \u2014 bukan oleh kekuasaan, tapi oleh kreativitas dan identitas budaya.";
  const charDelay = 0.03;
  const line2Start = line1.length * charDelay + 0.6;

  return (
    <div className="text-left max-w-3xl mx-auto">
      {/* Line 1 */}
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5EBDD]/80 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}>
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
      </p>
      {/* Line 2 — gold highlight on key phrase */}
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed" style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}>
        {line2.split("").map((char, i) => {
          const goldStart = line2.indexOf("bukan oleh kekuasaan");
          const isGold = i >= goldStart;
          return (
            <motion.span
              key={`l2-${i}`}
              className={isGold ? "text-[#C6A75E]" : "text-[#F5EBDD]/80"}
              style={isGold ? { fontWeight: 400 } : undefined}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: line2Start + i * charDelay, duration: 0.02 }}
            >
              {char}
            </motion.span>
          );
        })}
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
    <section className="room room-6 flex items-center justify-center room-vignette relative">
      {/* Deep sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A10] via-[#0D0A06] to-[#1A1008]" />

      {/* Digital sky background image */}
      <img
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
            Vision Room
          </span>
          <div className="mb-1 sm:mb-2">
            <SplitText
              text="MAJA is not a token."
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-glow-gold"
              style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }}
              delay={0.2}
              stagger={0.05}
            />
          </div>
          <p
            className="text-xs sm:text-base md:text-lg text-[#F5EBDD]/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            It is the Creative Infrastructure of Nusantara
          </p>
        </motion.div>

        {/* ── Typewriter Quote ── */}
        <div
          ref={quoteRef}
          className="w-full max-w-5xl px-2 sm:px-4"
          style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}
        >
          <div className="border-l-2 border-[#C6A75E]/30 pl-5 sm:pl-8 py-2">
            <TypewriterQuote inView={quoteInView} />
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            {visionItems.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.num}
                className="relative border border-[#C6A75E]/20 bg-[#1A1008]/50 p-5 sm:p-6 md:p-7 rounded-lg group hover:bg-[#C6A75E]/5 hover:border-[#C6A75E]/40 transition-all duration-500"
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
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C6A75E]/15 block mb-2 sm:mb-3 leading-none" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {item.num}
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#C6A75E] mb-1.5" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#F5EBDD]/60 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
          {/* Row 2: 2 items centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 sm:max-w-[66.7%] sm:mx-auto">
            {visionItems.slice(3).map((item, i) => (
              <motion.div
                key={item.num}
                className="relative border border-[#C6A75E]/20 bg-[#1A1008]/50 p-5 sm:p-6 md:p-7 rounded-lg group hover:bg-[#C6A75E]/5 hover:border-[#C6A75E]/40 transition-all duration-500"
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
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C6A75E]/15 block mb-2 sm:mb-3 leading-none" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {item.num}
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#C6A75E] mb-1.5" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#F5EBDD]/60 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA Buttons (animated & eye-catching — LARGE) ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-5xl"
          style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          {/* Primary — Enter Marketplace */}
          <Magnetic>
            <motion.a
              href="#"
              className="relative w-full sm:w-auto text-center px-12 sm:px-16 md:px-20 py-5 sm:py-6 md:py-7 border-2 border-[#C6A75E]/50 text-[#C6A75E] font-semibold tracking-widest text-base sm:text-lg md:text-xl uppercase rounded-xl overflow-hidden group hover:border-[#C6A75E] transition-colors duration-500"
              style={{ fontFamily: "var(--font-cinzel)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#C6A75E]/10 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                Enter Marketplace
              </span>
            </motion.a>
          </Magnetic>

          {/* Secondary — Read Whitepaper */}
          <Magnetic>
            <motion.a
              href="/whitepaper.pdf"
              target="_blank"
              rel="noopener"
              className="relative w-full sm:w-auto text-center px-12 sm:px-16 md:px-20 py-5 sm:py-6 md:py-7 border-2 border-[#C6A75E]/50 text-[#C6A75E] font-semibold tracking-widest text-base sm:text-lg md:text-xl uppercase rounded-xl overflow-hidden group hover:border-[#C6A75E] transition-colors duration-500"
              style={{ fontFamily: "var(--font-cinzel)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Hover fill */}
              <motion.div
                className="absolute inset-0 bg-[#C6A75E]/10 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1" />
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1" />
                </svg>
                Read Whitepaper
              </span>
            </motion.a>
          </Magnetic>

          {/* Secondary — Join Community */}
          <Magnetic>
            <motion.a
              href="#"
              className="relative w-full sm:w-auto text-center px-12 sm:px-16 md:px-20 py-5 sm:py-6 md:py-7 border-2 border-[#C6A75E]/50 text-[#C6A75E] font-semibold tracking-widest text-base sm:text-lg md:text-xl uppercase rounded-xl overflow-hidden group hover:border-[#C6A75E] transition-colors duration-500"
              style={{ fontFamily: "var(--font-cinzel)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#C6A75E]/10 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Join Community
              </span>
            </motion.a>
          </Magnetic>
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
            Creative Economy Infrastructure of Nusantara
          </p>
        </motion.div>
      </div>
    </section>
  );
}
