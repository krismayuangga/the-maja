"use client";

import React from "react";
import { motion } from "framer-motion";

const problems = [
  {
    stat: "70%",
    text: "margin hilang ke perantara.",
    detail: "Seniman kehilangan sebagian besar keuntungan untuk komisi galeri & platform.",
  },
  {
    stat: "Trust",
    text: "Seniman takut tidak dibayar.",
    detail: "Pembeli takut karya palsu. Tidak ada jaminan untuk kedua pihak.",
  },
  {
    stat: "Gap",
    text: "NFT & fisik tidak terhubung.",
    detail: "Marketplace NFT tidak menyelesaikan pengiriman barang fisik.",
  },
  {
    stat: "Web3",
    text: "Hambatan teknis terlalu tinggi.",
    detail: "Mayoritas seniman tidak mengerti wallet, gas fee, atau seed phrase.",
  },
];

export default function RoomMasalah() {
  return (
    <section className="room room-2 flex items-center justify-center room-vignette relative">
      {/* Dark desaturated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0F] via-[#111115] to-[#0A0A0C]" />

      {/* Subtle cold light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[#3A3A4A] opacity-[0.05] blur-[120px]" />
      </div>

      {/* Cracked frame decorations — hanya tampil di desktop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {/* Empty frames on the wall */}
        {[
          { x: "8%", y: "15%", w: 140, h: 180, rotate: -3 },
          { x: "82%", y: "20%", w: 120, h: 150, rotate: 2 },
          { x: "5%", y: "65%", w: 100, h: 130, rotate: -1 },
          { x: "88%", y: "70%", w: 110, h: 90, rotate: 4 },
        ].map((frame, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-[#3A3530]/30"
            style={{
              left: frame.x,
              top: frame.y,
              width: frame.w,
              height: frame.h,
              transform: `rotate(${frame.rotate}deg)`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.3 }}
            viewport={{ once: true }}
          >
            {/* Crack line across the frame */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 20,0 L 35,30 L 25,50 L 40,70 L 30,100"
                stroke="#3A3530"
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 + i * 0.2 }}
                viewport={{ once: true }}
              />
            </svg>
            {/* Empty frame interior */}
            <div className="absolute inset-2 bg-[#0D0D0F]/60" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto w-full py-6 sm:py-0">
        {/* Section label */}
        <motion.div
          className="mb-6 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-[#6A6060]/60 block mb-2 sm:mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The Broken Gallery
          </span>
          <h2
            className="text-xl sm:text-3xl md:text-5xl font-semibold text-[#F5EBDD]/30"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Mengapa Ini Harus Berubah
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 md:gap-12">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="border border-[#2A2528]/60 rounded-none p-4 sm:p-8 md:p-10 bg-[#0D0D0F]/40 backdrop-blur-sm transition-all duration-700 group-hover:border-[#C6A75E]/20">
                {/* Stat */}
                <motion.span
                  className="text-2xl sm:text-4xl md:text-5xl font-bold block mb-2 sm:mb-3"
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    color: "#4A3A30",
                  }}
                  whileInView={{
                    color: "#8B6914",
                  }}
                  transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                  viewport={{ once: true }}
                >
                  {problem.stat}
                </motion.span>
                {/* Headline */}
                <p
                  className="text-lg md:text-xl text-[#F5EBDD]/60 mb-2 font-medium"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {problem.text}
                </p>
                {/* Detail */}
                <p
                  className="text-sm text-[#F5EBDD]/30 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {problem.detail}
                </p>
                {/* Corner crack accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#3A3530]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dim spotlight effect from above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[30vh] bg-gradient-to-b from-[#C6A75E]/10 to-transparent pointer-events-none" />
    </section>
  );
}
