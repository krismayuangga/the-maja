"use client";

import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { SplitText, GradientText, FadeIn } from "@/components/ui/TextEffects";
import { SpotlightCard, Holographic, TiltCard, ParticleField } from "@/components/ui/CardEffects";

const solutions = [
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 md:w-10 md:h-10">
        <rect x="6" y="4" width="20" height="24" rx="2" fill="none" stroke="#C6A75E" strokeWidth="1.2" />
        <path d="M10 10 L22 10 M10 14 L18 14 M10 18 L20 18" stroke="#C6A75E" strokeWidth="0.8" opacity="0.5" />
        <circle cx="16" cy="24" r="2" fill="#C6A75E" opacity="0.6" />
        <path d="M13 6 L16 2 L19 6" stroke="#C6A75E" strokeWidth="0.8" fill="none" />
      </svg>
    ),
    title: "NFT Certificate",
    desc: "Setiap karya fisik memiliki sertifikat digital on-chain sebagai bukti keaslian.",
    image: "/images/museum/solusi/nft-hologram.webp",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 md:w-10 md:h-10">
        <circle cx="16" cy="16" r="10" fill="none" stroke="#C6A75E" strokeWidth="1.2" />
        <path d="M16 6 Q20 12 16 16 Q12 20 16 26" stroke="#C6A75E" strokeWidth="0.8" fill="none" />
        <circle cx="16" cy="16" r="3" fill="#C6A75E" opacity="0.4" />
        <path d="M8 10 L24 10 M6 16 L26 16 M8 22 L24 22" stroke="#C6A75E" strokeWidth="0.4" opacity="0.3" />
      </svg>
    ),
    title: "On-chain Provenance",
    desc: "Riwayat kepemilikan tercatat abadi di blockchain. Tidak bisa dipalsukan.",
    image: "/images/museum/solusi/physical-art.webp",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M8 14 Q8 8 14 8 L16 8 M18 8 L24 8 Q24 14 24 14" stroke="#C6A75E" strokeWidth="1.2" fill="none" />
        <path d="M8 18 Q8 24 14 24 L18 24 Q24 24 24 18" stroke="#C6A75E" strokeWidth="1.2" fill="none" />
        <rect x="12" y="12" width="8" height="8" rx="1" fill="#C6A75E" opacity="0.2" stroke="#C6A75E" strokeWidth="0.8" />
        <path d="M14 16 L16 18 L20 14" stroke="#C6A75E" strokeWidth="1" fill="none" />
      </svg>
    ),
    title: "Smart Escrow",
    desc: "Dana aman dalam smart contract sampai barang dikirim & dikonfirmasi.",
    image: "/images/museum/solusi/art-nft-linked.webp",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 md:w-10 md:h-10">
        <rect x="4" y="12" width="10" height="14" rx="1" fill="none" stroke="#C6A75E" strokeWidth="1" />
        <rect x="18" y="8" width="10" height="14" rx="1" fill="none" stroke="#C6A75E" strokeWidth="1" />
        <path d="M14 18 L18 14" stroke="#C6A75E" strokeWidth="1" strokeDasharray="2 1" />
        <circle cx="9" cy="16" r="2" fill="#C6A75E" opacity="0.4" />
        <path d="M20 12 L26 12 M20 15 L24 15" stroke="#C6A75E" strokeWidth="0.6" opacity="0.5" />
        <path d="M7 26 L11 26" stroke="#C6A75E" strokeWidth="0.8" />
      </svg>
    ),
    title: "Logistics Trigger",
    desc: "NFT berpindah → pengiriman fisik otomatis terpicu. Selalu sinkron.",
    image: "/images/museum/solusi/physical-art.webp",
  },
];

