"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import { ParticleField } from "@/components/ui/CardEffects";

/**
 * Ruang "Ekosistem MAJA" — Siklus Karya.
 * Empat pilar tersusun sebagai satu siklus mengelilingi logo MAJA, masing-masing dengan bukti nyata
 * (angka & konten live dari MajaCraft). Seberkas cahaya emas mengalir dari panel ke panel mengikuti
 * urutan siklus; panel tujuan menyala sesaat saat cahaya tiba.
 */

const MAJACRAFT = "https://majacraft.id";
const GOLD = "#C6A75E";
const SEG_MS = 2000; // durasi cahaya berpindah dari satu panel ke panel berikutnya (1 putaran = 8 detik)

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
    desc: "Kepemilikan karya orisinal tercatat permanen — termasuk karya yang dijual di luar MajaCraft.",
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
      if (c) setCert({ src: optimized(`/uploads/certificates/thumbs/${c.id}.jpg`, 384), alt: c.productName, href: `/sertifikat/?id=${c.id}` });
    }).catch(() => {});
  }, []);
  return { stats, products, cert };
}

/* ─────────────── Cahaya mengalir ─────────────── */

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Menjalankan siklus cahaya selama `wrapRef` terlihat di layar.
 * onFrame(seg, t) dipanggil tiap frame: seg = segmen ke-berapa, t = progres 0..1 di segmen itu.
 */
