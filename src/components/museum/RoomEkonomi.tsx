"use client";

import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { SplitText, CountUp } from "@/components/ui/TextEffects";
import { SpotlightCard, ParticleField } from "@/components/ui/CardEffects";

/* ══════════════════════════════════════════════════════════════════════
   TOKENOMICS — 5,248 MAJA
   5,248 km = panjang wilayah Indonesia dari Sabang sampai Merauke
   Setiap token = 1 km Nusantara
   ══════════════════════════════════════════════════════════════════════ */

const TOTAL_SUPPLY = 5248;

const tokenomics = [
  { label: "Liquidity Pool",           pct: 70,   tokens: 3674, color: "#C6A75E" },
  { label: "Community Development",    pct: 10,   tokens: 525,  color: "#8B6914" },
  { label: "Cultural Fund",            pct: 7.5,  tokens: 394,  color: "#0F3B2E" },
  { label: "Marketing & Partnerships", pct: 5,    tokens: 262,  color: "#6B5B3E" },
  { label: "Developer (vesting 2y)",   pct: 5,    tokens: 262,  color: "#4A3A30" },
  { label: "Reserve / Insurance",      pct: 2.5,  tokens: 131,  color: "#3D2B1A" },
];
// VERIFY: 3674 + 525 + 394 + 262 + 262 + 131 = 5248 ✓

const roadmap = [
  {
    title: "Foundation",
    period: "Q1–Q2 2026",
    items: [
      "Token Launch (Solana)",
      "Website & Digital Museum",
      "Community Building",
      "Artist Partnerships",
    ],
    active: true,
  },
  {
    title: "Marketplace",
    period: "Q3–Q4 2026",
    items: [
      "MAJA Marketplace Beta",
      "Physical-Digital NFT",
      "Cultural Partnerships",
      "Artist Onboarding",
    ],
    active: false,
  },
  {
    title: "Expansion",
    period: "Q1–Q2 2027",
    items: [
      "Full Marketplace Launch",
      "Cross-chain Bridge",
      "DAO Governance",
      "International Expansion",
    ],
    active: false,
  },
  {
    title: "Ecosystem",
    period: "H2 2027+",
    items: [
      "DeFi Integration",
      "Metaverse Gallery",
      "Institutional Partners",
      "Heritage Preservation",
    ],
    active: false,
  },
];