export default function RoomSolusi() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);

  return (
    <section className="room room-3 flex items-center justify-center room-vignette relative overflow-hidden">
      {/* Bright warm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E150E] via-[#2C1A12] to-[#1A1008]" />

      {/* Warm light burst from center — parallax */}
      <div className="absolute inset-0 pointer-events-none"
        ref={registerParallax(-15, -15)}
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#C6A75E] opacity-[0.08] blur-[180px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C6A75E] opacity-[0.05] blur-[100px]" />
      </div>

      {/* Floating gold particles */}
      <ParticleField count={isMobile ? 12 : 25} color="#C6A75E" minSize={1} maxSize={3} speed="slow" direction="up" />

      {/* Main content */}
      <div className="relative z-10 ml-12 sm:ml-16 mr-4 sm:mr-8 md:ml-20 md:mr-12 w-auto flex flex-col items-center justify-center h-full" style={{ padding: "2rem 0" }}>
        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: "3rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="text-sm sm:text-base md:text-lg tracking-[0.5em] uppercase text-[#C6A75E]/40 block mb-2 sm:mb-3"
            style={{ fontFamily: "var(--font-philosopher)" }}
          >
            The Innovation Chamber
          </span>
          <div className="mb-2 sm:mb-4">
            <SplitText
              text="MAJA Marketplace"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-glow-gold"
              style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }}
              delay={0.3}
              stagger={0.04}
            />
          </div>
          <p
            className="text-base sm:text-xl md:text-2xl text-[#F5EBDD]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            <GradientText text="Hybrid Physical & Digital Commerce" from="#C6A75E" via="#F5EBDD" to="#D4B978" animate speed={5} />
          </p>
        </motion.div>

        {/* Transformation visual: Physical → NFT */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-8"
          style={{ marginBottom: "3rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Physical artwork */}
          <TiltCard maxTilt={isMobile ? 0 : 12} glare={!isMobile}>
            <motion.div
              className="w-32 h-44 sm:w-44 sm:h-60 md:w-60 md:h-[20rem] border-2 border-[#C6A75E]/30 bg-[#2C1A12] rounded-sm flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* Physical art image */}
              <img src="/images/museum/solusi/physical-art.webp" alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
                onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.7"; }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {/* Fallback icon */}
              <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-14 sm:h-14 opacity-40">
                <rect x="8" y="6" width="32" height="36" rx="2" fill="none" stroke="#C6A75E" strokeWidth="1.5" />
                <path d="M12 32 L20 22 L26 28 L32 18 L36 24" stroke="#C6A75E" strokeWidth="1" fill="none" />
                <circle cx="18" cy="16" r="3" fill="#C6A75E" opacity="0.3" />
              </svg>
              <span
                className="absolute bottom-1 sm:bottom-2 text-[7px] sm:text-[8px] md:text-[10px] text-[#C6A75E]/50 tracking-widest uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Physical
              </span>
            </motion.div>
          </TiltCard>

          {/* Arrow / bridge */}
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="40" height="24" viewBox="0 0 60 24" fill="none" className="sm:w-[60px]">
              <motion.path
                d="M0 12 L50 12 M42 4 L52 12 L42 20"
                stroke="#C6A75E"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </svg>
            <span className="text-[8px] text-[#C6A75E]/40 tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>MINT</span>
          </motion.div>

          {/* NFT Certificate — Holographic */}
          <Holographic intensity={0.15}>
            <TiltCard maxTilt={isMobile ? 0 : 12} glare={!isMobile} glareOpacity={0.2}>
              <motion.div
                className="w-32 h-44 sm:w-44 sm:h-60 md:w-60 md:h-[20rem] rounded-sm flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1A1008 0%, #2C1A12 50%, #0F3B2E 100%)",
                  border: "2px solid rgba(198,167,94,0.5)",
                  boxShadow: "0 0 40px rgba(198,167,94,0.15), inset 0 0 40px rgba(198,167,94,0.05)",
                }}
                whileHover={{ boxShadow: "0 0 60px rgba(198,167,94,0.3)" }}
              >
                <img src="/images/museum/solusi/nft-hologram.webp" alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
                  onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.8"; }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {/* Fallback icon */}
                <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-14 sm:h-14 opacity-50">
                  <rect x="8" y="4" width="32" height="40" rx="3" fill="none" stroke="#C6A75E" strokeWidth="1.5" />
                  <path d="M14 14 L34 14 M14 20 L28 20 M14 26 L32 26" stroke="#C6A75E" strokeWidth="0.8" opacity="0.4" />
                  <circle cx="24" cy="36" r="4" fill="none" stroke="#C6A75E" strokeWidth="1" />
                  <path d="M22 36 L24 38 L28 34" stroke="#C6A75E" strokeWidth="0.8" fill="none" />
                </svg>
                <span
                  className="absolute bottom-1 sm:bottom-2 text-[7px] sm:text-[8px] md:text-[10px] text-[#C6A75E]/70 tracking-widest uppercase z-10"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  NFT Cert
                </span>
              </motion.div>
            </TiltCard>
          </Holographic>

          {/* Plus sign */}
          <motion.span
            className="text-2xl text-[#C6A75E]/40 font-light hidden sm:block"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +
          </motion.span>

          {/* Physical linked */}
          <TiltCard maxTilt={isMobile ? 0 : 10} glare={!isMobile} className="hidden sm:block">
            <motion.div
              className="w-32 h-44 sm:w-44 sm:h-60 md:w-60 md:h-[20rem] rounded-sm flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2C1A12 0%, #1E150E 100%)",
                border: "2px solid rgba(198,167,94,0.4)",
                boxShadow: "0 0 30px rgba(198,167,94,0.1)",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img src="/images/museum/solusi/art-nft-linked.webp" alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
                onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.7"; }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-14 sm:h-14 opacity-40">
                <rect x="4" y="10" width="18" height="22" rx="1" fill="none" stroke="#C6A75E" strokeWidth="1" />
                <rect x="26" y="6" width="18" height="22" rx="1" fill="none" stroke="#C6A75E" strokeWidth="1" />
                <path d="M22 20 L26 16" stroke="#C6A75E" strokeWidth="1" strokeDasharray="2 1" />
                <circle cx="13" cy="20" r="3" fill="#C6A75E" opacity="0.3" />
              </svg>
              <span
                className="absolute bottom-2 text-[8px] md:text-[10px] text-[#C6A75E]/60 tracking-widest uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Linked
              </span>
            </motion.div>
          </TiltCard>
        </motion.div>

        {/* Solution cards — with SpotlightCard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-6xl w-full">
          {solutions.map((s, i) => (
            <FadeIn key={s.title} direction="up" delay={0.5 + i * 0.15} duration={0.6}>
              <SpotlightCard
                className="border border-[#C6A75E]/20 bg-[#1A1008]/60 backdrop-blur-sm hover:border-[#C6A75E]/50 transition-all duration-500 hover:bg-[#2C1A12]/60 h-full"
                spotlightColor="rgba(198, 167, 94, 0.1)"
              >
                <div className="p-4 sm:p-5 md:p-6 text-center">
                  {/* Image if available, fallback to SVG icon */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4">
                    <img src={s.image} alt=""
                      className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-500 rounded"
                      onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; (e.target as HTMLImageElement).nextElementSibling?.classList.add("hidden"); }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="flex items-center justify-center w-full h-full">
                      {s.icon}
                    </div>
                  </div>
                  <h3
                    className="text-base sm:text-lg md:text-xl font-semibold text-[#C6A75E] mb-1 sm:mb-2 tracking-wide"
                    style={{ fontFamily: "var(--font-philosopher)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-base sm:text-lg md:text-xl text-[#F5EBDD]/50 leading-relaxed"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
