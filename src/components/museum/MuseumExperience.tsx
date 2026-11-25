"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Preloader from "@/components/museum/Preloader";
import RoomSejarah from "@/components/museum/RoomSejarah";
import RoomMasalah from "@/components/museum/RoomMasalah";
import RoomSolusi from "@/components/museum/RoomSolusi";
import RoomNusantara from "@/components/museum/RoomNusantara";
import RoomEkosistem from "@/components/museum/RoomEkosistem";
import RoomMasaDepan from "@/components/museum/RoomMasaDepan";
import SiteFooter from "@/components/site/SiteFooter";
import MuseumNav from "@/components/museum/MuseumNav";
import useIsMobile from "@/hooks/useIsMobile";

const ROOM_NAMES = [
  "Sejarah",
  "Masalah",
  "Ekosistem",
  "Certified",
  "Nusantara",
  "Visi",
];

export default function MuseumExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const isMobile = useIsMobile();

  const handleLoadingComplete = useCallback(() => {
    setLoadingComplete(true);
  }, []);
  // Tanpa animasi pintu: museum langsung tampil setelah preloader selesai
  const introComplete = loadingComplete;


  // === Scroll vertikal biasa: lacak ruang aktif via IntersectionObserver ===
  useEffect(() => {
    if (!introComplete) return;
    const container = containerRef.current;
    if (!container) return;
    const rooms = Array.from(container.querySelectorAll<HTMLElement>(":scope > .room"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = rooms.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActiveRoom(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" } // ruang yang melewati tengah layar = aktif
    );
    rooms.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [introComplete, isMobile]);

  // === NAVIGASI: klik dot nav → scroll halus ke ruang ===
  const navigateToRoom = useCallback(
    (index: number) => {
      if (!introComplete) return;
      const room = containerRef.current?.querySelectorAll<HTMLElement>(":scope > .room")[index];
      room?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [introComplete]
  );

  if (!loadingComplete) {
    return <Preloader onComplete={handleLoadingComplete} />;
  }

  // === Satu layout: ruang-ruang tersusun vertikal, scroll normal halaman ===
  return (
    <>
      {introComplete && (
        <MuseumNav
          rooms={ROOM_NAMES}
          activeRoom={activeRoom}
          onNavigate={navigateToRoom}
          isMobile={isMobile}
        />
      )}
      <div ref={containerRef} className="museum-vertical">
        <RoomSejarah />
        <RoomMasalah />
        <RoomEkosistem />
        <RoomSolusi />
        <RoomNusantara />
        <RoomMasaDepan />
      </div>
      {/* Footer di luar daftar ruang → tidak memengaruhi navigasi ruang; sisi kiri diberi ruang untuk menu samping */}
      <div className="sm:pl-44 lg:pl-48 bg-[#0A0806]">
        <SiteFooter />
      </div>
    </>
  );
}