function useFlowLoop(wrapRef: React.MutableRefObject<HTMLElement | null>, segments: number, onFrame: (seg: number, t: number) => void) {
  const [enabled, setEnabled] = useState(true);
  const frameRef = useRef(onFrame);
  frameRef.current = onFrame;
  useEffect(() => {
    if (prefersReducedMotion()) { setEnabled(false); return; }
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let running = false;
    let origin = 0;
    const loop = (now: number) => {
      if (!origin) origin = now;
      const phase = ((now - origin) / SEG_MS) % segments;
      frameRef.current(Math.floor(phase), phase - Math.floor(phase));
      raf = requestAnimationFrame(loop);
    };
    // hanya berjalan saat ruang terlihat — hemat baterai
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(loop); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [wrapRef, segments]);
  return enabled;
}

/** Panel mana yang menyala: panel asal di awal segmen, panel tujuan saat cahaya tiba */
const activeFor = (seg: number, t: number, n: number) => (t > 0.88 ? (seg + 1) % n : t < 0.3 ? seg : -1);

const TAIL = 7; // jumlah titik ekor komet

/** Komet: kepala bercahaya + ekor yang memudar, digerakkan langsung lewat DOM (tanpa re-render per frame) */
function Comet({ headRef, tailRefs }: { headRef: React.MutableRefObject<SVGCircleElement | null>; tailRefs: React.MutableRefObject<(SVGCircleElement | null)[]> }) {
  return (
    <g style={{ filter: "drop-shadow(0 0 6px rgba(243,223,162,0.9)) drop-shadow(0 0 14px rgba(198,167,94,0.6))" }}>
      {Array.from({ length: TAIL }).map((_, k) => (
        <circle key={k} ref={(el) => { tailRefs.current[k] = el; }} r={3.2 - k * 0.38} fill="#E8C878" opacity={0} />
      ))}
      <circle ref={headRef} r={4} fill="#FFF1C9" opacity={0} />
    </g>
  );
}

function placeComet(path: SVGPathElement | null, t: number, head: SVGCircleElement | null, tail: (SVGCircleElement | null)[], fade = 1) {
  if (!path || !head) return;
  const len = path.getTotalLength();
  // ease in-out agar cahaya "berangkat" & "tiba" dengan lembut
  const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const at = (u: number) => path.getPointAtLength(Math.max(0, Math.min(1, u)) * len);
  const p = at(e);
  // muncul di awal, padam saat masuk panel tujuan
  const vis = Math.min(1, t / 0.08, (1 - t) / 0.1) * fade;
  head.setAttribute("cx", String(p.x)); head.setAttribute("cy", String(p.y)); head.setAttribute("opacity", String(Math.max(0, vis)));
  tail.forEach((c, k) => {
    if (!c) return;
    const q = at(e - (k + 1) * 0.035);
    c.setAttribute("cx", String(q.x)); c.setAttribute("cy", String(q.y));
    c.setAttribute("opacity", String(Math.max(0, vis * (0.75 - k * 0.1))));
  });
}

/** DESKTOP — jalur lengkung antar panel (diukur dari posisi panel sebenarnya) */
function FlowDesktop({ wrapRef, cardRefs, onActive }: {
  wrapRef: React.MutableRefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onActive: (i: number) => void;
}) {
  const [geo, setGeo] = useState<{ w: number; h: number; d: string[] } | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const headRef = useRef<SVGCircleElement | null>(null);
  const tailRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lastActive = useRef(-2);

  // Ukur posisi 4 panel → 4 lengkung: kiri-atas → kanan-atas → kanan-bawah → kiri-bawah → kembali
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const W = wrap.getBoundingClientRect();
      const r = cardRefs.current.map((c) => c?.getBoundingClientRect());
      if (r.some((x) => !x)) return;
      const R = r.map((x) => ({ l: x!.left - W.left, r: x!.right - W.left, t: x!.top - W.top, b: x!.bottom - W.top, cx: x!.left - W.left + x!.width / 2, cy: x!.top - W.top + x!.height / 2 }));
      const g = 8, bow = 34;
      const q = (ax: number, ay: number, cx: number, cy: number, bx: number, by: number) => `M${ax},${ay} Q${cx},${cy} ${bx},${by}`;
      const d = [
        q(R[0].r + g, R[0].cy, (R[0].r + R[1].l) / 2, R[0].cy - bow * 2.2, R[1].l - g, R[1].cy),       // 01 → 02 (atas)
        q(R[1].cx, R[1].b + g, R[1].cx + bow * 1.6, (R[1].b + R[2].t) / 2, R[2].cx, R[2].t - g),       // 02 → 03 (kanan)
        q(R[2].l - g, R[2].cy, (R[2].l + R[3].r) / 2, R[2].cy + bow * 2.2, R[3].r + g, R[3].cy),       // 03 → 04 (bawah)
        q(R[3].cx, R[3].t - g, R[3].cx - bow * 1.6, (R[3].t + R[0].b) / 2, R[0].cx, R[0].b + g),       // 04 → 01 (kiri)
      ];
      setGeo({ w: W.width, h: W.height, d });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [wrapRef, cardRefs]);

  const enabled = useFlowLoop(wrapRef, 4, useCallback((seg: number, t: number) => {
    placeComet(pathRefs.current[seg], t, headRef.current, tailRefs.current);
    const a = activeFor(seg, t, 4);
    if (a !== lastActive.current) { lastActive.current = a; onActive(a); }
  }, [onActive]));

  if (!geo) return null;
  return (
    <svg className="absolute inset-0 pointer-events-none overflow-visible" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      <defs>
        <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.15" />
          <stop offset="0.5" stopColor={GOLD} stopOpacity="0.45" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {geo.d.map((d, k) => (
        <motion.path key={k} ref={(el) => { pathRefs.current[k] = el; }} d={d} fill="none" stroke="url(#flowLine)" strokeWidth={1.2} strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.3 + k * 0.25 }} viewport={{ once: true }} />
      ))}
      {/* Mata panah kecil di ujung jalur — tetap terbaca bila animasi dimatikan */}
      {!enabled && geo.d.map((d, k) => {
        const m = d.match(/ (-?[\d.]+),(-?[\d.]+)$/);
        return m ? <circle key={`e${k}`} cx={m[1]} cy={m[2]} r={2.5} fill={GOLD} opacity={0.7} /> : null;
      })}
      {enabled && <Comet headRef={headRef} tailRefs={tailRefs} />}
    </svg>
  );
}

