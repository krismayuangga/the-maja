"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation",
    period: "Year 1",
    items: [
      "Launch token",
      "Launch basic marketplace",
      "Fokus Batik & Seni Lukis",
    ],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    period: "Year 2",
    items: [
      "Integrasi logistik nasional",
      "Onboard 1.000+ seniman",
      "Launch DAO governance",
      "Event budaya offline",
    ],
  },
  {
    phase: "Phase 3",
    title: "Globalization",
    period: "Year 3",
    items: [
      "Cross-border collector system",
      "Partnership museum & institusi",
      "NFT museum virtual Nusantara",
      "API certification system",
    ],
  },
];

export default function RoomMasaDepan() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; }[]>([]);
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);

  useEffect(() => {
    // Kurangi bintang di mobile biar performa lancar
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

      {/* Ambient cosmic glow — parallax layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        ref={registerParallax(-14, -10)}
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(198,167,94,0.04) 0%, transparent 60%)",
          willChange: "transform",
        }}
      />

      {/* Island silhouettes at bottom — connected by light network */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        ref={registerParallax(-8, -4)}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 1200 200" className="w-full h-auto" preserveAspectRatio="none">
          {/* Island silhouettes */}
          <path d="M0,180 Q60,140 120,160 Q160,120 200,150 L200,200 L0,200 Z" fill="#1A1008" opacity="0.6" />
          <path d="M250,170 Q320,110 400,140 Q430,120 460,150 L460,200 L250,200 Z" fill="#1A1008" opacity="0.6" />
          <path d="M500,165 Q560,130 620,155 Q650,140 680,160 L680,200 L500,200 Z" fill="#1A1008" opacity="0.6" />
          <path d="M730,170 Q800,100 880,130 Q920,110 980,150 L980,200 L730,200 Z" fill="#1A1008" opacity="0.6" />
          <path d="M1020,175 Q1080,140 1140,155 Q1170,145 1200,165 L1200,200 L1020,200 Z" fill="#1A1008" opacity="0.6" />

          {/* Connecting light lines */}
          <motion.path
            d="M120,155 Q200,120 380,140"
            stroke="#C6A75E"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.path
            d="M400,140 Q480,110 580,150"
            stroke="#C6A75E"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
          />
          <motion.path
            d="M620,150 Q700,100 840,130"
            stroke="#C6A75E"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            viewport={{ once: true }}
          />
          <motion.path
            d="M880,135 Q960,105 1100,150"
            stroke="#C6A75E"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2 }}
            viewport={{ once: true }}
          />

          {/* Glowing dots at connection points */}
          {[120, 380, 580, 840, 1100].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={[155, 140, 150, 130, 150][i]}
              r="3"
              fill="#C6A75E"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 0.8, 0.4] }}
              transition={{ duration: 2, delay: 0.5 + i * 0.5, repeat: Infinity }}
              viewport={{ once: true }}
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 sm:px-6 max-w-5xl mx-auto w-full text-center py-6 sm:py-0">
        {/* Hero statement */}
        <motion.div
          className="mb-4 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <p
            className="text-[8px] sm:text-sm md:text-base text-[#C6A75E]/40 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Vision Room
          </p>
          <h2
            className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[#F5EBDD]/80 leading-tight mb-2 sm:mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            MAJA is not a token.
          </h2>
          <h2
            className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[#C6A75E] text-glow-gold leading-tight"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            It is the Creative Infrastructure<br className="hidden sm:block" /><span className="sm:hidden"> </span>of Nusantara.
          </h2>
        </motion.div>

        {/* Roadmap — horizontal phases */}
        <motion.div
          className="flex flex-col md:flex-row items-stretch justify-center gap-2 sm:gap-6 md:gap-0 mb-4 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {roadmap.map((phase, i) => (
            <React.Fragment key={phase.phase}>
              <motion.div
                className="flex-1 border border-[#C6A75E]/15 bg-[#1A1008]/30 backdrop-blur-sm p-3 sm:p-6 md:p-8 text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#C6A75E]/40 flex items-center justify-center text-[10px] sm:text-xs text-[#C6A75E] font-semibold" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {i + 1}
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#C6A75E]/40 block" style={{ fontFamily: "var(--font-inter)" }}>
                      {phase.period}
                    </span>
                    <span className="text-sm font-semibold text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>
                      {phase.title}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1 sm:space-y-2">
                  {phase.items.map((item, j) => (
                    <motion.li
                      key={j}
                      className="text-xs text-[#F5EBDD]/45 flex items-start gap-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.2 + j * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-[#C6A75E]/40 mt-0.5">—</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              {/* Connector */}
              {i < roadmap.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-8">
                  <div className="w-full h-[1px] bg-[#C6A75E]/20" />
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#"
            className="w-full sm:w-auto text-center px-4 sm:px-8 py-2 sm:py-3 bg-[#C6A75E] text-[#1A1008] font-semibold tracking-widest text-[10px] sm:text-sm uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,167,94,0.3)]"
            style={{ fontFamily: "var(--font-inter)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Enter Marketplace
          </motion.a>
          <motion.a
            href="/whitepaper.pdf"
            target="_blank"
            rel="noopener"
            className="w-full sm:w-auto text-center px-4 sm:px-8 py-2 sm:py-3 border border-[#C6A75E]/40 text-[#C6A75E] font-semibold tracking-widest text-[10px] sm:text-sm uppercase hover:border-[#C6A75E] transition-all duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Read Whitepaper
          </motion.a>
          <motion.a
            href="#"
            className="w-full sm:w-auto text-center px-4 sm:px-8 py-2 sm:py-3 border border-[#C6A75E]/40 text-[#C6A75E] font-semibold tracking-widest text-[10px] sm:text-sm uppercase hover:border-[#C6A75E] transition-all duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Community
          </motion.a>
        </motion.div>

        {/* Footer signature */}
        <motion.div
          className="mt-4 sm:mt-16 pb-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C6A75E]/30" />
            <span className="text-[#C6A75E]/20 text-xl" style={{ fontFamily: "serif" }}>ꦩꦗ</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C6A75E]/30" />
          </div>
          <p className="text-[10px] text-[#C6A75E]/20 tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
            Creative Economy Infrastructure of Nusantara
          </p>
        </motion.div>
      </div>
    </section>
  );
}
