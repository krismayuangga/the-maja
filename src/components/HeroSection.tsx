"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  // Parallax efek siluet candi
  const { scrollY } = useScroll();
  const yCandi = useTransform(scrollY, [0, 400], [0, 80]);
  const opacityAksara = useTransform(scrollY, [0, 400], [0.1, 0.03]);

  // State untuk partikel, diisi setelah komponen mount (client only)
  const [particles, setParticles] = useState<{
    width: number;
    height: number;
    left: number;
    top: number;
    delay: number;
  }[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, () => ({
        width: Math.random() * 40 + 20,
        height: Math.random() * 40 + 20,
        left: Math.random() * 100,
        top: Math.random() * 80,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section
      className="relative text-[#f3e9d2] overflow-hidden bg-transparent"
    >
      {/* Layer gradasi lembut dan glowing */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B34A1F99] via-[#E67E3E66] to-[#FFD27F33] opacity-80 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#4A1A0A44] via-transparent to-[#F9A65A33] opacity-60 blur-3xl" />
      </div>
      {/* Video Banner */}
      <div className="relative w-full aspect-[21/9] mx-auto z-0">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/images/maja-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/banner-1.png"
          preload="none"
        />
        {/* Caption & CTA Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="w-full max-w-2xl mx-auto mb-8 pointer-events-auto">
            {/* Slider caption tetap, hanya slide pertama yang tampil */}
            <div className="bg-black/40 rounded-xl py-6 px-4 md:px-12 flex flex-col items-center animate-fade-in">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg font-[var(--font-bhutuka)] text-[#ffd700]">
                Kemegahan Warisan Majapahit
              </h1>
              <p className="text-lg md:text-2xl text-[#f3e9d2] font-semibold">
                Candi, budaya, dan teknologi bersatu dalam ekosistem $MAJA.
              </p>
            </div>
          </div>
          {/* Tombol CTA */}
          <div className="relative z-10 flex gap-4 justify-center mb-8 md:mb-12 pointer-events-auto">
            <motion.a
              href="/whitepaper.pdf"
              target="_blank"
              rel="noopener"
              className="px-6 py-3 rounded-lg bg-[#b08d57] text-white font-bold shadow-lg hover:bg-[#a67c52] transition glow-cta font-[var(--font-inter)]"
              whileHover={{ scale: 1.08, boxShadow: "0 0 16px #ffd700" }}
              whileTap={{ scale: 0.97 }}
            >
              Baca Whitepaper
            </motion.a>
            <motion.a
              href="#community"
              className="px-6 py-3 rounded-lg border-2 border-[#b08d57] text-[#b08d57] font-bold bg-transparent hover:bg-[#b08d57] hover:text-white transition font-[var(--font-inter)]"
              whileHover={{ scale: 1.08, boxShadow: "0 0 16px #b08d57" }}
              whileTap={{ scale: 0.97 }}
            >
              Gabung Komunitas
            </motion.a>
          </div>
        </div>
      </div>
      {/* Background Siluet Candi & Partikel */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* SVG Siluet Candi Tikus/Wringin Lawang */}
        <motion.svg
          style={{ y: yCandi }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-30"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#b08d57"
            fillOpacity="0.5"
            d="M0,288L80,272C160,256,320,224,480,197.3C640,171,800,149,960,154.7C1120,160,1280,192,1360,208L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </motion.svg>
        {/* Efek partikel bercahaya */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-yellow-400 opacity-20 blur-xl animate-pulse"
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: `${p.delay}s`,
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
            />
          ))}
        </div>
        {/* Aksara Jawa transparan */}
        <motion.span
          style={{ opacity: opacityAksara }}
          className="absolute text-[16vw] font-serif text-[#b08d57] select-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 javanese-watermark"
        >
          ꦩꦗ
        </motion.span>
      </motion.div>
    </section>
  );
}
