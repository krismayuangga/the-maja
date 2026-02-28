"use client";

import React from "react";
import dynamic from "next/dynamic";
import useIsMobile from "@/hooks/useIsMobile";

/* Dynamic import — DomeGallery uses DOM APIs, no SSR */
const DomeGallery = dynamic(
  () => import("@/components/ui/DomeGallery"),
  { ssr: false }
);

/* Nusantara art images for the dome */
const domeImages = [
  { src: "/images/museum/nusantara/ulos-sumatera.webp", alt: "Ulos — Sumatera" },
  { src: "/images/museum/nusantara/batik-jawa.webp", alt: "Batik — Jawa" },
  { src: "/images/museum/nusantara/ukiran-bali.webp", alt: "Ukiran — Bali" },
  { src: "/images/museum/nusantara/seni-dayak.webp", alt: "Seni Dayak — Kalimantan" },
  { src: "/images/museum/nusantara/toraja-sulawesi.webp", alt: "Toraja — Sulawesi" },
  { src: "/images/museum/nusantara/noken-papua.webp", alt: "Noken — Papua" },
];

export default function RoomDomeGallery() {
  const isMobile = useIsMobile();

  return (
    <section className="room flex items-center justify-center room-vignette relative">
      {/* Dark background matching museum theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0A06] via-[#140E08] to-[#1A110B]" />

      {/* Dome Gallery — full room */}
      <div className="absolute inset-0 z-10">
        <DomeGallery
          images={domeImages}
          fit={isMobile ? 0.9 : 0.8}
          minRadius={isMobile ? 350 : 600}
          maxVerticalRotationDeg={0}
          segments={isMobile ? 20 : 34}
          dragDampening={2}
          grayscale={false}
          overlayBlurColor="#0D0A06"
          imageBorderRadius="8px"
          openedImageBorderRadius="12px"
          openedImageWidth={isMobile ? "280px" : "400px"}
          openedImageHeight={isMobile ? "380px" : "500px"}
        />
      </div>

      {/* Title overlay */}
      <div className="absolute top-6 sm:top-10 left-0 right-0 z-20 text-center pointer-events-none">
        <span
          className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-[#C6A75E]/40 block mb-1"
          style={{ fontFamily: "var(--font-philosopher)" }}
        >
          Dome Gallery
        </span>
        <h2
          className="text-xl sm:text-2xl md:text-4xl font-bold text-[#C6A75E]/60 text-glow-gold"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Nusantara
        </h2>
      </div>
    </section>
  );
}
