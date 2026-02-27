"use client";

import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { FadeIn } from "@/components/ui/TextEffects";
import { TiltCard, Reveal, GlowBorder } from "@/components/ui/CardEffects";

const problems = [
  {
    stat: "70%",
    text: "Margin hilang ke perantara.",
    detail: "Sebagian besar keuntungan seniman hilang untuk komisi galeri dan platform.",
    image: "/images/museum/masalah/broken-painting-1.webp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    stat: "Trust",
    text: "Seniman takut tidak dibayar.",
    detail: "Pembeli takut karya palsu. Tidak ada jaminan transparan bagi kedua pihak.",
    image: "/images/museum/masalah/broken-painting-2.webp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    stat: "Gap",
    text: "NFT & fisik tidak terhubung.",
    detail: "Marketplace NFT belum mampu menjembatani dunia digital dengan fisik.",
    image: "/images/museum/masalah/broken-painting-3.webp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-6.364-6.364L4.5 8.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    stat: "Web3",
    text: "Hambatan teknis terlalu tinggi.",
    detail: "Mayoritas seniman tidak paham wallet, gas fee, ataupun seed phrase.",
    image: "/images/museum/masalah/artist-silhouette.webp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function RoomMasalah() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);

  return (
    <section className="room room-2 flex items-center justify-center room-vignette relative">
      {/* Warm dark background — consistent with other rooms */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A110B] via-[#140E08] to-[#0D0A06]" />

      {/* Relief texture overlay — parallax slow layer */}
      <div
        ref={registerParallax(-8, -8)}
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url('/images/ukiran-maja.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
          transform: "scale(1.05)",
          willChange: "transform",
        }}
      />

      {/* Warm golden ambient light — parallax */}
      <div className="absolute inset-0 pointer-events-none"
        ref={registerParallax(-12, -12)}
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C6A75E] opacity-[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#C6A75E]/[0.02] to-transparent" />
      </div>

      {/* Decorative ornamental corners — parallax + desktop only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block"
        ref={registerParallax(10, 8)}
        style={{ willChange: "transform" }}
      >
        {/* Top-left ornament */}
        <motion.svg
          className="absolute top-6 left-6 w-20 h-20 text-[#C6A75E]/10"
          viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" opacity="0.3" />
          <path d="M8 0 Q8 8 0 8" strokeWidth="1" />
          <path d="M15 0 Q15 15 0 15" strokeWidth="0.5" />
          <motion.path d="M2,30 L5,20 L3,12 L8,5 L30,2" strokeWidth="0.6"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }} viewport={{ once: true }} />
        </motion.svg>

        {/* Top-right ornament */}
        <motion.svg
          className="absolute top-6 right-6 w-20 h-20 text-[#C6A75E]/10"
          viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.8"
          style={{ transform: "scaleX(-1)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" opacity="0.3" />
          <path d="M8 0 Q8 8 0 8" strokeWidth="1" />
          <path d="M15 0 Q15 15 0 15" strokeWidth="0.5" />
          <motion.path d="M2,30 L5,20 L3,12 L8,5 L30,2" strokeWidth="0.6"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }} viewport={{ once: true }} />
        </motion.svg>

        {/* Bottom-left ornament */}
        <motion.svg
          className="absolute bottom-6 left-6 w-20 h-20 text-[#C6A75E]/10"
          viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.8"
          style={{ transform: "scaleY(-1)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" opacity="0.3" />
          <path d="M8 0 Q8 8 0 8" strokeWidth="1" />
          <motion.path d="M2,30 L5,20 L3,12 L8,5 L30,2" strokeWidth="0.6"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.4 }} viewport={{ once: true }} />
        </motion.svg>

        {/* Bottom-right ornament */}
        <motion.svg
          className="absolute bottom-6 right-6 w-20 h-20 text-[#C6A75E]/10"
          viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.8"
          style={{ transform: "scale(-1, -1)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <path d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z" fill="currentColor" opacity="0.3" />
          <path d="M8 0 Q8 8 0 8" strokeWidth="1" />
          <motion.path d="M2,30 L5,20 L3,12 L8,5 L30,2" strokeWidth="0.6"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.6 }} viewport={{ once: true }} />
        </motion.svg>
      </div>

      {/* Main content — centered with nav clearance */}
      <div className="relative z-10 ml-12 sm:ml-16 mr-4 sm:mr-8 md:ml-20 md:mr-12 w-auto flex flex-col items-center justify-center h-full py-8 sm:py-10">
        {/* Section label */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="text-sm sm:text-base md:text-lg tracking-[0.5em] uppercase text-[#C6A75E]/40 block mb-2 sm:mb-3"
            style={{ fontFamily: "var(--font-philosopher)" }}
          >
            The Broken Gallery
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5EBDD]/35"
            style={{ fontFamily: "var(--font-philosopher)", lineHeight: "1.3" }}
          >
            {["Mengapa", " Ini", " Harus", " Berubah"].map((word, i) => (
              <motion.span
                key={i}
                className="inline"
                initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          {/* Decorative divider */}
          <motion.div
            className="mx-auto mt-3 sm:mt-4 h-px w-0 max-w-[200px] bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent"
            whileInView={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Problem cards — compact centered grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-6xl w-full">
          {problems.map((problem, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.15} duration={0.8}>
              <TiltCard maxTilt={isMobile ? 0 : 6} glare={!isMobile} glareOpacity={0.06}>
                <GlowBorder
                  color="#3A3530"
                  blur={12}
                  animated={false}
                  className="h-full"
                >
                  <div className="bg-[#100C08]/90 border border-[#2A2518]/50 h-full flex flex-col overflow-hidden group
                    hover:border-[#C6A75E]/20 transition-colors duration-700">

                    {/* Painting frame area */}
                    <div className="relative w-full bg-[#080604]">
                      {/* Inner ornate "frame" border */}
                      <div className="absolute inset-0 border-[3px] sm:border-4 border-[#2A2118]/50 z-10 pointer-events-none" />
                      <div className="absolute inset-[3px] sm:inset-1 border border-[#3A3225]/25 z-10 pointer-events-none" />

                      {/* Reveal effect wrapping the painting */}
                      <Reveal direction="left" delay={0.3 + i * 0.2} duration={0.6} color="#1A1510">
                        <div className="relative w-full flex items-center justify-center p-3 sm:p-4 aspect-[4/5]">
                          <img
                            src={problem.image}
                            alt={problem.text}
                            className="w-full h-full object-contain opacity-0 transition-opacity duration-700 drop-shadow-lg"
                            style={{ filter: "brightness(0.75) contrast(1.1) sepia(0.1)" }}
                            onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
                            onError={(e) => {
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent) parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[#3A3530]/40 text-sm">No image</div>';
                            }}
                          />
                          {/* Crack overlay on image */}
                          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 133" preserveAspectRatio="none">
                            <motion.path
                              d={`M ${25 + i * 15},0 L ${35 + i * 8},30 L ${22 + i * 12},55 L ${40 + i * 8},85 L ${30 + i * 10},133`}
                              stroke="rgba(60,50,45,0.35)"
                              strokeWidth="0.8"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              transition={{ duration: 2.5, delay: 0.8 + i * 0.3 }}
                              viewport={{ once: true }}
                            />
                          </svg>
                          {/* Bottom shadow gradient */}
                          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#080604] to-transparent z-10" />
                        </div>
                      </Reveal>
                    </div>

                    {/* Text content area */}
                    <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
                      {/* Icon + Stat row */}
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <span className="text-[#C6A75E]/50">{problem.icon}</span>
                        <motion.span
                          className="text-xl sm:text-2xl md:text-3xl font-bold"
                          style={{ fontFamily: "var(--font-philosopher)", color: "#5A4A30" }}
                          whileInView={{ color: "#C6A75E" }}
                          transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                          viewport={{ once: true }}
                        >
                          {problem.stat}
                        </motion.span>
                      </div>

                      {/* Headline */}
                      <p className="text-base sm:text-lg md:text-xl text-[#F5EBDD]/60 mb-1 sm:mb-1.5 font-semibold leading-snug"
                        style={{ fontFamily: "var(--font-philosopher)" }}>
                        {problem.text}
                      </p>

                      {/* Detail */}
                      <p className="text-base sm:text-lg md:text-xl text-[#F5EBDD]/50 leading-relaxed"
                        style={{ fontFamily: "var(--font-cormorant)" }}>
                        {problem.detail}
                      </p>
                    </div>
                  </div>
                </GlowBorder>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Dim spotlight from above — parallax */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[30vh] bg-gradient-to-b from-[#C6A75E]/10 to-transparent pointer-events-none"
        ref={registerParallax(20, 0)}
        style={{ willChange: "transform" }}
      />
    </section>
  );
}