/** MOBILE — cahaya turun di garis timeline: 1 → 2 → 3 → 4, lalu kembali ke awal */
function FlowMobile({ wrapRef, badgeRefs, onActive }: {
  wrapRef: React.MutableRefObject<HTMLDivElement | null>;
  badgeRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  onActive: (i: number) => void;
}) {
  const [geo, setGeo] = useState<{ w: number; h: number; d: string[] } | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const headRef = useRef<SVGCircleElement | null>(null);
  const tailRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lastActive = useRef(-2);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const W = wrap.getBoundingClientRect();
      const b = badgeRefs.current.map((x) => x?.getBoundingClientRect());
      if (b.some((x) => !x)) return;
      const c = b.map((x) => ({ x: x!.left - W.left + x!.width / 2, y: x!.top - W.top + x!.height / 2, r: x!.height / 2 }));
      const d = [0, 1, 2].map((k) => `M${c[k].x},${c[k].y + c[k].r + 4} L${c[k + 1].x},${c[k + 1].y - c[k + 1].r - 4}`);
      setGeo({ w: W.width, h: W.height, d });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [wrapRef, badgeRefs]);

  // 3 segmen turun + 1 jeda (cahaya padam, siklus kembali ke langkah 1)
  const enabled = useFlowLoop(wrapRef, 4, useCallback((seg: number, t: number) => {
    if (seg < 3) placeComet(pathRefs.current[seg], t, headRef.current, tailRefs.current);
    else placeComet(pathRefs.current[2], 1, headRef.current, tailRefs.current, 0);
    const a = seg < 3 ? activeFor(seg, t, 4) : t > 0.75 ? 0 : -1;
    if (a !== lastActive.current) { lastActive.current = a; onActive(a); }
  }, [onActive]));

  if (!geo || !enabled) return null;
  return (
    <svg className="absolute inset-0 pointer-events-none overflow-visible" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      {geo.d.map((d, k) => <path key={k} ref={(el) => { pathRefs.current[k] = el; }} d={d} fill="none" stroke="none" />)}
      <Comet headRef={headRef} tailRefs={tailRefs} />
    </svg>
  );
}

/* ─────────────── Isi kartu ─────────────── */

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
      {stats && <p className={label}><span className={num}><CountUp value={stats.karya} /></span> karya aktif · <span className={num}><CountUp value={stats.pengrajin} /></span> seniman bergabung</p>}
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
            <img src={optimized(a.cover, 256)} onError={(e) => { const i = e.currentTarget; if (!i.dataset.raw) { i.dataset.raw = "1"; i.src = abs(a.cover!); } }} alt="" loading="lazy" className="w-full h-full object-cover" />
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
      {stats && <p className={label}>Seniman dari <span className={num}><CountUp value={stats.provinsi} /></span> provinsi telah bergabung</p>}
    </div>
  );
}

