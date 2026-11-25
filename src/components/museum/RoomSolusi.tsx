"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import useParallax from "@/hooks/useParallax";
import { SplitText, FadeIn } from "@/components/ui/TextEffects";
import { SpotlightCard, Holographic, TiltCard, ParticleField } from "@/components/ui/CardEffects";

const MAJACRAFT = "https://majacraft.id";

const solutions = [
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-9 h-9 md:w-11 md:h-11">
        <rect x="6" y="4" width="20" height="24" rx="2" fill="none" stroke="#C6A75E" strokeWidth="1.2" />
        <path d="M10 10 L22 10 M10 14 L18 14 M10 18 L20 18" stroke="#C6A75E" strokeWidth="0.8" opacity="0.5" />
        <circle cx="16" cy="24" r="2" fill="#C6A75E" opacity="0.6" />
        <path d="M13 6 L16 2 L19 6" stroke="#C6A75E" strokeWidth="0.8" fill="none" />
      </svg>
    ),
    title: "Identitas Karya",
    desc: "Setiap karya mendapat nomor sertifikat unik, lengkap dengan foto, bahan, ukuran, dan asal daerahnya.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-9 h-9 md:w-11 md:h-11">
        <circle cx="16" cy="16" r="10" fill="none" stroke="#C6A75E" strokeWidth="1.2" />
        <path d="M16 6 Q20 12 16 16 Q12 20 16 26" stroke="#C6A75E" strokeWidth="0.8" fill="none" />
        <circle cx="16" cy="16" r="3" fill="#C6A75E" opacity="0.4" />
        <path d="M8 10 L24 10 M6 16 L26 16 M8 22 L24 22" stroke="#C6A75E" strokeWidth="0.4" opacity="0.3" />
      </svg>
    ),
    title: "Riwayat Kepemilikan",
    desc: "Pemilik sah & setiap perpindahan kepemilikan tercatat permanen di blockchain BNB Chain.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-9 h-9 md:w-11 md:h-11">
        <path d="M8 14 Q8 8 14 8 L16 8 M18 8 L24 8 Q24 14 24 14" stroke="#C6A75E" strokeWidth="1.2" fill="none" />
        <path d="M8 18 Q8 24 14 24 L18 24 Q24 24 24 18" stroke="#C6A75E" strokeWidth="1.2" fill="none" />
        <rect x="12" y="12" width="8" height="8" rx="1" fill="#C6A75E" opacity="0.2" stroke="#C6A75E" strokeWidth="0.8" />
        <path d="M14 16 L16 18 L20 14" stroke="#C6A75E" strokeWidth="1" fill="none" />
      </svg>
    ),
    title: "Verifikasi Publik",
    desc: "Siapa pun dapat memeriksa sertifikat melalui QR atau ID — tanpa akun.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-9 h-9 md:w-11 md:h-11">
        <rect x="4" y="12" width="10" height="14" rx="1" fill="none" stroke="#C6A75E" strokeWidth="1" />
        <rect x="18" y="8" width="10" height="14" rx="1" fill="none" stroke="#C6A75E" strokeWidth="1" />
        <path d="M14 18 L18 14" stroke="#C6A75E" strokeWidth="1" strokeDasharray="2 1" />
        <circle cx="9" cy="16" r="2" fill="#C6A75E" opacity="0.4" />
        <path d="M20 12 L26 12 M20 15 L24 15" stroke="#C6A75E" strokeWidth="0.6" opacity="0.5" />
        <path d="M7 26 L11 26" stroke="#C6A75E" strokeWidth="0.8" />
      </svg>
    ),
    title: "Untuk Seniman & Kolektor",
    desc: "Karya yang dijual di luar MajaCraft pun bisa didaftarkan. Gratis tahap awal.",
  },
];

type LiveCert = { id: string; productName: string; store: string; thumb: string };

/** Sertifikat terbaru + jumlah sertifikat tercatat, langsung dari MajaCraft */
function useLiveCertificate() {
  const [cert, setCert] = useState<LiveCert | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    fetch(`${MAJACRAFT}/api/certificate?limit=1`).then((r) => r.json()).then((j) => {
      const c = j?.data?.certificates?.[0] as { id: string; productName: string; sellerStore: string } | undefined;
      if (c) setCert({ id: c.id, productName: c.productName, store: c.sellerStore, thumb: `${MAJACRAFT}/uploads/certificates/thumbs/${c.id}.jpg` });
    }).catch(() => {});
    fetch(`${MAJACRAFT}/api/stats/public`).then((r) => r.json()).then((j) => {
      if (j?.success && typeof j.data?.sertifikat === "number") setTotal(j.data.sertifikat);
    }).catch(() => {});
  }, []);
  return { cert, total };
}

