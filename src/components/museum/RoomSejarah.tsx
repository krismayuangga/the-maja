"use client";

import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { SplitText, BlurText, ShinyText } from "@/components/ui/TextEffects";
import { ParticleField, Reveal } from "@/components/ui/CardEffects";

export default function RoomSejarah() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);

  return (
    <section className="room room-1 flex items-center justify-center grain-overlay room-vignette">
      {/* Warm ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A12] via-[#1A1008] to-[#0D0A06]" />

      {/* Background image support — loads if available */}
      <img
        src="/images/museum/sejarah/relief-texture.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 mix-blend-overlay"
        onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.15"; }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      {/* Relief texture overlay — parallax slow layer */}
      <div
        ref={registerParallax(-8, -8)}
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url('/images/ukiran-maja.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
          transform: "scale(1.05)",
          willChange: "transform",
        }}
      />

      {/* Warm golden ambient light — parallax mid layer */}
      <div className="absolute inset-0 pointer-events-none"
        ref={registerParallax(-15, -15)}
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#C6A75E] opacity-[0.06] blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#C6A75E]/[0.04] to-transparent" />
      </div>

      {/* Gold dust particles — React Bits ParticleField */}
      <div ref={registerParallax(12, 12)} style={{ willChange: "transform" }}
        className="absolute inset-0 pointer-events-none">
        <ParticleField
          count={isMobile ? 18 : 50}
          color="#C6A75E"
          minSize={1}
          maxSize={4}
          speed="slow"
          direction="up"
        />
      </div>

      {/* Ornamental corner frames */}
      <div className="absolute inset-6 sm:inset-12 pointer-events-none z-10">
        {/* Top-left */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C6A75E]/40 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-[#C6A75E]/40 to-transparent" />
          <div className="absolute top-2 left-2 w-2 h-2 rotate-45 border border-[#C6A75E]/20" />
        </div>
        {/* Top-right */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#C6A75E]/40 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#C6A75E]/40 to-transparent" />
          <div className="absolute top-2 right-2 w-2 h-2 rotate-45 border border-[#C6A75E]/20" />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C6A75E]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-[#C6A75E]/40 to-transparent" />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24">
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#C6A75E]/40 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-[#C6A75E]/40 to-transparent" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Surya Majapahit ornament */}
        <motion.div
          className="flex items-center justify-center mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <svg viewBox="0 0 80 80" className="w-12 h-12 sm:w-16 sm:h-16 opacity-50">
            <circle cx="40" cy="40" r="6" fill="#C6A75E" opacity="0.6" />
            <circle cx="40" cy="40" r="12" fill="none" stroke="#C6A75E" strokeWidth="0.5" opacity="0.4" />
            <circle cx="40" cy="40" r="20" fill="none" stroke="#C6A75E" strokeWidth="0.3" opacity="0.2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line key={angle} x1="40" y1="40"
                x2={40 + 28 * Math.cos((angle * Math.PI) / 180)}
                y2={40 + 28 * Math.sin((angle * Math.PI) / 180)}
                stroke="#C6A75E" strokeWidth="0.5" opacity="0.3" />
            ))}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
              <line key={angle} x1={40 + 14 * Math.cos((angle * Math.PI) / 180)} y1={40 + 14 * Math.sin((angle * Math.PI) / 180)}
                x2={40 + 22 * Math.cos((angle * Math.PI) / 180)}
                y2={40 + 22 * Math.sin((angle * Math.PI) / 180)}
                stroke="#C6A75E" strokeWidth="0.3" opacity="0.25" />
            ))}
          </svg>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C6A75E]/60" />
          <div className="w-2 h-2 rotate-45 border border-[#C6A75E]/60" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C6A75E]/60" />
        </motion.div>

        {/* Title — SplitText animation */}
        <div className="mb-4 sm:mb-6">
          <SplitText
            text="MAJA"
            className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold tracking-[0.1em] sm:tracking-[0.15em] text-glow-gold"
            style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }}
            delay={0.5}
            stagger={0.08}
            duration={0.8}
          />
        </div>

        {/* Subtitle — ShinyText */}
        <Reveal direction="left" delay={1} duration={0.6} color="#C6A75E">
          <p
            className="text-xs sm:text-base md:text-xl tracking-[0.2em] sm:tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter)", color: "#F5EBDD", opacity: 0.6 }}
          >
            <ShinyText text="Creative Economy of Nusantara" speed={4} />
          </p>
        </Reveal>

        {/* Divider */}
        <motion.div
          className="w-24 h-[1px] bg-[#C6A75E]/40 mx-auto my-8 sm:my-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        />

        {/* Quote — BlurText */}
        <div className="space-y-3">
          <BlurText
            text="Gajah Mada mempersatukan Nusantara melalui kekuasaan."
            className="text-base md:text-lg text-[#C6A75E]/60 italic leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
            delay={1.8}
            duration={1}
          />
          <BlurText
            text="MAJA mempersatukan Nusantara melalui kreativitas."
            className="text-base md:text-lg text-[#F5EBDD]/80 italic leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
            delay={2.2}
            duration={1}
          />
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 3 }}
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
      <div className="absolute bottom-8 right-6 sm:right-12 text-[25vw] sm:text-[15vw] text-[#C6A75E]/[0.03] select-none pointer-events-none z-0"
        ref={registerParallax(-20, -10)}
        style={{ fontFamily: "serif", willChange: "transform" }}
      >
        ꦩꦗ
      </div>
    </section>
  );
}