function PillarCard({ p, i, active, children }: { p: (typeof PILLARS)[number]; i: number; active: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`relative h-full rounded-xl border bg-[#15100A]/90 backdrop-blur-sm p-5 sm:p-6 flex flex-col transition-[border-color,box-shadow] duration-700 ${
        active ? "border-[#C6A75E]/70 shadow-[0_0_45px_rgba(198,167,94,0.22),inset_0_0_30px_rgba(198,167,94,0.06)]" : "border-[#C6A75E]/20 hover:border-[#C6A75E]/45"
      }`}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 transition-colors duration-700 ${active ? "border-[#C6A75E]/70 bg-[#C6A75E]/[0.14]" : "border-[#C6A75E]/30 bg-[#C6A75E]/[0.06]"}`}>
            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
          </span>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/60" style={{ fontFamily: "var(--font-inter)" }}>{p.tag}</p>
            <h3 className="text-lg sm:text-xl font-semibold text-[#C6A75E] leading-tight" style={{ fontFamily: "var(--font-cinzel)" }}>{p.title}</h3>
          </div>
        </div>
        <span className="text-right shrink-0">
          <span className={`block text-2xl leading-none transition-colors duration-700 ${active ? "text-[#E8C878]" : "text-[#C6A75E]/35"}`} style={{ fontFamily: "var(--font-cinzel)", textShadow: active ? "0 0 18px rgba(232,200,120,0.6)" : "none" }}>{p.step}</span>
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
  const [active, setActive] = useState(-1);
  const onActive = useCallback((i: number) => setActive(i), []);

  const deskWrap = useRef<HTMLDivElement | null>(null);
  const deskCards = useRef<(HTMLDivElement | null)[]>([]);
  const mobWrap = useRef<HTMLDivElement | null>(null);
  const mobBadges = useRef<(HTMLSpanElement | null)[]>([]);

  const STAT_ITEMS = stats ? [
    { v: stats.karya, l: "Karya aktif" },
    { v: stats.pengrajin, l: "Seniman Bergabung" },
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

          {/* ── DESKTOP: siklus 2×2 mengelilingi logo, cahaya mengalir antar panel ── */}
          {!isMobile && (
            <div ref={deskWrap} className="hidden md:block relative w-full max-w-5xl mt-12">
              <div className="relative grid grid-cols-2 gap-x-28 gap-y-20 items-stretch">
                {PILLARS.map((p, i) => {
                  // urutan searah jarum jam: kiri-atas → kanan-atas → kanan-bawah → kiri-bawah
                  const order = ["order-1", "order-2", "order-4", "order-3"][i];
                  return (
                    <div key={p.title} className={order} ref={(el) => { deskCards.current[i] = el; }}>
                      <PillarCard p={p} i={i} active={active === i}><Proof index={i} stats={stats} products={products} cert={cert} /></PillarCard>
                    </div>
                  );
                })}
              </div>
              <FlowDesktop wrapRef={deskWrap} cardRefs={deskCards} onActive={onActive} />
              {/* Medali logo di tengah */}
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 rounded-full flex flex-col items-center justify-center border border-[#C6A75E]/40 bg-[#100B06] shadow-[0_0_60px_rgba(198,167,94,0.18)]"
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="/images/museum/branding/themaja-logo-600.png" alt="The MAJA" className="w-14 h-auto" />
                <span className="mt-1 text-[9px] tracking-[0.35em] uppercase text-[#C6A75E]/80" style={{ fontFamily: "var(--font-cinzel)" }}>The MAJA</span>
              </motion.div>
            </div>
          )}

          {/* ── MOBILE: timeline vertikal, cahaya turun di garis ── */}
          {isMobile && (
            <div ref={mobWrap} className="w-full max-w-md mt-10 relative">
              <div className="absolute left-[15px] top-2 bottom-8 w-px bg-gradient-to-b from-[#C6A75E]/60 via-[#C6A75E]/25 to-[#C6A75E]/60" />
              <div className="space-y-5">
                {PILLARS.map((p, i) => (
                  <div key={p.title} className="relative pl-10">
                    <span ref={(el) => { mobBadges.current[i] = el; }}
                      className={`absolute left-0 top-5 w-[31px] h-[31px] rounded-full border flex items-center justify-center text-[11px] transition-all duration-500 ${
                        active === i ? "border-[#E8C878] bg-[#3A2A12] text-[#FFF1C9] shadow-[0_0_18px_rgba(232,200,120,0.55)]" : "border-[#C6A75E]/50 bg-[#100B06] text-[#C6A75E]"
                      }`} style={{ fontFamily: "var(--font-cinzel)" }}>{i + 1}</span>
                    <PillarCard p={p} i={i} active={active === i}><Proof index={i} stats={stats} products={products} cert={cert} /></PillarCard>
                  </div>
                ))}
              </div>
              <FlowMobile wrapRef={mobWrap} badgeRefs={mobBadges} onActive={onActive} />
              <p className="mt-5 pl-10 text-sm text-[#C6A75E]/70 italic" style={{ fontFamily: "var(--font-cormorant)" }}>
                ↻ dan siklus berulang — pengrajin baru, karya baru.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
