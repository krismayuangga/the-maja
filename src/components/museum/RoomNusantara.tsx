"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

interface Region {
  id: string;
  name: string;
  art: string;
  desc: string;
  emoji: string;
}

const regions: Region[] = [
  { id: "sumatera", name: "Sumatera", art: "Ulos & Songket", desc: "Tenun tradisional Batak dan Palembang yang kaya makna filosofis.", emoji: "🧵" },
  { id: "jawa", name: "Jawa", art: "Batik & Wayang", desc: "Warisan UNESCO batik tulis dan seni pertunjukan wayang kulit.", emoji: "🎭" },
  { id: "bali", name: "Bali", art: "Ukiran & Lukisan", desc: "Seni ukir kayu dan lukisan tradisional Ubud yang mendunia.", emoji: "🪵" },
  { id: "kalimantan", name: "Kalimantan", art: "Seni Dayak", desc: "Manik-manik, ukiran, dan motif tradisional suku Dayak.", emoji: "📿" },
  { id: "sulawesi", name: "Sulawesi", art: "Toraja & Tenun", desc: "Seni ukir Toraja dan tenun Bugis-Makassar yang eksotis.", emoji: "🏛️" },
  { id: "papua", name: "Papua", art: "Seni Kayu & Noken", desc: "Ukiran Asmat dan tas Noken, simbol kehidupan Papua.", emoji: "🎋" },
];

