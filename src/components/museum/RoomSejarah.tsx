"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";

export default function RoomSejarah() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);
  const isMobile = useIsMobile();
  const parallax = useParallax(!isMobile);

  useEffect(() => {
    // Di mobile kurangi partikel biar performa lancar
    const count = isMobile ? 15 : 40;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 5 + 4,
      }))
    );
  }, [isMobile]);

  return (
    <section className="room room-1 flex items-center justify-center grain-overlay room-vignette">
      {/* Warm ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A12] via-[#1A1008] to-[#0D0A06]" />

      {/* Relief texture overlay — parallax slow layer */}
      <div
        className="absolute inset-0 opacity-[0.06] transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('/images/ukiran-maja.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
          transform: `translate(${parallax.x * -8}px, ${parallax.y * -8}px) scale(1.05)`,
        }}
      />

      {/* Warm golden ambient light — parallax mid layer */}
      <div className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${parallax.x * -15}px, ${parallax.y * -15}px)` }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#C6A75E] opacity-[0.06] blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#C6A75E]/[0.04] to-transparent" />
      </div>

      {/* Gold dust particles — parallax fast layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-500 ease-out"
        style={{ transform: `translate(${parallax.x * 12}px, ${parallax.y * 12}px)` }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#C6A75E]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -40, -80],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Small decorative line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C6A75E]/60" />
          <div className="w-2 h-2 rotate-45 border border-[#C6A75E]/60" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C6A75E]/60" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold tracking-[0.1em] sm:tracking-[0.15em] text-glow-gold mb-4 sm:mb-6"
          style={{
            fontFamily: "var(--font-cinzel)",
            color: "#C6A75E",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          MAJA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xs sm:text-base md:text-xl tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-8 sm:mb-12"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#F5EBDD",
            opacity: 0.6,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Creative Economy of Nusantara
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-24 h-[1px] bg-[#C6A75E]/40 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Quote */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          viewport={{ once: true }}
        >
          <p
            className="text-base md:text-lg text-[#C6A75E]/60 italic leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Gajah Mada mempersatukan Nusantara melalui kekuasaan.
          </p>
          <p
            className="text-base md:text-lg text-[#F5EBDD]/80 italic leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            MAJA mempersatukan Nusantara melalui kreativitas.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2 }}
          viewport={{ once: true }}
        >
          <span
            className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isMobile ? "Scroll ke bawah" : "Scroll to explore"}
          </span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-[#C6A75E]/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Aksara Jawa watermark — parallax very slow */}
      <div className="absolute bottom-8 right-6 sm:right-12 text-[25vw] sm:text-[15vw] text-[#C6A75E]/[0.03] select-none pointer-events-none z-0 transition-transform duration-1000 ease-out"
        style={{ fontFamily: "serif", transform: `translate(${parallax.x * -20}px, ${parallax.y * -10}px)` }}
      >
        ꦩꦗ
      </div>
    </section>
  );
}
