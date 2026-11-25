"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import { ParticleField } from "@/components/ui/CardEffects";

/**
 * Ruang "Ekosistem MAJA" — Siklus Karya.
 * Empat pilar tersusun sebagai satu siklus mengelilingi logo MAJA, masing-masing dengan bukti nyata
 * (angka & konten live dari MajaCraft).
 */

const MAJACRAFT = "https://majacraft.id";
const GOLD = "#C6A75E";

type Stats = {
  karya: number; sertifikat: number; pengrajin: number; provinsi: number;
  artikel?: { title: string; slug: string; cover: string | null } | null;
};
type Thumb = { src: string; alt: string; href: string };

const abs = (u: string) => (u.startsWith("http") ? u : `${MAJACRAFT}${u}`);
const optimized = (url: string, w: number) => `${MAJACRAFT}/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=75`;

const PILLARS = [
  {
    step: "01", verb: "Dijual", tag: "Marketplace", title: "MajaCraft",
    desc: "Karya pengrajin sampai ke pembeli dengan harga yang adil dan pembayaran yang aman.",
    href: MAJACRAFT, cta: "Kunjungi MajaCraft",
    icon: "M4 10h24l-2 16H6L4 10zm6 0V8a6 6 0 0112 0v2",
  },
  {
    step: "02", verb: "Tercatat", tag: "Sertifikasi", title: "MAJA Certified",
    desc: "Kepemilikan karya orisinil tercatat permanen — termasuk karya yang dijual di luar MajaCraft.",
    href: `${MAJACRAFT}/certified`, cta: "Ajukan Sertifikat",
    icon: "M16 3l10 4v8c0 7-4.5 11-10 14C10.5 26 6 22 6 15V7l10-4zm-4 13l3 3 6-6",
  },
  {
    step: "03", verb: "Diceritakan", tag: "Budaya", title: "Ruang Budaya",
    desc: "Kisah di balik karya, profil pengrajin, dan liputan tradisi dari seluruh Nusantara.",
    href: `${MAJACRAFT}/ruang-budaya`, cta: "Baca Kisahnya",
    icon: "M6 6h9a3 3 0 013 3v17a2 2 0 00-2-2H6V6zm20 0h-9a3 3 0 00-3 3v17a2 2 0 012-2h10V6z",
  },
  {
    step: "04", verb: "Tumbuh", tag: "Komunitas", title: "Komunitas MAJA",
    desc: "Duta Daerah, Program Kampus, dan Kontributor menghadirkan pengrajin baru dari daerah.",
    href: `${MAJACRAFT}/karir`, cta: "Bergabung",
    icon: "M11 14a4 4 0 100-8 4 4 0 000 8zm10 0a4 4 0 100-8 4 4 0 000 8zM3 26c0-4 3.5-7 8-7s8 3 8 7m2-7c4.5 0 8 3 8 7",
  },
];

/** Angka yang naik pelan saat terlihat */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString("id-ID")}</span>;
}

function useEcosystemData() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [products, setProducts] = useState<Thumb[]>([]);
  const [cert, setCert] = useState<Thumb | null>(null);
  useEffect(() => {
    fetch(`${MAJACRAFT}/api/stats/public`).then((r) => r.json()).then((j) => j?.success && setStats(j.data)).catch(() => {});
    fetch(`${MAJACRAFT}/api/products?limit=3`).then((r) => r.json()).then((j) => {
      const items = (j?.data?.items ?? []) as { name: string; slug: string; images: { url: string }[] }[];
      setProducts(items.filter((p) => p.images?.[0]?.url).map((p) => ({ src: optimized(p.images[0].url, 256), alt: p.name, href: `${MAJACRAFT}/produk/${p.slug}` })));
    }).catch(() => {});
    fetch(`${MAJACRAFT}/api/certificate?limit=1`).then((r) => r.json()).then((j) => {
      const c = j?.data?.certificates?.[0] as { id: string; productName: string } | undefined;
      if (c) setCert({ src: `${MAJACRAFT}/uploads/certificates/thumbs/${c.id}.jpg`, alt: c.productName, href: `/sertifikat/?id=${c.id}` });
    }).catch(() => {});
  }, []);
  return { stats, products, cert };
}