export default function RoomEkonomi() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);

  /* ── Donut chart math ── */
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
    const offset = start * circumference;
    return { ...item, length, offset };
  });

  return (
    <section className="room room-5 flex items-center justify-center room-vignette relative">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0A06] via-[#1A1008] to-[#0D0A06]" />
      <ParticleField
        count={isMobile ? 8 : 18}
        color="#C6A75E"
        minSize={1}
        maxSize={2}
        speed="slow"
        direction="up"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        ref={registerParallax(-6, -6)}
        style={{
          backgroundImage: `linear-gradient(rgba(198,167,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(198,167,94,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          willChange: "transform",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        ref={registerParallax(-14, -14)}
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C6A75E] opacity-[0.04] blur-[150px]" />
      </div>

      {/* ═══════════════════ CONTENT ═══════════════════ */}
      <div
        className="relative z-10 ml-12 sm:ml-16 md:ml-20 mr-4 sm:mr-8 md:mr-12 w-auto flex flex-col items-center h-full"
        style={{ justifyContent: "flex-start", paddingTop: isMobile ? "2rem" : "3rem" }}
      >
        {/* ── HEADER (matching Nusantara style) ── */}
        <motion.div
          className="text-center"
          style={{ marginBottom: isMobile ? "0.25rem" : "0.5rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-[#C6A75E]/50 block mb-1 sm:mb-2"
            style={{ fontFamily: "var(--font-philosopher)" }}
          >
            Tokenomics Hall
          </span>
          <div className="mb-1 sm:mb-2">
            <SplitText
              text="MAJA Token"
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-glow-gold"
              style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }}
              delay={0.2}
              stagger={0.05}
            />
          </div>
          <p
            className="text-xs sm:text-base md:text-lg text-[#F5EBDD]/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            5,248 MAJA — Panjang Nusantara, Sabang sampai Merauke
          </p>
        </motion.div>

        {/* ── DONUT CHART (centered, below header) ── */}
        <motion.div
          className="flex flex-col items-center justify-center"
          style={{ marginBottom: isMobile ? "0.75rem" : "1rem" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <svg
              width="320"
              height="320"
              viewBox="0 0 320 320"
              className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[210px] md:h-[210px] lg:w-[230px] lg:h-[230px]"
            >
              {segments.map((seg, i) => (
                <motion.circle
                  key={seg.label}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="34"
                  strokeDasharray={`${seg.length} ${circumference - seg.length}`}
                  strokeDashoffset={-seg.offset}
                  strokeLinecap="butt"
                  transform={`rotate(-90 ${cx} ${cy})`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                  viewport={{ once: true }}
                  style={{ filter: "drop-shadow(0 0 8px rgba(198,167,94,0.15))" }}
                />
              ))}
              <circle cx={cx} cy={cy} r="52" fill="#1A1008" />
              <circle cx={cx} cy={cy} r="50" fill="none" stroke="#C6A75E" strokeWidth="0.5" opacity="0.3" />
            </svg>

            {/* Coin center overlay — sized to fill donut hole (64% of SVG) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] sm:w-[116px] sm:h-[116px] md:w-[135px] md:h-[135px] lg:w-[148px] lg:h-[148px] rounded-full overflow-hidden">
              <video
                src="/images/museum/branding/Maja Token.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-full"
                style={{ background: "#1A1008" }}
              />
            </div>
          </div>

          {/* Total Supply badge */}
          <div className="mt-1 text-center">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>
              <CountUp end={TOTAL_SUPPLY} duration={2} />
            </span>
            <p className="text-[8px] sm:text-[10px] text-[#F5EBDD]/40 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Total Supply — Fixed
            </p>
          </div>

        </motion.div>

        {/* ── TOKENOMICS TABLE (full width, matching panels below) ── */}
        <motion.div
          className="w-full max-w-5xl"
          style={{ marginBottom: isMobile ? "0.75rem" : "1rem" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <SpotlightCard
            className="border border-[#C6A75E]/15 bg-[#1A1008]/40"
            spotlightColor="rgba(198, 167, 94, 0.06)"
          >
            <div className="p-4 sm:p-5 md:p-6">
              <h3 className="text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase text-[#C6A75E]/70 mb-3 sm:mb-4" style={{ fontFamily: "var(--font-cinzel)" }}>
                Token Allocation
              </h3>
              <div className="space-y-2 sm:space-y-2.5">
                {tokenomics.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 sm:gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}44` }}
                    />
                    <span className="text-xs sm:text-sm md:text-base text-[#F5EBDD]/60 flex-1" style={{ fontFamily: "var(--font-inter)" }}>
                      {item.label}
                    </span>
                    {/* Progress bar */}
                    <div className="hidden sm:block w-24 md:w-40 h-1.5 bg-[#2C1A12] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${item.pct}%` }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base font-semibold text-[#C6A75E] w-12 sm:w-14 text-right" style={{ fontFamily: "var(--font-cinzel)" }}>
                      {item.pct}%
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm text-[#F5EBDD]/35 w-12 sm:w-16 text-right" style={{ fontFamily: "var(--font-inter)" }}>
                      {item.tokens.toLocaleString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* ── TWO-COLUMN PANELS: Revenue Engine | Smart Contract ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full max-w-5xl">
          {/* ▌LEFT — Revenue Engine ▌ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <SpotlightCard
              className="border border-[#C6A75E]/15 bg-[#1A1008]/40 h-full"
              spotlightColor="rgba(198, 167, 94, 0.06)"
            >
              <div className="p-5 sm:p-6 md:p-7">
                <h3 className="text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase text-[#C6A75E]/80 mb-4 sm:mb-5" style={{ fontFamily: "var(--font-cinzel)" }}>
                  Revenue Engine
                </h3>

                {/* 5% Marketplace Fee */}
                <div className="mb-5">
                  <p className="text-xs sm:text-sm md:text-base text-[#C6A75E]/60 mb-3 border-b border-[#C6A75E]/15 pb-2" style={{ fontFamily: "var(--font-inter)" }}>
                    5% Marketplace Fee
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {[
                      { pct: "2%", label: "Buyback & Burn" },
                      { pct: "1.5%", label: "Treasury" },
                      { pct: "1%", label: "Cultural Fund" },
                      { pct: "0.5%", label: "Insurance" },
                    ].map((f) => (
                      <div key={f.label} className="flex items-center gap-2.5" style={{ fontFamily: "var(--font-inter)" }}>
                        <span className="text-sm sm:text-base md:text-lg text-[#C6A75E] font-bold">{f.pct}</span>
                        <span className="text-xs sm:text-sm md:text-base text-[#F5EBDD]/55">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2% Transaction Tax */}
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-[#C6A75E]/60 mb-3 border-b border-[#C6A75E]/15 pb-2" style={{ fontFamily: "var(--font-inter)" }}>
                    2% Transaction Tax
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                    {[
                      { pct: "1%", label: "Auto-burn" },
                      { pct: "0.5%", label: "LP Reinforcement" },
                      { pct: "0.5%", label: "Treasury" },
                    ].map((f) => (
                      <div key={f.label} className="flex items-center gap-2.5" style={{ fontFamily: "var(--font-inter)" }}>
                        <span className="text-sm sm:text-base md:text-lg text-[#C6A75E] font-bold">{f.pct}</span>
                        <span className="text-xs sm:text-sm md:text-base text-[#F5EBDD]/55">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated bar */}
                <div className="mt-5 relative h-1.5 bg-[#2C1A12] rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #C6A75E, #0F3B2E, #8B6914, #4A3A30)" }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1.5 }}
                    viewport={{ once: true }}
                  />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-[#C6A75E]/30 mt-2" style={{ fontFamily: "var(--font-inter)" }}>
                  Semakin besar volume marketplace → semakin besar tekanan beli token
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ▌RIGHT — Smart Contract ▌ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3 sm:gap-4"
          >
            <SpotlightCard
              className="border border-[#C6A75E]/15 bg-[#1A1008]/40 flex-1"
              spotlightColor="rgba(198, 167, 94, 0.06)"
            >
              <div className="p-5 sm:p-6 md:p-7">
                <h3 className="text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase text-[#C6A75E]/80 mb-4 sm:mb-5" style={{ fontFamily: "var(--font-cinzel)" }}>
                  Smart Contract
                </h3>
                <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base md:text-lg" style={{ fontFamily: "var(--font-inter)" }}>
                  {[
                    { k: "Network",      v: "BSC (BNB Chain)" },
                    { k: "Standard",     v: "BEP-20" },
                    { k: "Decimals",     v: "18" },
                    { k: "Total Supply", v: "5,248 MAJA" },
                    { k: "Max Supply",   v: "5,248 MAJA" },
                  ].map((row) => (
                    <div key={row.k} className="flex justify-between items-center">
                      <span className="text-[#F5EBDD]/45">{row.k}</span>
                      <span className="text-[#C6A75E] font-semibold">{row.v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center">
                    <span className="text-[#F5EBDD]/45">Mintable</span>
                    <span className="text-red-400/80 font-semibold">No ✕</span>
                  </div>
                  <div className="border-t border-[#C6A75E]/15 pt-3 sm:pt-4 mt-1">
                    <span className="text-[#F5EBDD]/45 block mb-2 text-sm sm:text-base">Contract Address</span>
                    <span className="text-[#C6A75E]/50 font-mono text-xs sm:text-sm md:text-base break-all">
                      TBA — Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Whitepaper CTA */}
            <motion.button
              className="w-full py-3.5 px-5 border border-[#C6A75E]/30 rounded-lg text-[#C6A75E] text-sm sm:text-base tracking-wider uppercase hover:bg-[#C6A75E]/10 hover:border-[#C6A75E]/50 transition-all duration-300 flex items-center justify-center gap-2.5 group"
              style={{ fontFamily: "var(--font-inter)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-[-1px] transition-transform">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1" />
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1" />
              </svg>
              Whitepaper
            </motion.button>
          </motion.div>
        </div>

        {/* ── ROADMAP (full width spanning both panels) ── */}
        <motion.div
          className="w-full max-w-5xl"
          style={{ marginTop: isMobile ? "1.25rem" : "1.75rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-[#C6A75E]/50 text-center mb-4 sm:mb-5"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Roadmap
          </h3>
          <div className="relative flex justify-between items-start">
            {/* Connecting line */}
            <div className="absolute top-[16px] sm:top-[18px] left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-[#C6A75E]/40 via-[#C6A75E]/20 to-[#C6A75E]/10" />

            {roadmap.map((phase, i) => (
              <motion.div
                key={phase.title}
                className="relative flex flex-col items-center text-center w-1/4 px-2 sm:px-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Dot */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border-2 flex items-center justify-center mb-2 ${
                    phase.active
                      ? "border-[#C6A75E] bg-[#C6A75E]/20"
                      : "border-[#C6A75E]/20 bg-[#1A1008]"
                  }`}
                >
                  {phase.active && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C6A75E] animate-pulse" />
                  )}
                </div>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-[#C6A75E] mb-0.5" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {phase.title}
                </span>
                <span className="text-[9px] sm:text-xs md:text-sm text-[#F5EBDD]/35 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {phase.period}
                </span>
                {/* Items */}
                <div className="space-y-0.5 sm:space-y-1 hidden sm:block">
                  {phase.items.map((item) => (
                    <p key={item} className="text-[9px] sm:text-xs md:text-sm text-[#F5EBDD]/30 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
