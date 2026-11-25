"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";

/* ── Typewriter bridge text ── */
// Lightweight bridge text (no per-character typing)
function LightBridge() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <motion.p
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5EBDD]/70 leading-snug mb-2"
        style={{ fontFamily: "var(--font-cinzel)", fontWeight: 500 }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Dulu Nusantara disatukan oleh <span className="text-[#C6A75E]/80">Sumpah Palapa</span>.
      </motion.p>

      <motion.p
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5EBDD]/70 leading-snug"
        style={{ fontFamily: "var(--font-cinzel)", fontWeight: 500 }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Kini Nusantara disatukan oleh <span className="text-[#C6A75E]">kreativitas</span>.
      </motion.p>
    </div>
  );
}

export default function RoomSejarah() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);
  const bridgeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="room room-1 flex items-center justify-center grain-overlay room-vignette">
      {/* Warm ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A12] via-[#1A1008] to-[#0D0A06]" />

      {/* Background image support */}
      <img
        src="/images/museum/sejarah/relief-texture.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 mix-blend-overlay"
        onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.15"; }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      {/* Relief texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url('/images/ukiran-maja.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />

      {/* Warm golden ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#C6A75E] opacity-[0.05] blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#C6A75E]/[0.03] to-transparent" />
      </div>

      {/* Ornamental corner frames */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C6A75E]/40 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-[#C6A75E]/40 to-transparent" />
        </div>
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#C6A75E]/40 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#C6A75E]/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-20 sm:h-20">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C6A75E]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-[#C6A75E]/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-20 sm:h-20">
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#C6A75E]/40 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-[#C6A75E]/40 to-transparent" />
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full overflow-x-hidden box-border" style={{ padding: "2.5rem 1rem", paddingLeft: "1rem", paddingRight: "1rem" }}>

        {/* === TOP: Logo The MAJA + judul === */}
        <div className="flex flex-col items-center mb-2 sm:mb-3 md:mb-4">
          {/* Logo The MAJA */}
          <motion.img
            src="/images/museum/branding/themaja-logo-600.png"
            alt="Logo The MAJA"
            className="h-14 sm:h-16 md:h-20 w-auto object-contain mb-2"
            style={{
              filter: "drop-shadow(0 0 20px rgba(198,167,94,0.4)) drop-shadow(0 0 50px rgba(198,167,94,0.15))",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />

          {/* The MAJA — di bawah logo */}
          <motion.p
            className="text-xs sm:text-sm md:text-base tracking-[0.5em] uppercase text-[#C6A75E]/75 mb-4 sm:mb-5 pl-[0.5em]"
            style={{ fontFamily: "var(--font-cinzel)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            The MAJA
          </motion.p>

          {/* Judul */}
          <motion.h2
            className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.12em] sm:tracking-[0.18em] leading-snug text-glow-gold max-w-4xl"
            style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ekosistem Seni &amp; Kerajinan Nusantara
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent to-[#C6A75E]/50"
              initial={{ width: 0 }}
              whileInView={{ width: 50 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
            />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C6A75E]/50" />
            <motion.div
              className="h-[1px] bg-gradient-to-l from-transparent to-[#C6A75E]/50"
              initial={{ width: 0 }}
              whileInView={{ width: 50 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
            />
          </motion.div>

        </div>

        {/* === CENTER: Narasi MAJA (teks besar) === */}
        <motion.div
          className="max-w-4xl w-full px-3 sm:px-6 text-center space-y-5 sm:space-y-7 my-8 md:my-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p
            className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.2] text-[#F5EBDD]/90 max-w-3xl mx-auto text-balance"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Dari Sabang sampai Merauke, setiap karya seni dan kriya menyimpan <span className="text-[#C6A75E] italic whitespace-nowrap">tangan, waktu,</span> <span className="text-[#C6A75E] italic">dan cerita</span>.
          </p>
          <p
            className="text-lg sm:text-2xl md:text-[1.75rem] leading-relaxed text-[#F5EBDD]/60 max-w-2xl mx-auto text-balance"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            MAJA menyatukannya dalam satu rumah: tempat karya dijual dengan adil, kepemilikannya tercatat, dan kisahnya sampai ke dunia.
          </p>
        </motion.div>

        {/* === BOTTOM CENTER: Bridge text (light animation) === */}
        <div ref={bridgeRef} className="w-full flex flex-col items-center mt-2 sm:mt-3">
          <motion.div
            className="flex items-center justify-center gap-4 mb-4 sm:mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C6A75E]/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C6A75E]/30" />
            <motion.div
              className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C6A75E]/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <LightBridge />

          {/* Scroll hint */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-4 sm:mt-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            <span
              className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[#C6A75E]/30"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {isMobile ? "Scroll ke bawah" : "Scroll to explore"}
            </span>
            <motion.div
              className="w-[1px] h-6 bg-gradient-to-b from-[#C6A75E]/30 to-transparent"
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Aksara Jawa watermark — parallax very slow */}
      <div className="absolute bottom-8 right-6 sm:right-12 text-[25vw] sm:text-[15vw] text-[#C6A75E]/[0.02] select-none pointer-events-none z-0"
        ref={registerParallax(-20, -10)}
        style={{ fontFamily: "serif", willChange: "transform" }}
      >
        ꦩꦗ
      </div>
    </section>
  );
}