const STEP_BOX = "w-full aspect-[3/4] rounded-sm relative overflow-hidden";
const STEP_LABEL = "absolute bottom-1.5 sm:bottom-2 inset-x-0 text-center text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.25em] uppercase z-10";

function StepArrow() {
  return (
    <motion.div
      className="hidden sm:flex shrink-0 items-center"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <svg width="48" height="24" viewBox="0 0 60 24" fill="none">
        <motion.path
          d="M0 12 L50 12 M42 4 L52 12 L42 20"
          stroke="#C6A75E" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}
        />
      </svg>
    </motion.div>
  );
}

export default function RoomSolusi() {
  const isMobile = useIsMobile();
  const registerParallax = useParallax(!isMobile);
  const { cert, total } = useLiveCertificate();
  const tilt = isMobile ? 0 : 10;

  return (
    <section className="room room-3 room-auto flex items-center justify-center room-vignette relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E150E] via-[#2C1A12] to-[#1A1008]" />

      {/* Cahaya hangat dari tengah — parallax */}
      <div className="absolute inset-0 pointer-events-none" ref={registerParallax(-15, -15)} style={{ willChange: "transform" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#C6A75E] opacity-[0.08] blur-[180px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C6A75E] opacity-[0.05] blur-[100px]" />
      </div>

      <ParticleField count={isMobile ? 12 : 25} color="#C6A75E" minSize={1} maxSize={3} speed="slow" direction="up" />

      <div className="relative z-10 ml-12 sm:ml-16 mr-4 sm:mr-8 md:ml-20 md:mr-12 w-auto flex flex-col items-center justify-center h-full" style={{ padding: "2rem 0" }}>
        {/* Judul */}
        <motion.div
          className="text-center"
          style={{ marginBottom: "1.5rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-sm sm:text-base md:text-lg tracking-[0.5em] uppercase text-[#C6A75E]/40 block mb-2 sm:mb-3" style={{ fontFamily: "var(--font-philosopher)" }}>
            Ruang Sertifikasi
          </span>
          <div className="mb-2 sm:mb-4">
            <SplitText
              text="MAJA Certified"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-glow-gold"
              style={{ fontFamily: "var(--font-cinzel)", color: "#C6A75E" }}
              delay={0.3}
              stagger={0.04}
            />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-[#F5EBDD]/75 max-w-2xl mx-auto text-balance leading-snug" style={{ fontFamily: "var(--font-cormorant)" }}>
            Bukti kepemilikan untuk setiap karya orisinal — <span className="text-[#E8D5A3] italic">tercatat permanen, bisa diperiksa siapa pun.</span>
          </p>
        </motion.div>

        {/* Alur 3 langkah: Karya → Sertifikat → Diperiksa */}
        <motion.div
          className="grid grid-cols-3 gap-2.5 sm:flex sm:items-center sm:justify-center sm:gap-4 md:gap-6 w-full max-w-[22rem] sm:max-w-none"
          style={{ marginBottom: "0.75rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* 1. Karya */}
          <div className="sm:w-44 md:w-48">
            <TiltCard maxTilt={tilt} glare={!isMobile}>
              <div className={`${STEP_BOX} border-2 border-[#C6A75E]/30 bg-[#2C1A12]`}>
                <img src="/images/museum/solusi/karya-kriya.webp" alt="Panel ukir kayu dan kain batik tulis" loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-90" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />
                <span className={`${STEP_LABEL} text-[#E8D5A3]/90`} style={{ fontFamily: "var(--font-inter)" }}>1 · Karya</span>
              </div>
            </TiltCard>
          </div>

          <StepArrow />

          {/* 2. Sertifikat — sertifikat terbaru, live dari MajaCraft */}
          <div className="sm:w-44 md:w-48">
            <Holographic intensity={0.15}>
              <TiltCard maxTilt={tilt} glare={!isMobile} glareOpacity={0.2}>
                <a
                  href={cert ? `/sertifikat/?id=${cert.id}` : "/sertifikat/"}
                  className={`${STEP_BOX} flex flex-col items-center justify-center gap-1.5 sm:gap-3 px-1.5 sm:px-3`}
                  style={{
                    background: "linear-gradient(160deg, #1A1008 0%, #2C1A12 55%, #0F3B2E 100%)",
                    border: "2px solid rgba(198,167,94,0.5)",
                    boxShadow: "0 0 40px rgba(198,167,94,0.15), inset 0 0 40px rgba(198,167,94,0.05)",
                  }}
                >
                  <img
                    src={cert?.thumb ?? "/images/museum/solusi/sertifikat-maja.jpg"}
                    alt={cert ? `Sertifikat ${cert.productName}` : "Contoh sertifikat kepemilikan MAJA"}
                    loading="lazy"
                    className="w-full aspect-[3/2] object-cover rounded-[2px] shadow-[0_6px_20px_rgba(0,0,0,0.5)]"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/museum/solusi/sertifikat-maja.jpg"; }}
                  />
                  {cert && (
                    <div className="text-center w-full pb-4 sm:pb-5">
                      <p className="text-[#F5EBDD]/85 text-[10px] sm:text-sm leading-tight line-clamp-2 capitalize" style={{ fontFamily: "var(--font-cormorant)" }}>
                        {cert.productName.toLowerCase()}
                      </p>
                      <p className="hidden sm:block text-[#C6A75E]/60 text-[9px] md:text-[10px] mt-1 tracking-wider font-mono truncate">{cert.id}</p>
                    </div>
                  )}
                  <span className={`${STEP_LABEL} text-[#C6A75E]/80`} style={{ fontFamily: "var(--font-inter)" }}>2 · Sertifikat</span>
                </a>
              </TiltCard>
            </Holographic>
          </div>

          <StepArrow />

          {/* 3. Diperiksa */}
          <div className="sm:w-44 md:w-48">
            <TiltCard maxTilt={tilt} glare={!isMobile}>
              <div className={`${STEP_BOX} border-2 border-[#C6A75E]/30 bg-[#2C1A12]`}>
                <img src="/images/museum/solusi/verifikasi-qr.webp" alt="Memindai QR sertifikat pada vas keramik" loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-90" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />
                <span className={`${STEP_LABEL} text-[#E8D5A3]/90`} style={{ fontFamily: "var(--font-inter)" }}>3 · Diperiksa</span>
              </div>
            </TiltCard>
          </div>
        </motion.div>

        {/* Angka live */}
        <p className="text-sm sm:text-base text-[#F5EBDD]/60 mb-6 sm:mb-8 text-center min-h-[1.5em]" style={{ fontFamily: "var(--font-cormorant)" }}>
          {total !== null && (
            <>
              <span className="text-[#E8C878] text-lg sm:text-xl font-semibold">{total}</span> karya telah tercatat di blockchain
              {cert && <span className="hidden sm:inline"> · terbaru: {cert.store}</span>}
            </>
          )}
        </p>

        {/* Kartu fitur */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-6xl w-full">
          {solutions.map((s, i) => (
            <FadeIn key={s.title} direction="up" delay={0.5 + i * 0.15} duration={0.6} className="h-full">
              <SpotlightCard
                className="border border-[#C6A75E]/20 bg-[#1A1008]/60 backdrop-blur-sm hover:border-[#C6A75E]/50 transition-all duration-500 hover:bg-[#2C1A12]/60 h-full"
                spotlightColor="rgba(198, 167, 94, 0.1)"
              >
                <div className="p-4 sm:p-5 md:p-6 text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full border border-[#C6A75E]/25 bg-[#C6A75E]/[0.06] flex items-center justify-center">
                    {s.icon}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#C6A75E] mb-1 sm:mb-2 tracking-wide" style={{ fontFamily: "var(--font-philosopher)" }}>
                    {s.title}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-[#F5EBDD]/55 leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {s.desc}
                  </p>
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>

        {/* CTA — ajukan sertifikat di MajaCraft */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a href={`${MAJACRAFT}/certified`} target="_blank" rel="noopener"
            className="px-6 sm:px-10 py-3 border-2 border-[#C6A75E]/60 text-[#C6A75E] rounded-xl tracking-widest uppercase text-xs sm:text-sm hover:bg-[#C6A75E]/10 transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}>
            Ajukan Sertifikat
          </a>
          <Link href="/sertifikat/"
            className="px-6 sm:px-10 py-3 border border-[#C6A75E]/30 text-[#F5EBDD]/70 rounded-xl tracking-widest uppercase text-xs sm:text-sm hover:border-[#C6A75E]/60 transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}>
            Cek Sertifikat
          </Link>
        </motion.div>
        <p className="mt-3 mb-24 sm:mb-0 text-[11px] sm:text-xs text-[#F5EBDD]/40 max-w-xl text-center" style={{ fontFamily: "var(--font-inter)" }}>
          MAJA Certified mencatat kepemilikan sah atas karya orisinal — bukan penilaian keaslian maupun nilai karya.
        </p>
      </div>
    </section>
  );
}
