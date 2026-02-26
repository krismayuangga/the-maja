"use client";

import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";

const tokenomics = [
  { label: "Ecosystem & Rewards", pct: 35, color: "#C6A75E" },
  { label: "Treasury", pct: 20, color: "#8B6914" },
  { label: "Liquidity", pct: 15, color: "#0F3B2E" },
  { label: "Team (vesting 3-5y)", pct: 15, color: "#4A3A30" },
  { label: "Strategic Partners", pct: 10, color: "#6B5B3E" },
  { label: "Cultural Fund", pct: 5, color: "#2C1A12" },
];

const feeFlow = [
  { label: "Buyback MAJA", pct: "2%", icon: "🔄" },
  { label: "Burn", pct: "1%", icon: "🔥" },
  { label: "Treasury", pct: "1%", icon: "🏦" },
  { label: "Insurance Fund", pct: "1%", icon: "🛡️" },
];

export default function RoomEkonomi() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);

  // Build ring segments for the donut
  const total = tokenomics.reduce((a, b) => a + b.pct, 0);
  let cumulative = 0;
  const radius = 120;
  const cx = 160;
  const cy = 160;
  const circumference = 2 * Math.PI * radius;

  const segments = tokenomics.map((item) => {
    const start = cumulative / total;
    cumulative += item.pct;
    const length = (item.pct / total) * circumference;
    const offset = (start * circumference);
    return { ...item, length, offset };
  });

  return (
    <section className="room room-5 flex items-center justify-center room-vignette relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0A06] via-[#1A1008] to-[#0D0A06]" />

      {/* Subtle grid pattern — parallax slow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        ref={registerParallax(-6, -6)}
        style={{
          backgroundImage: `linear-gradient(rgba(198,167,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(198,167,94,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          willChange: "transform",
        }}
      />

      {/* Ambient glow — parallax */}
      <div className="absolute inset-0 pointer-events-none"
        ref={registerParallax(-14, -14)}
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C6A75E] opacity-[0.04] blur-[150px]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto w-full py-6 sm:py-0">
        {/* Header */}
        <motion.div
          className="text-center mb-4 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-[#C6A75E]/50 block mb-2 sm:mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Tokenomics Hall
          </span>
          <h2
            className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#C6A75E] text-glow-gold mb-2 sm:mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            MAJA Token
          </h2>
          <p
            className="text-xs sm:text-base md:text-lg text-[#F5EBDD]/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Utility Token — Scarcity Based Economics — Fixed Supply
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-4 sm:gap-12 md:flex-row md:gap-20">
          {/* Donut Chart — SVG */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <svg width="320" height="320" viewBox="0 0 320 320" className="w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px]">
              {segments.map((seg, i) => (
                <motion.circle
                  key={seg.label}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="28"
                  strokeDasharray={`${seg.length} ${circumference - seg.length}`}
                  strokeDashoffset={-seg.offset}
                  strokeLinecap="butt"
                  transform={`rotate(-90 ${cx} ${cy})`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                  viewport={{ once: true }}
                  className="transition-all duration-300 hover:opacity-80"
                  style={{ filter: "drop-shadow(0 0 8px rgba(198,167,94,0.15))" }}
                />
              ))}
              {/* Center text */}
              <text x={cx} y={cy - 8} textAnchor="middle" fill="#C6A75E" fontSize="18" fontWeight="bold" style={{ fontFamily: "var(--font-cinzel)" }}>
                MAJA
              </text>
              <text x={cx} y={cy + 14} textAnchor="middle" fill="#F5EBDD" fontSize="10" opacity="0.5" style={{ fontFamily: "var(--font-inter)" }}>
                Fixed Supply
              </text>
            </svg>
          </motion.div>

          {/* Legend + details */}
          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-10">
              {tokenomics.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}44` }}
                  />
                  <span className="text-xs sm:text-sm text-[#F5EBDD]/60 flex-1" style={{ fontFamily: "var(--font-inter)" }}>
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {item.pct}%
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Revenue Engine */}
            <motion.div
              className="border border-[#C6A75E]/15 bg-[#1A1008]/40 p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#C6A75E]/70 mb-3 sm:mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                Revenue Engine — 5% Marketplace Fee
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {feeFlow.map((f, i) => (
                  <motion.div
                    key={f.label}
                    className="flex items-center gap-2 text-xs text-[#F5EBDD]/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-lg">{f.icon}</span>
                    <div>
                      <span className="text-[#C6A75E] font-semibold">{f.pct}</span>{" "}
                      <span style={{ fontFamily: "var(--font-inter)" }}>{f.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] text-[#C6A75E]/30 mt-4 tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
                Semakin besar volume marketplace → semakin besar tekanan beli token.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
