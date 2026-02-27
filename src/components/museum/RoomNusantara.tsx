"use client";

import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { BlurText, FadeIn } from "@/components/ui/TextEffects";
import { ParticleField } from "@/components/ui/CardEffects";
import type { CircularGalleryItem } from "@/components/ui/CircularGallery";

/* Dynamic import — OGL uses WebGL, no SSR */
const CircularGallery = dynamic(
  () => import("@/components/ui/CircularGallery"),
  { ssr: false }
);

/* Gallery items — 6 seni daerah Nusantara */
const galleryItems: CircularGalleryItem[] = [
  {
    image: "/images/museum/nusantara/ulos-sumatera.webp",
    text: "Ulos — Sumatera",
    description: "Tenun tradisional Batak dari Sumatera Utara. Ulos memiliki makna filosofis mendalam — digunakan dalam upacara adat sebagai simbol kasih sayang, perlindungan, dan ikatan keluarga.",
  },
  {
    image: "/images/museum/nusantara/batik-jawa.webp",
    text: "Batik — Jawa",
    description: "Warisan budaya UNESCO sejak 2009. Batik tulis Jawa menggunakan teknik canting dan malam dengan motif parang, kawung, dan mega mendung yang sarat makna filosofis Jawa.",
  },
  {
    image: "/images/museum/nusantara/ukiran-bali.webp",
    text: "Ukiran — Bali",
    description: "Seni ukir kayu Bali menampilkan keindahan mitologi Hindu-Jawa. Setiap ukiran dibuat dengan detail luar biasa oleh para seniman Ubud yang telah mendunia.",
  },
  {
    image: "/images/museum/nusantara/seni-dayak.webp",
    text: "Seni Dayak — Kalimantan",
    description: "Seni rupa suku Dayak dari Kalimantan — manik-manik, ukiran kayu, dan perisai bermotif curvilinear. Setiap motif menceritakan kisah spiritual dan identitas suku.",
  },
  {
    image: "/images/museum/nusantara/toraja-sulawesi.webp",
    text: "Toraja — Sulawesi",
    description: "Pa'ssura adalah seni ukir geometris khas Toraja. Motif tanduk kerbau dan matahari diukir pada tongkonan dan menjadi simbol status sosial masyarakat Toraja.",
  },
  {
    image: "/images/museum/nusantara/noken-papua.webp",
    text: "Noken — Papua",
    description: "Tas anyaman tradisional Papua yang diakui UNESCO sebagai warisan budaya tak benda. Noken dianyam dari serat kulit kayu dan melambangkan kehidupan serta kesuburan.",
  },
];

export default function RoomNusantara() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);
  const [selectedItem, setSelectedItem] = useState<CircularGalleryItem | null>(null);

  const handleItemClick = useCallback((item: CircularGalleryItem) => {
    setSelectedItem(item);
  }, []);

  return (
    <section className="room room-4 flex items-center justify-center room-vignette relative">
      {/* Deep warm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F3B2E]/20 via-[#1A1008] to-[#2C1A12]" />

      {/* Ambient particles */}
      <ParticleField count={isMobile ? 10 : 20} color="#0F3B2E" minSize={1} maxSize={3} speed="slow" direction="random" />

      {/* Ambient glow — parallax */}
      <div
        className="absolute inset-0 pointer-events-none"
        ref={registerParallax(-12, -12)}
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0F3B2E] opacity-[0.06] blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 ml-12 sm:ml-16 md:ml-20 mr-4 sm:mr-8 md:mr-12 w-auto flex flex-col items-center h-full" style={{ justifyContent: "flex-start", paddingTop: isMobile ? "2rem" : "3rem" }}>
        {/* ── Header ── */}
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
            Galeri Seni Nusantara
          </span>
          <BlurText
            text="Nusantara"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#C6A75E] text-glow-gold mb-1 sm:mb-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
            delay={0.2}
          />
          <p
            className="text-xs sm:text-base md:text-lg text-[#F5EBDD]/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Jelajahi kekayaan seni dari setiap penjuru kepulauan
          </p>
        </motion.div>

        {/* ── Indonesia Map PNG (decorative, no parallax) ── */}
        <FadeIn direction="up" delay={0.3} duration={0.8}>
          <div
            className="relative w-full flex justify-center"
            style={{ marginBottom: isMobile ? "0.25rem" : "0.5rem" }}
          >
            <div className="relative">
              <img
                src="/images/museum/nusantara/indonesia-map.png"
                alt="Peta Indonesia"
                className="w-[340px] sm:w-[500px] md:w-[680px] lg:w-[850px] h-auto opacity-30 select-none pointer-events-none"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(198,167,94,0.15))",
                }}
                draggable={false}
              />
              {/* Gold glow behind map */}
              <div className="absolute inset-0 bg-[#C6A75E] opacity-[0.04] blur-[60px] rounded-full" />
            </div>
          </div>
        </FadeIn>

        {/* ── Circular Gallery ── */}
        <FadeIn direction="up" delay={0.5} duration={0.8}>
          <div
            className="w-[85vw] sm:w-[75vw] md:w-[70vw] lg:w-[65vw]"
            style={{
              height: isMobile ? "220px" : "360px",
              position: "relative",
            }}
          >
            <CircularGallery
              items={galleryItems}
              bend={isMobile ? 1.5 : 3}
              textColor="#C6A75E"
              borderRadius={0.05}
              font={`bold ${isMobile ? "16" : "24"}px Philosopher`}
              scrollSpeed={isMobile ? 1.5 : 2}
              scrollEase={0.03}
              autoRotateSpeed={1}
              onItemClick={handleItemClick}
            />
          </div>
        </FadeIn>

        {/* ── Bottom tagline ── */}
        <motion.p
          className="text-center text-[9px] sm:text-sm text-[#C6A75E]/30 tracking-widest"
          style={{
            fontFamily: "var(--font-inter)",
            marginTop: isMobile ? "0.25rem" : "0.5rem",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          Dari Sabang sampai Merauke — satu ekosistem kreatif
        </motion.p>
      </div>

      {/* ── Detail Popup Overlay (portaled to body for correct centering) ── */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            {/* Card */}
            <motion.div
              className="relative z-10 w-[90vw] max-w-lg overflow-hidden"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                background: "linear-gradient(135deg, #1A1008 0%, #2C1A12 100%)",
                border: "1px solid rgba(198,167,94,0.3)",
                boxShadow: "0 0 80px rgba(198,167,94,0.15), 0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#0D0A06]/80 border border-[#C6A75E]/30 text-[#C6A75E]/70 hover:text-[#C6A75E] hover:border-[#C6A75E]/60 transition-all duration-300 cursor-pointer"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-[#2C1A12]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.text}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008] via-transparent to-transparent" />
              </div>

              {/* Text content */}
              <div className="px-6 py-5 sm:px-8 sm:py-6">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-[#C6A75E] mb-3"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {selectedItem.text}
                </h3>
                <p
                  className="text-sm sm:text-base md:text-lg text-[#F5EBDD]/60 leading-relaxed"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {selectedItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
