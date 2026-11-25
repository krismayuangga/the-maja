import Link from "next/link";
import React from "react";

/** Header halaman pendukung (Tentang, Kontak, legal) */
export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-3 py-5 border-b border-[#C6A75E]/15">
      <Link href="/" className="flex items-center gap-2 text-[#C6A75E] shrink-0" style={{ fontFamily: "var(--font-cinzel)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/museum/branding/themaja-logo-600.png" alt="Logo The MAJA" className="h-8 w-auto" />
        <span className="tracking-[0.25em] text-sm whitespace-nowrap">THE MAJA</span>
      </Link>
      <nav className="flex gap-3 sm:gap-5 text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase text-[#F5EBDD]/60" style={{ fontFamily: "var(--font-inter)" }}>
        <Link href="/" className="hover:text-[#C6A75E]">Beranda</Link>
        <Link href="/tentang/" className="hover:text-[#C6A75E]">Tentang</Link>
        <Link href="/kontak/" className="hover:text-[#C6A75E]">Kontak</Link>
      </nav>
    </header>
  );
}