/** Bukti nyata di tiap pilar */
function Proof({ index, stats, products, cert }: { index: number; stats: Stats | null; products: Thumb[]; cert: Thumb | null }) {
  const label = "text-xs text-[#F5EBDD]/55";
  const num = "text-[#E8D5A3] font-semibold";
  if (index === 0) return (
    <div className="space-y-2.5">
      {products.length > 0 && (
        <div className="flex gap-2">
          {products.map((p) => (
            <a key={p.href} href={p.href} target="_blank" rel="noopener" className="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden border border-[#C6A75E]/20 bg-[#0D0A06] hover:border-[#C6A75E]/60 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      )}
      {stats && <p className={label}><span className={num}><CountUp value={stats.karya} /></span> karya aktif dari <span className={num}><CountUp value={stats.pengrajin} /></span> pengrajin</p>}
    </div>
  );
  if (index === 1) return (
    <div className="flex items-center gap-3">
      {cert && (
        <a href={cert.href} className="w-24 sm:w-28 aspect-[3/2] rounded-md overflow-hidden border border-[#C6A75E]/20 bg-[#0D0A06] shrink-0 hover:border-[#C6A75E]/60 transition-colors">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cert.src} alt={cert.alt} loading="lazy" className="w-full h-full object-contain" />
        </a>
      )}
      {stats && <p className={label}><span className={`${num} text-base`}><CountUp value={stats.sertifikat} /></span><br />sertifikat kepemilikan tercatat</p>}
    </div>
  );
  if (index === 2) {
    const a = stats?.artikel;
    return a ? (
      <a href={`${MAJACRAFT}/ruang-budaya/${a.slug}`} target="_blank" rel="noopener" className="flex items-center gap-3 group/art">
        {a.cover && (
          <span className="w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden border border-[#C6A75E]/20 bg-[#0D0A06] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={abs(a.cover)} alt="" loading="lazy" className="w-full h-full object-cover" />
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[10px] tracking-[0.25em] uppercase text-[#C6A75E]/60">Kisah terbaru</span>
          <span className="block text-sm text-[#F5EBDD]/80 leading-snug line-clamp-2 group-hover/art:text-[#E8D5A3]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}>{a.title}</span>
        </span>
      </a>
    ) : null;
  }
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap gap-1.5">
        {["Duta Daerah", "Program Kampus", "Kontributor"].map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full border border-[#C6A75E]/30 text-[11px] text-[#E8D5A3]/90">{t}</span>
        ))}
      </div>
      {stats && <p className={label}>Pengrajin dari <span className={num}><CountUp value={stats.provinsi} /></span> provinsi telah bergabung</p>}
    </div>
  );
}

function PillarCard({ p, i, children }: { p: (typeof PILLARS)[number]; i: number; children: React.ReactNode }) {
  return (
    <motion.div
      className="relative h-full rounded-xl border border-[#C6A75E]/20 bg-[#15100A]/90 backdrop-blur-sm p-5 sm:p-6 flex flex-col hover:border-[#C6A75E]/45 transition-colors duration-500"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#C6A75E]/30 bg-[#C6A75E]/[0.06] shrink-0">
            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
          </span>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/60" style={{ fontFamily: "var(--font-inter)" }}>{p.tag}</p>
            <h3 className="text-lg sm:text-xl font-semibold text-[#C6A75E] leading-tight" style={{ fontFamily: "var(--font-cinzel)" }}>{p.title}</h3>
          </div>
        </div>
        <span className="text-right shrink-0">
          <span className="block text-2xl leading-none text-[#C6A75E]/35" style={{ fontFamily: "var(--font-cinzel)" }}>{p.step}</span>
          <span className="block text-[10px] tracking-[0.2em] uppercase text-[#E8D5A3]/80 mt-1" style={{ fontFamily: "var(--font-inter)" }}>{p.verb}</span>
        </span>
      </div>
      <p className="mt-3 text-base text-[#F5EBDD]/65 leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>{p.desc}</p>
      <div className="mt-4 flex-1">{children}</div>
      <a href={p.href} target="_blank" rel="noopener" className="mt-5 self-start text-xs tracking-[0.2em] uppercase text-[#C6A75E]/85 hover:text-[#C6A75E]" style={{ fontFamily: "var(--font-inter)" }}>
        {p.cta} →
      </a>
    </motion.div>
  );
}

export default function RoomEkosistem() {
  const isMobile = useIsMobile();
  const { stats, products, cert } = useEcosystemData();

  const STAT_ITEMS = stats ? [
    { v: stats.karya, l: "Karya aktif" },
    { v: stats.pengrajin, l: "Pengrajin" },
    { v: stats.provinsi, l: "Provinsi" },
    { v: stats.sertifikat, l: "Sertifikat tercatat" },
  ] : [];

  return (
    <section className="room room-auto flex items-center justify-center room-vignette relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#120C07] via-[#1E150E] to-[#0D0A06]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C6A75E] opacity-[0.06] blur-[160px] pointer-events-none" />
      <ParticleField count={isMobile ? 8 : 16} color={GOLD} minSize={1} maxSize={2} speed="slow" direction="up" />

      <div className="room-content relative z-10">
        <div className="px-5 pb-24 pt-14 sm:pb-16 sm:pt-16 sm:pl-24 md:pl-28 sm:pr-8 md:pr-12 flex flex-col items-center">
          {/* Judul */}
          <motion.div className="text-center max-w-2xl" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <span className="text-xs sm:text-sm tracking-[0.5em] uppercase text-[#C6A75E]/50 block mb-2" style={{ fontFamily: "var(--font-philosopher)" }}>Ruang Ekosistem</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-glow-gold leading-tight" style={{ fontFamily: "var(--font-cinzel)", color: GOLD }}>Satu Rumah, Satu Siklus</h2>
            <p className="mt-3 text-base sm:text-xl text-[#F5EBDD]/65 leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>
              Setiap karya melewati perjalanan yang sama &mdash; dan MAJA hadir di setiap langkahnya.
            </p>
          </motion.div>

          {/* Angka live */}
          {STAT_ITEMS.length > 0 && (
            <motion.div className="mt-8 grid grid-cols-2 sm:grid-cols-4 w-full max-w-3xl border-y border-[#C6A75E]/15 divide-[#C6A75E]/15 sm:divide-x"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              {STAT_ITEMS.map((s) => (
                <div key={s.l} className="py-4 text-center">
                  <p className="text-3xl sm:text-4xl text-[#E8D5A3]" style={{ fontFamily: "var(--font-cinzel)" }}><CountUp value={s.v} /></p>
                  <p className="mt-1 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#F5EBDD]/50" style={{ fontFamily: "var(--font-inter)" }}>{s.l}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── DESKTOP: siklus 2×2 mengelilingi logo ── */}
          <div className="hidden md:block relative w-full max-w-5xl mt-12">
            {/* Cincin emas penghubung */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <motion.ellipse cx="50" cy="50" rx="36" ry="40" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.25" strokeDasharray="1 1.2"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2.2, ease: "easeInOut" }} viewport={{ once: true }} />
            </svg>
            <div className="relative grid grid-cols-2 gap-x-28 gap-y-20 items-stretch">
              {PILLARS.map((p, i) => {
                // urutan searah jarum jam: kiri-atas → kanan-atas → kanan-bawah → kiri-bawah
                const order = ["order-1", "order-2", "order-4", "order-3"][i];
                return (
                  <div key={p.title} className={order}>
                    <PillarCard p={p} i={i}><Proof index={i} stats={stats} products={products} cert={cert} /></PillarCard>
                  </div>
                );
              })}
            </div>
            {/* Panah arah siklus */}
            {[
              { cls: "top-[22%] left-1/2 -translate-x-1/2", rot: 0 },
              { cls: "top-1/2 right-[23%] -translate-y-1/2 translate-x-1/2", rot: 90 },
              { cls: "bottom-[22%] left-1/2 -translate-x-1/2", rot: 180 },
              { cls: "top-1/2 left-[23%] -translate-y-1/2 -translate-x-1/2", rot: 270 },
            ].map((a, k) => (
              <motion.svg key={k} className={`absolute ${a.cls} w-5 h-5 pointer-events-none`} viewBox="0 0 20 20" style={{ rotate: a.rot }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }} transition={{ delay: 1.4 + k * 0.15 }} viewport={{ once: true }} aria-hidden="true">
                <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            ))}
            {/* Medali logo di tengah */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 rounded-full flex flex-col items-center justify-center border border-[#C6A75E]/40 bg-[#100B06] shadow-[0_0_60px_rgba(198,167,94,0.18)]"
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/museum/branding/themaja-logo-600.png" alt="The MAJA" className="w-14 h-auto" />
              <span className="mt-1 text-[9px] tracking-[0.35em] uppercase text-[#C6A75E]/80" style={{ fontFamily: "var(--font-cinzel)" }}>The MAJA</span>
            </motion.div>
          </div>

          {/* ── MOBILE: timeline vertikal ── */}
          <div className="md:hidden w-full max-w-md mt-10 relative">
            <div className="absolute left-[15px] top-2 bottom-8 w-px bg-gradient-to-b from-[#C6A75E]/60 via-[#C6A75E]/25 to-[#C6A75E]/60" />
            <div className="space-y-5">
              {PILLARS.map((p, i) => (
                <div key={p.title} className="relative pl-10">
                  <span className="absolute left-0 top-5 w-[31px] h-[31px] rounded-full border border-[#C6A75E]/50 bg-[#100B06] flex items-center justify-center text-[11px] text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>{i + 1}</span>
                  <PillarCard p={p} i={i}><Proof index={i} stats={stats} products={products} cert={cert} /></PillarCard>
                </div>
              ))}
            </div>
            <p className="mt-5 pl-10 text-sm text-[#C6A75E]/70 italic" style={{ fontFamily: "var(--font-cormorant)" }}>
              ↻ dan siklus berulang — pengrajin baru, karya baru.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
