"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { BlurText, FadeIn } from "@/components/ui/TextEffects";
import { ParticleField } from "@/components/ui/CardEffects";
import { provinceKey, provinceInfo } from "@/components/museum/nusantaraGeo";

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
  prov?: string | null; // kunci provinsi baku (filter peta)
  cat?: string;         // nama kategori (filter chip)
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
  category: { name: string } | null;
};

type Sebaran = { provinsi: string; seniman: number; karya: number };
type Stats = { karya: number; pengrajin: number; provinsi: number; sebaran?: Sebaran[] };

/** Produk asli dari MajaCraft untuk galeri */
async function fetchProducts(): Promise<GalleryItem[]> {
  // API membatasi 50 per halaman → ambil semua halaman agar galeri tidak berulang
  const page = (n: number) => fetch(`${MAJACRAFT}/api/products?limit=50&page=${n}`).then((r) => r.json());
  const first = await page(1);
  const total: number = first?.data?.total ?? 0;
  const pages = Math.min(6, Math.ceil(total / 50));
  const rest = await Promise.all(Array.from({ length: Math.max(0, pages - 1) }, (_, i) => page(i + 2).catch(() => null)));
  const items: ApiProduct[] = [first, ...rest].flatMap((j) => j?.data?.items ?? []);
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
      prov: provinceKey(p.store?.province),
      cat: p.category?.name ?? "Lainnya",
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

/** Peta Indonesia dengan titik provinsi yang benar-benar punya seniman (data live) */
function LiveMap({ sebaran, active, onSelect }: {
  sebaran: Sebaran[]; active: string | null; onSelect: (k: string | null) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(1, ...sebaran.map((s) => s.seniman));
  const shown = hover ?? active;
  const tip = shown ? sebaran.find((s) => s.provinsi === shown) : null;
  const tipInfo = tip ? provinceInfo(tip.provinsi) : null;

  return (
    <div className="relative w-full max-w-[22rem] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[620px] mx-auto select-none">
      <img
        src="/images/museum/nusantara/indonesia-map.png"
        alt="Peta sebaran seniman MAJA di Indonesia"
        className="w-full h-auto opacity-[0.28] pointer-events-none"
        style={{ filter: "drop-shadow(0 0 40px rgba(198,167,94,0.15))" }}
        draggable={false}
      />
      {sebaran.map((s) => {
        const info = provinceInfo(s.provinsi);
        if (!info) return null;
        const size = 8 + Math.sqrt(s.seniman / max) * 22; // px — sebanding jumlah seniman
        const on = active === s.provinsi;
        const dim = active && !on;
        return (
          <button
            key={s.provinsi}
            type="button"
            aria-label={`${info.name}: ${s.seniman} seniman, ${s.karya} karya`}
            aria-pressed={on}
            onMouseEnter={() => setHover(s.provinsi)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect(on ? null : s.provinsi)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer"
            style={{ left: `${info.x}%`, top: `${info.y}%`, width: Math.max(size, 22), height: Math.max(size, 22), opacity: dim ? 0.35 : 1, transition: "opacity .3s" }}
          >
            <span className="absolute rounded-full bg-[#E8C878]/40 animate-ping" style={{ width: size, height: size, animationDuration: `${2.2 + (s.seniman % 3) * 0.4}s` }} />
            <span
              className="relative rounded-full"
              style={{
                width: size * 0.62, height: size * 0.62,
                background: "radial-gradient(circle, #FFF1C9 0%, #E8C878 55%, #C6A75E 100%)",
                boxShadow: on ? "0 0 0 2px #1A1008, 0 0 0 3px #E8C878, 0 0 18px #E8C878" : "0 0 12px rgba(232,200,120,0.8)",
              }}
            />
          </button>
        );
      })}

      {/* Keterangan provinsi */}
      <AnimatePresence>
        {tip && tipInfo && (
          <motion.div
            key={tip.provinsi}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute z-20 -translate-x-1/2 pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-lg border border-[#C6A75E]/40 bg-[#0D0A06]/90 backdrop-blur-sm"
            style={tipInfo.y > 55
              ? { left: `${Math.min(85, Math.max(15, tipInfo.x))}%`, bottom: `calc(${100 - tipInfo.y}% + 16px)` }
              : { left: `${Math.min(85, Math.max(15, tipInfo.x))}%`, top: `calc(${tipInfo.y}% + 16px)` }}
          >
            <p className="text-[#E8C878] text-xs sm:text-sm font-semibold" style={{ fontFamily: "var(--font-philosopher)" }}>{tipInfo.name}</p>
            <p className="text-[#F5EBDD]/70 text-[10px] sm:text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {tip.seniman} seniman · {tip.karya > 0 ? `${tip.karya} karya` : "karya segera hadir"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs tracking-wide transition-colors whitespace-nowrap ${
        on ? "border-[#E8C878] bg-[#C6A75E]/20 text-[#F5EBDD]" : "border-[#C6A75E]/25 text-[#F5EBDD]/60 hover:border-[#C6A75E]/60 hover:text-[#F5EBDD]/90"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {children}
    </button>
  );
}

export default function RoomNusantara() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [prov, setProv] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchProducts()
      .then((list) => { if (alive) setItems(list.length >= 6 ? list : galleryItems); })
      .catch(() => { if (alive) setItems(galleryItems); });
    fetch(`${MAJACRAFT}/api/stats/public`).then((r) => r.json())
      .then((j) => { if (alive && j?.success) setStats(j.data); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const live = !!items && items !== galleryItems;

  /* Kategori + jumlah karya, dari karya yang dimuat (mengikuti filter provinsi) */
  const categories = useMemo(() => {
    const m = new Map<string, number>();
    for (const g of items ?? []) if (g.cat && (!prov || g.prov === prov)) m.set(g.cat, (m.get(g.cat) ?? 0) + 1);
    return [...m].sort((a, b) => b[1] - a[1]);
  }, [items, prov]);

  const filtered = useMemo(
    () => (items ?? []).filter((g) => (!prov || g.prov === prov) && (!cat || g.cat === cat)),
    [items, prov, cat],
  );

  // Ganti provinsi → kategori yang tidak ada di provinsi itu dilepas
  useEffect(() => { if (cat && !categories.some(([c]) => c === cat)) setCat(null); }, [categories, cat]);

  /* DomeGallery images array (src + alt) — dimemo agar bola tidak dibangun ulang */
  const domeImages = useMemo(() => filtered.map((g) => ({ src: g.image, alt: g.text })), [filtered]);
  const useDome = filtered.length >= 8;

  /* When a dome tile is clicked, find the matching gallery item by src */
  const handleDomeClick = useCallback((src: string) => {
    const found = items?.find((g) => g.image === src);
    if (found) setSelectedItem(found);
  }, [items]);

  const provName = prov ? provinceInfo(prov)?.name : null;

  return (
    <section className="room room-4 flex items-center justify-center room-vignette relative">
      {/* Deep warm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F3B2E]/20 via-[#1A1008] to-[#2C1A12]" />

      {/* Ambient particles */}
      <ParticleField count={isMobile ? 10 : 20} color="#0F3B2E" minSize={1} maxSize={3} speed="slow" direction="random" />

      {/* Ambient glow — parallax */}
      <div className="absolute inset-0 pointer-events-none" ref={registerParallax(-12, -12)} style={{ willChange: "transform" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0F3B2E] opacity-[0.06] blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 ml-12 sm:ml-16 md:ml-20 mr-4 sm:mr-8 md:mr-12 w-auto flex flex-col items-center h-full pt-16 sm:pt-10 pb-24 sm:pb-6">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-2 sm:mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-[#C6A75E]/50 block mb-1 sm:mb-2" style={{ fontFamily: "var(--font-philosopher)" }}>
            Peta Karya Nusantara
          </span>
          <BlurText
            text="Nusantara"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#C6A75E] text-glow-gold mb-1 sm:mb-2"
            style={{ fontFamily: "var(--font-cinzel)" }}
            delay={0.2}
          />
          <p className="text-sm sm:text-lg md:text-xl text-[#F5EBDD]/70 max-w-2xl mx-auto min-h-[1.5em]" style={{ fontFamily: "var(--font-cormorant)" }}>
            {stats ? (
              <>
                <span className="text-[#E8C878] font-semibold">{stats.karya}</span> karya dari{" "}
                <span className="text-[#E8C878] font-semibold">{stats.pengrajin}</span> seniman di{" "}
                <span className="text-[#E8C878] font-semibold">{stats.provinsi}</span> provinsi — dan terus bertambah.
              </>
            ) : "Jelajahi kekayaan seni dari setiap penjuru kepulauan"}
          </p>
        </motion.div>

        {/* ── Peta hidup ── */}
        <FadeIn direction="up" delay={0.3} duration={0.8} className="w-full">
          <LiveMap sebaran={stats?.sebaran ?? []} active={prov} onSelect={setProv} />
        </FadeIn>

        <motion.p
          className="text-center text-xs sm:text-base md:text-lg text-[#C6A75E]/55 tracking-wide sm:tracking-wider mt-1 sm:mt-2 mb-3 px-2 text-balance"
          style={{ fontFamily: "var(--font-philosopher)" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }}
        >
          Berawal dari tanah Majapahit, menyebar ke seluruh Nusantara
        </motion.p>

        {/* ── Filter ── */}
        {live && (
          <div className="w-[calc(100vw-4rem)] sm:w-full max-w-4xl flex flex-nowrap sm:flex-wrap sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {prov && (
              <Chip on onClick={() => setProv(null)}>📍 {provName} ✕</Chip>
            )}
            <Chip on={!cat} onClick={() => setCat(null)}>Semua · {prov ? (items ?? []).filter((g) => g.prov === prov).length : (items ?? []).length}</Chip>
            {categories.map(([c, n]) => (
              <Chip key={c} on={cat === c} onClick={() => setCat(cat === c ? null : c)}>{c} · {n}</Chip>
            ))}
          </div>
        )}

        {/* ── Galeri ── */}
        <FadeIn direction="up" delay={0.5} duration={0.8}>
          <div
            className="w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[70vw] relative mt-2"
            style={{ height: isMobile ? "320px" : "380px" }}
          >
            {items && useDome && (
              <DomeGallery
                key={`${prov ?? "all"}|${cat ?? "all"}`}
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
              />
            )}
            {items && !useDome && (
              <div className="h-full flex flex-col items-center justify-center gap-3">
                {filtered.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
                    {filtered.map((g) => (
                      <button key={g.image} type="button" onClick={() => setSelectedItem(g)}
                        className="w-28 sm:w-36 rounded-lg overflow-hidden border border-[#C6A75E]/25 bg-[#0D0A06] hover:border-[#C6A75E]/70 transition-colors text-left">
                        <img src={g.image} alt={g.text} className="w-full aspect-square object-cover" loading="lazy" />
                        <p className="px-2 py-1.5 text-[10px] sm:text-xs text-[#F5EBDD]/80 line-clamp-1 capitalize" style={{ fontFamily: "var(--font-inter)" }}>{g.text.toLowerCase()}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#F5EBDD]/60 text-base sm:text-lg text-center max-w-md" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Seniman dari {provName ?? "provinsi ini"} sudah bergabung — karyanya segera hadir di MajaCraft.
                  </p>
                )}
              </div>
            )}
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