export default function RoomNusantara() {
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const isMobile = useIsMobile();

  return (
    <section className="room room-4 flex items-center justify-center room-vignette relative">
      {/* Deep warm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F3B2E]/20 via-[#1A1008] to-[#2C1A12]" />

      {/* Ambient map glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0F3B2E] opacity-[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto w-full py-8 sm:py-0">
        {/* Header */}
        <motion.div
          className="text-center mb-4 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-[#C6A75E]/50 block mb-2 sm:mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Interactive Map
          </span>
          <h2
            className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#C6A75E] text-glow-gold mb-2 sm:mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Nusantara
          </h2>
          <p
            className="text-xs sm:text-base md:text-lg text-[#F5EBDD]/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Jelajahi kekayaan seni dari setiap penjuru kepulauan
          </p>
        </motion.div>

        {/* Interactive Map — SVG (desktop) / simplified (mobile) */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* SVG Map — hanya tampil di desktop, di mobile disembunyikan */}
          <motion.svg
            viewBox="0 0 1000 400"
            className="w-full h-auto hidden sm:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            {/* Sumatera */}
            <motion.path
              d="M120,80 L160,60 L200,80 L220,140 L200,220 L170,260 L130,240 L100,180 L90,120 Z"
              fill={activeRegion?.id === "sumatera" ? "#C6A75E" : "#2C1A12"}
              stroke="#C6A75E"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-500"
              style={{ filter: activeRegion?.id === "sumatera" ? "drop-shadow(0 0 20px rgba(198,167,94,0.5))" : "none" }}
              onMouseEnter={() => setActiveRegion(regions[0])}
              onMouseLeave={() => setActiveRegion(null)}
              whileHover={{ scale: 1.03 }}
            />
            {/* Jawa */}
            <motion.path
              d="M250,260 L320,250 L400,255 L480,260 L500,270 L460,285 L380,290 L300,285 L260,275 Z"
              fill={activeRegion?.id === "jawa" ? "#C6A75E" : "#2C1A12"}
              stroke="#C6A75E"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-500"
              style={{ filter: activeRegion?.id === "jawa" ? "drop-shadow(0 0 20px rgba(198,167,94,0.5))" : "none" }}
              onMouseEnter={() => setActiveRegion(regions[1])}
              onMouseLeave={() => setActiveRegion(null)}
              whileHover={{ scale: 1.03 }}
            />
            {/* Bali + Nusa Tenggara */}
            <motion.path
              d="M520,265 L540,255 L560,260 L600,265 L620,270 L580,280 L550,278 L525,275 Z"
              fill={activeRegion?.id === "bali" ? "#C6A75E" : "#2C1A12"}
              stroke="#C6A75E"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-500"
              style={{ filter: activeRegion?.id === "bali" ? "drop-shadow(0 0 20px rgba(198,167,94,0.5))" : "none" }}
              onMouseEnter={() => setActiveRegion(regions[2])}
              onMouseLeave={() => setActiveRegion(null)}
              whileHover={{ scale: 1.03 }}
            />
            {/* Kalimantan */}
            <motion.path
              d="M280,90 L360,70 L440,80 L470,130 L460,200 L420,240 L350,250 L280,230 L250,180 L260,120 Z"
              fill={activeRegion?.id === "kalimantan" ? "#C6A75E" : "#2C1A12"}
              stroke="#C6A75E"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-500"
              style={{ filter: activeRegion?.id === "kalimantan" ? "drop-shadow(0 0 20px rgba(198,167,94,0.5))" : "none" }}
              onMouseEnter={() => setActiveRegion(regions[3])}
              onMouseLeave={() => setActiveRegion(null)}
              whileHover={{ scale: 1.03 }}
            />
            {/* Sulawesi */}
            <motion.path
              d="M520,100 L560,80 L580,110 L570,160 L590,190 L560,220 L540,200 L520,170 L510,140 Z"
              fill={activeRegion?.id === "sulawesi" ? "#C6A75E" : "#2C1A12"}
              stroke="#C6A75E"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-500"
              style={{ filter: activeRegion?.id === "sulawesi" ? "drop-shadow(0 0 20px rgba(198,167,94,0.5))" : "none" }}
              onMouseEnter={() => setActiveRegion(regions[4])}
              onMouseLeave={() => setActiveRegion(null)}
              whileHover={{ scale: 1.03 }}
            />
            {/* Papua */}
            <motion.path
              d="M740,100 L800,80 L880,90 L920,120 L900,180 L850,220 L790,210 L740,170 L730,130 Z"
              fill={activeRegion?.id === "papua" ? "#C6A75E" : "#2C1A12"}
              stroke="#C6A75E"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-500"
              style={{ filter: activeRegion?.id === "papua" ? "drop-shadow(0 0 20px rgba(198,167,94,0.5))" : "none" }}
              onMouseEnter={() => setActiveRegion(regions[5])}
              onMouseLeave={() => setActiveRegion(null)}
              whileHover={{ scale: 1.03 }}
            />

            {/* Connection lines between islands */}
            {[
              "M170,240 Q220,250 260,260",
              "M460,200 Q470,230 480,255",
              "M500,270 Q510,267 520,265",
              "M440,130 Q480,115 520,110",
              "M580,160 Q660,140 740,120",
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="#C6A75E"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                fill="none"
                opacity={0.2}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                viewport={{ once: true }}
              />
            ))}

            {/* Island labels */}
            {[
              { x: 150, y: 160, label: "Sumatera" },
              { x: 375, y: 275, label: "Jawa" },
              { x: 565, y: 270, label: "Bali" },
              { x: 365, y: 155, label: "Kalimantan" },
              { x: 550, y: 155, label: "Sulawesi" },
              { x: 830, y: 155, label: "Papua" },
            ].map((l, i) => (
              <text
                key={i}
                x={l.x}
                y={l.y}
                fill="#C6A75E"
                fontSize="11"
                textAnchor="middle"
                opacity={0.4}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {l.label}
              </text>
            ))}
          </motion.svg>

          {/* Region popup card */}
          <AnimatePresence>
            {activeRegion && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="bg-[#1A1008]/95 backdrop-blur-md border border-[#C6A75E]/40 px-8 py-6 min-w-[280px] shadow-2xl"
                  style={{ boxShadow: "0 0 60px rgba(198,167,94,0.1)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{activeRegion.emoji}</span>
                    <div>
                      <h3
                        className="text-lg font-semibold text-[#C6A75E]"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        {activeRegion.name}
                      </h3>
                      <span
                        className="text-xs text-[#C6A75E]/60 tracking-widest uppercase"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {activeRegion.art}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-sm text-[#F5EBDD]/60 leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {activeRegion.desc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: Region cards grid (karena hover SVG tidak bekerja di touch) */}
        {isMobile && (
          <div className="grid grid-cols-3 gap-2 mt-4 sm:hidden">
            {regions.map((region, i) => (
              <motion.div
                key={region.id}
                className="border border-[#C6A75E]/20 bg-[#1A1008]/60 backdrop-blur-sm p-2.5 group hover:border-[#C6A75E]/40 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-lg block mb-1">{region.emoji}</span>
                <h3
                  className="text-[10px] font-semibold text-[#C6A75E] mb-0.5"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {region.name}
                </h3>
                <p
                  className="text-[8px] text-[#C6A75E]/50 tracking-wide uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {region.art}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom tagline */}
        <motion.p
          className="text-center mt-4 sm:mt-12 text-[9px] sm:text-sm text-[#C6A75E]/30 tracking-widest"
          style={{ fontFamily: "var(--font-inter)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          Dari Sabang sampai Merauke — satu ekosistem kreatif
        </motion.p>
      </div>
    </section>
  );
}
