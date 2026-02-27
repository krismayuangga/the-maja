"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { SplitText } from "@/components/ui/TextEffects";
import { Reveal } from "@/components/ui/CardEffects";

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
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full px-4 sm:px-8 md:px-12 lg:px-16" style={{ padding: "2.5rem 0" }}>

        {/* === TOP: Surya Majapahit Logo + "MAJAPAHIT" === */}
        <div className="flex flex-col items-center mb-2 sm:mb-3 md:mb-4">
          {/* Surya Majapahit Logo */}
          <motion.img
            src="/images/museum/branding/maja-logo-3d.png"
            alt="Surya Majapahit"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-2"
            style={{
              filter: "drop-shadow(0 0 20px rgba(198,167,94,0.4)) drop-shadow(0 0 50px rgba(198,167,94,0.15))",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />

          {/* MAJAPAHIT title */}
          <SplitText
            text="MAJAPAHIT"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.2em] sm:tracking-[0.25em] text-glow-gold"
            style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }}
            delay={0.5}
            stagger={0.06}
            duration={0.7}
          />

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

          {/* Subtitle */}
          <motion.p
            className="text-[9px] sm:text-xs md:text-sm tracking-[0.3em] uppercase text-[#C6A75E]/40 mt-1"
            style={{ fontFamily: "var(--font-inter)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            viewport={{ once: true }}
          >
            Kerajaan Nusantara · 1293—1527 M
          </motion.p>
        </div>

        {/* === CENTER: Two columns — Left (Lontar) | Right (Sumpah Palapa text) === */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-5 sm:gap-6 md:gap-8 lg:gap-12 max-w-6xl w-full">

          {/* LEFT COLUMN: Lontar image */}
          <motion.div
            className="flex flex-col items-center justify-center md:flex-shrink-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Lontar image with ornate frame */}
            <div className="relative group">
              {/* Glow behind lontar */}
              <div className="absolute inset-0 bg-[#C6A75E]/[0.06] blur-[40px] rounded-lg" />

              {/* Ornate frame border */}
              <div className="relative border border-[#C6A75E]/20 p-2 sm:p-3"
                style={{ background: "linear-gradient(135deg, rgba(44,26,18,0.8) 0%, rgba(13,10,6,0.9) 100%)" }}
              >
                {/* Inner frame line */}
                <div className="absolute inset-[6px] sm:inset-[8px] border border-[#C6A75E]/10 pointer-events-none" />

                <Reveal direction="left" delay={1.2} duration={0.7} color="#2C1A12">
                  <img
                    src="/images/museum/sejarah/lontar-sumpah-palapa.png"
                    alt="Visualisasi Lontar Sumpah Palapa"
                    className="w-[320px] sm:w-[380px] md:w-[420px] lg:w-[480px] h-auto object-contain opacity-0 transition-opacity duration-1000"
                    style={{ filter: "brightness(0.9) contrast(1.05) sepia(0.05)" }}
                    onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </Reveal>

                {/* Frame corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C6A75E]/40" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#C6A75E]/40" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#C6A75E]/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C6A75E]/40" />
              </div>
            </div>

            {/* Label under lontar */}
            <motion.p
              className="text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/30 mt-3"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2 }}
              viewport={{ once: true }}
            >
              Visualisasi Lontar Sumpah Palapa
            </motion.p>
          </motion.div>

          {/* RIGHT COLUMN: Sumpah Palapa text — aligned to lontar height */}
          <motion.div
            className="flex-1 flex flex-col justify-center max-w-xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Kawi text — original oath */}
            <div className="mb-6 sm:mb-8">
              <motion.p
                className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#C6A75E]/50 mb-3 sm:mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                viewport={{ once: true }}
              >
                Sumpah Palapa · Kawi
              </motion.p>

              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#C6A75E]/70 italic leading-relaxed"
                style={{ fontFamily: "var(--font-cormorant)" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                &ldquo;Sira Gajah Mada pepatih amangkubhumi tan ayun amukti palapa, sira Gajah Mada: Lamun huwus kalah nusantara isun amukti palapa...&rdquo;
              </motion.p>
            </div>

            {/* Translation — Indonesian */}
            <div className="mt-6">
              <motion.p
                className="text-xs sm:text-sm tracking-[0.15em] uppercase text-[#F5EBDD]/30 mb-3"
                style={{ fontFamily: "var(--font-inter)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                viewport={{ once: true }}
              >
                Terjemahan
              </motion.p>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-[#F5EBDD]/50 leading-relaxed"
                style={{ fontFamily: "var(--font-cormorant)" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                &ldquo;Gajah Mada Patih Amangkubumi tidak akan melepaskan puasa. Ia berkata: Jika telah mengalahkan Nusantara, barulah ia melepaskan puasa...&rdquo;
              </motion.p>
            </div>
          </motion.div>
        </div>

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
