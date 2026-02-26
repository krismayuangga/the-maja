"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/museum/Preloader";
import CinematicOpening from "@/components/museum/CinematicOpening";
import RoomSejarah from "@/components/museum/RoomSejarah";
import RoomMasalah from "@/components/museum/RoomMasalah";
import RoomSolusi from "@/components/museum/RoomSolusi";
import RoomNusantara from "@/components/museum/RoomNusantara";
import RoomEkonomi from "@/components/museum/RoomEkonomi";
import RoomMasaDepan from "@/components/museum/RoomMasaDepan";
import RoomTransition from "@/components/museum/RoomTransition";
import AmbientSound from "@/components/museum/AmbientSound";
import CustomCursor from "@/components/museum/CustomCursor";
import MuseumNav from "@/components/museum/MuseumNav";
import useIsMobile from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const ROOM_NAMES = [
  "Sejarah",
  "Masalah",
  "Solusi",
  "Nusantara",
  "Ekonomi",
  "Masa Depan",
];

const ROOM_COUNT = ROOM_NAMES.length;

export default function MuseumExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const isMobile = useIsMobile();

  const handleLoadingComplete = useCallback(() => {
    setLoadingComplete(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // === DESKTOP: Horizontal scroll via GSAP with precise SNAP ===
  useEffect(() => {
    if (!introComplete || isMobile) return;

    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    // Wait for layout to settle
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Each room is exactly 100vw, total width = ROOM_COUNT * 100vw
        // We scroll (ROOM_COUNT - 1) screens worth
        const totalScroll = window.innerWidth * (ROOM_COUNT - 1);

        gsap.to(wrapper, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 0.3,
            end: () => `+=${totalScroll}`,
            snap: {
              // Snap to exact room positions: 0, 0.2, 0.4, 0.6, 0.8, 1.0
              snapTo: 1 / (ROOM_COUNT - 1),
              duration: { min: 0.2, max: 0.5 },
              delay: 0,
              ease: "power1.inOut",
            },
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const idx = Math.min(
                Math.round(progress * (ROOM_COUNT - 1)),
                ROOM_COUNT - 1
              );
              setActiveRoom(idx);
            },
          },
        });
      }, container);

      return () => ctx.revert();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [introComplete, isMobile]);

  // === MOBILE: Track active room via scroll event on snap container ===
  useEffect(() => {
    if (!introComplete || !isMobile) return;

    const mobileContainer = containerRef.current;
    if (!mobileContainer) return;

    const handleScroll = () => {
      const scrollTop = mobileContainer.scrollTop;
      const viewportH = mobileContainer.clientHeight;
      const idx = Math.round(scrollTop / viewportH);
      setActiveRoom(Math.min(Math.max(idx, 0), ROOM_COUNT - 1));
    };

    mobileContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => mobileContainer.removeEventListener("scroll", handleScroll);
  }, [introComplete, isMobile]);

  // === NAVIGASI: Klik dot nav ===
  const navigateToRoom = useCallback(
    (index: number) => {
      if (!introComplete) return;

      if (isMobile) {
        // Mobile: scroll snap container to room
        const mobileContainer = containerRef.current;
        if (!mobileContainer) return;
        const targetTop = index * mobileContainer.clientHeight;
        mobileContainer.scrollTo({ top: targetTop, behavior: "smooth" });
      } else {
        // Desktop: calculate exact scroll position
        const totalScroll = window.innerWidth * (ROOM_COUNT - 1);
        const fraction = index / (ROOM_COUNT - 1);
        const scrollTarget = fraction * totalScroll;

        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });
      }
    },
    [introComplete, isMobile]
  );

  if (!loadingComplete) {
    return <Preloader onComplete={handleLoadingComplete} />;
  }

  if (!introComplete) {
    return <CinematicOpening onComplete={handleIntroComplete} />;
  }

  // === MOBILE LAYOUT: Vertical scroll-snap, no doors ===
  if (isMobile) {
    return (
      <>
        <AmbientSound />
        <MuseumNav
          rooms={ROOM_NAMES}
          activeRoom={activeRoom}
          onNavigate={navigateToRoom}
          isMobile={true}
        />
        <div
          ref={containerRef}
          className="mobile-snap-container"
        >
          <RoomTransition index={0}><RoomSejarah /></RoomTransition>
          <RoomTransition index={1}><RoomMasalah /></RoomTransition>
          <RoomTransition index={2}><RoomSolusi /></RoomTransition>
          <RoomTransition index={3}><RoomNusantara /></RoomTransition>
          <RoomTransition index={4}><RoomEkonomi /></RoomTransition>
          <RoomTransition index={5}><RoomMasaDepan /></RoomTransition>
        </div>
      </>
    );
  }

  // === DESKTOP LAYOUT: Horizontal scroll with snap ===
  return (
    <>
      <CustomCursor />
      <AmbientSound />
      <MuseumNav
        rooms={ROOM_NAMES}
        activeRoom={activeRoom}
        onNavigate={navigateToRoom}
        isMobile={false}
      />
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex"
          style={{ width: `${ROOM_COUNT * 100}vw`, height: "100vh" }}
        >
          <RoomTransition index={0}><RoomSejarah /></RoomTransition>
          <RoomTransition index={1}><RoomMasalah /></RoomTransition>
          <RoomTransition index={2}><RoomSolusi /></RoomTransition>
          <RoomTransition index={3}><RoomNusantara /></RoomTransition>
          <RoomTransition index={4}><RoomEkonomi /></RoomTransition>
          <RoomTransition index={5}><RoomMasaDepan /></RoomTransition>
        </div>
      </div>
    </>
  );
}
