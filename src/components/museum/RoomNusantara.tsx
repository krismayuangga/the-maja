"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { BlurText, FadeIn } from "@/components/ui/TextEffects";
import { ParticleField } from "@/components/ui/CardEffects";

/* Dynamic import — DomeGallery uses DOM APIs, no SSR */
const DomeGallery = dynamic(
  () => import("@/components/ui/DomeGallery"),
  { ssr: false }
);

interface GalleryItem {
  image: string;        // gambar tile (kecil)
  full?: string;        // gambar popup (lebih besar)
  text: string;
  description: string;
  meta?: string;        // toko · provinsi
  price?: number;
  sold?: boolean;
  href?: string;        // tautan ke produk di MajaCraft
}

const MAJACRAFT = "https://majacraft.id";
const optimized = (url: string, w: number) => `${MAJACRAFT}/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=75`;
const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");
const shortText = (t: string, max = 220) => {
  // deskripsi produk bisa berisi HTML dari editor — buang tag & entitas umum
  const clean = t
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, clean.lastIndexOf(" ", max)) + "…" : clean;
};

type ApiProduct = {
  name: string; slug: string; description: string | null; price: number; stock: number; isSoldOffline: boolean;
  images: { url: string }[]; store: { name: string; province: string | null } | null;
};

/** Produk asli dari MajaCraft untuk galeri */
async function fetchProducts(): Promise<GalleryItem[]> {
  const res = await fetch(`${MAJACRAFT}/api/products?limit=50`);
  const json = await res.json();
  const items: ApiProduct[] = json?.data?.items ?? [];
  return items
    .filter((p) => p.images?.[0]?.url && !/\btest\b/i.test(p.name))
    .map((p) => ({
      image: optimized(p.images[0].url, 256),
      full: optimized(p.images[0].url, 640),
      text: p.name,
      description: shortText(p.description ?? ""),
      meta: [p.store?.name, p.store?.province].filter(Boolean).join(" · "),
      price: p.price,
      sold: p.isSoldOffline || p.stock === 0,
      href: `${MAJACRAFT}/produk/${p.slug}`,
    }));
}

/* Cadangan bila MajaCraft tidak dapat diakses — 6 seni daerah Nusantara */

const galleryItems: GalleryItem[] = [
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
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetchProducts()
      .then((list) => { if (alive) setItems(list.length >= 6 ? list : galleryItems); })
      .catch(() => { if (alive) setItems(galleryItems); });
    return () => { alive = false; };
  }, []);

  /* DomeGallery images array (src + alt) — dimemo agar bola tidak dibangun ulang */
  const domeImages = useMemo(() => (items ?? []).map((g) => ({ src: g.image, alt: g.text })), [items]);

  /* When a dome tile is clicked, find the matching gallery item by src */
  const handleDomeClick = useCallback((src: string) => {
    const found = items?.find((g) => g.image === src);
    if (found) setSelectedItem(found);
  }, [items]);

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
      <div className="relative z-10 ml-12 sm:ml-16 md:ml-20 mr-4 sm:mr-8 md:mr-12 w-auto flex flex-col items-center h-full" style={{ justifyContent: "flex-start", paddingTop: isMobile ? "5rem" : "4rem" }}>
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
            style={{ marginBottom: isMobile ? "0.5rem" : "0.25rem" }}
          >
            <div className="relative">
              <img
                src="/images/museum/nusantara/indonesia-map.png"
                alt="Peta Indonesia"
                className="w-[420px] sm:w-[500px] md:w-[680px] lg:w-[850px] h-auto opacity-30 select-none pointer-events-none"
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

        {/* ── Tagline below map ── */}
        <motion.p
          className="text-center text-sm sm:text-lg md:text-xl text-[#C6A75E]/40 tracking-widest"
          style={{
            fontFamily: "var(--font-philosopher)",
            marginBottom: isMobile ? "0.5rem" : "0.75rem",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          Dari Sabang sampai Merauke
        </motion.p>

        {/* ── Dome Gallery ── */}
        <FadeIn direction="up" delay={0.5} duration={0.8}>
          <div
            className="w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[70vw]"
            style={{
              height: isMobile ? "340px" : "440px",
              position: "relative",
              marginTop: isMobile ? "1rem" : "1.5rem",
            }}
          >
            {items && <DomeGallery
              images={domeImages}
              fit={isMobile ? 0.5 : 0.55}
              segments={isMobile ? 20 : 35}
              minRadius={isMobile ? 250 : 450}
              dragDampening={2}
              grayscale={false}
              overlayBlurColor="transparent"
              imageBorderRadius="8px"
              autoRotateSpeed={3}
              onItemClick={handleDomeClick}
            />}
          </div>
        </FadeIn>
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
              className="relative z-10 w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto"
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
              <div className="relative w-full h-56 sm:h-64 md:h-72 bg-[#0D0A06]">
                <img
                  src={selectedItem.full ?? selectedItem.image}
                  alt={selectedItem.text}
                  className={`w-full h-full ${selectedItem.href ? "object-contain" : "object-cover"}`}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1A1008] to-transparent" />
                {selectedItem.sold && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase bg-[#0D0A06]/80 border border-[#C6A75E]/40 text-[#C6A75E]" style={{ fontFamily: "var(--font-inter)" }}>Terjual</span>
                )}
              </div>

              {/* Text content */}
              <div className="px-6 py-5 sm:px-8 sm:py-6">
                {selectedItem.meta && (
                  <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C6A75E]/50 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                    {selectedItem.meta}
                  </p>
                )}
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-[#C6A75E] mb-2 capitalize"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {selectedItem.text}
                </h3>
                {selectedItem.price != null && (
                  <p className="text-base sm:text-lg text-[#F5EBDD]/90 mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                    {rupiah(selectedItem.price)}
                  </p>
                )}
                {selectedItem.description && (
                  <p
                    className="text-sm sm:text-base md:text-lg text-[#F5EBDD]/60 leading-relaxed line-clamp-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {selectedItem.description}
                  </p>
                )}
                {selectedItem.href && (
                  <a
                    href={selectedItem.href}
                    target="_blank"
                    rel="noopener"
                    className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-[#C6A75E]/60 bg-[#C6A75E]/10 text-[#C6A75E] text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#C6A75E]/20 transition-colors"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {selectedItem.sold ? "Lihat Karya di MajaCraft" : "Lihat Produk di MajaCraft"} →
                  </a>
                )}
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
