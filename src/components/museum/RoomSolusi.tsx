"use client";

import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";

const solutions = [
  {
    icon: "🔐",
    title: "NFT Certificate",
    desc: "Setiap karya fisik memiliki sertifikat digital on-chain sebagai bukti keaslian.",
  },
  {
    icon: "🔍",
    title: "On-chain Provenance",
    desc: "Riwayat kepemilikan tercatat abadi di blockchain. Tidak bisa dipalsukan.",
  },
  {
    icon: "🤝",
    title: "Smart Escrow",
    desc: "Dana aman dalam smart contract sampai barang dikirim & dikonfirmasi.",
  },
  {
    icon: "📦",
    title: "Logistics Trigger",
    desc: "NFT berpindah → pengiriman fisik otomatis terpicu. Selalu sinkron.",
  },
];

export default function RoomSolusi() {
  const isMobile = useIsMobile();
  const parallax = useParallax(!isMobile);

  return (
    <section className="room room-3 flex items-center justify-center room-vignette relative overflow-hidden">
      {/* Bright warm background — total contrast from Room 2 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E150E] via-[#2C1A12] to-[#1A1008]" />

      {/* Warm light burst from center — parallax */}
      <div className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${parallax.x * -15}px, ${parallax.y * -15}px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#C6A75E] opacity-[0.08] blur-[180px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C6A75E] opacity-[0.05] blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto w-full py-6 sm:py-0">
        {/* Section header */}
        <motion.div
          className="text-center mb-4 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-[#C6A75E]/50 block mb-2 sm:mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The Innovation Chamber
          </span>
          <h2
            className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#C6A75E] text-glow-gold mb-2 sm:mb-6"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            MAJA Marketplace
          </h2>
          <p
            className="text-xs sm:text-lg md:text-2xl text-[#F5EBDD]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Hybrid Physical & Digital Commerce
          </p>
        </motion.div>

        {/* Transformation visual: Physical → NFT */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-8 mb-4 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Physical artwork */}
          <motion.div
            className="w-20 h-28 sm:w-28 sm:h-36 md:w-40 md:h-52 border-2 border-[#C6A75E]/30 bg-[#2C1A12] rounded-sm flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl">🎨</span>
            <span
              className="absolute bottom-1 sm:bottom-2 text-[7px] sm:text-[8px] md:text-[10px] text-[#C6A75E]/50 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Physical
            </span>
          </motion.div>

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

          {/* NFT Certificate */}
          <motion.div
            className="w-20 h-28 sm:w-28 sm:h-36 md:w-40 md:h-52 rounded-sm flex items-center justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1A1008 0%, #2C1A12 50%, #0F3B2E 100%)",
              border: "2px solid rgba(198,167,94,0.5)",
              boxShadow: "0 0 40px rgba(198,167,94,0.15), inset 0 0 40px rgba(198,167,94,0.05)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(198,167,94,0.3)" }}
          >
            <motion.span
              className="text-3xl sm:text-4xl md:text-5xl"
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              📜
            </motion.span>
            <span
              className="absolute bottom-1 sm:bottom-2 text-[7px] sm:text-[8px] md:text-[10px] text-[#C6A75E]/70 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              NFT Cert
            </span>
            {/* Holographic shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A75E]/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Plus sign — hidden on very small screens */}
          <motion.span
            className="text-2xl text-[#C6A75E]/40 font-light hidden sm:block"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +
          </motion.span>

          {/* Physical linked — hidden on very small screens */}
          <motion.div
            className="w-20 h-28 sm:w-28 sm:h-36 md:w-40 md:h-52 rounded-sm items-center justify-center relative overflow-hidden hidden sm:flex"
            style={{
              background: "linear-gradient(135deg, #2C1A12 0%, #1E150E 100%)",
              border: "2px solid rgba(198,167,94,0.4)",
              boxShadow: "0 0 30px rgba(198,167,94,0.1)",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-4xl md:text-5xl">🏺</span>
            <span
              className="absolute bottom-2 text-[8px] md:text-[10px] text-[#C6A75E]/60 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Linked
            </span>
          </motion.div>
        </motion.div>

        {/* Solution cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              className="border border-[#C6A75E]/20 bg-[#1A1008]/60 backdrop-blur-sm p-3 sm:p-6 md:p-8 text-center group hover:border-[#C6A75E]/50 transition-all duration-500 hover:bg-[#2C1A12]/60"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="text-2xl md:text-4xl block mb-2 sm:mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                {s.icon}
              </motion.span>
              <h3
                className="text-sm md:text-base font-semibold text-[#C6A75E] mb-2 tracking-wide"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-xs md:text-sm text-[#F5EBDD]/50 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Web2 friendly note */}
        <motion.div
          className="mt-4 sm:mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <p
            className="text-sm text-[#C6A75E]/40 tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Tampilan semudah Tokopedia. Teknologi sekuat blockchain.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
