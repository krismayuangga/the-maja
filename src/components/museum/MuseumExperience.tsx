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
        const totalScroll = window.innerWidth * (ROOM_COUNT - 1);

        gsap.to(wrapper, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => `+=${totalScroll}`,
            snap: {
              snapTo: 1 / (ROOM_COUNT - 1),
              duration: { min: 0.2, max: 0.8 },
              delay: 0.1,
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

  // === MOBILE LAYOUT: Vertical scroll-snap ===
  if (isMobile) {
    return (
      <>
        {/* CinematicOpening overlays on top of museum */}
        {!introComplete && (
          <CinematicOpening onComplete={handleIntroComplete} />
        )}
        {introComplete && (
          <MuseumNav
            rooms={ROOM_NAMES}
            activeRoom={activeRoom}
            onNavigate={navigateToRoom}
            isMobile={true}
          />
        )}
        <div
          ref={containerRef}
          className="mobile-snap-container"
          style={!introComplete ? { overflow: "hidden", touchAction: "none" } : undefined}
        >
          <RoomSejarah />
          <RoomMasalah />
          <RoomSolusi />
          <RoomNusantara />
          <RoomEkonomi />
          <RoomMasaDepan />
        </div>
      </>
    );
  }

  // === DESKTOP LAYOUT: Horizontal scroll with snap ===
  return (
    <>
      {/* CinematicOpening overlays on top of museum */}
      {!introComplete && (
        <CinematicOpening onComplete={handleIntroComplete} />
      )}
      {introComplete && (
        <MuseumNav
          rooms={ROOM_NAMES}
          activeRoom={activeRoom}
          onNavigate={navigateToRoom}
          isMobile={false}
        />
      )}
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex"
          style={{ width: `${ROOM_COUNT * 100}vw`, height: "100vh" }}
        >
          <RoomSejarah />
          <RoomMasalah />
          <RoomSolusi />
          <RoomNusantara />
          <RoomEkonomi />
          <RoomMasaDepan />
        </div>
      </div>
    </>
  );
}
