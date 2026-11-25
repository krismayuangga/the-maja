import Link from "next/link";
import React from "react";
import SiteFooter from "@/components/site/SiteFooter";

export type LegalSection = { title: string; body: React.ReactNode };

/** Kerangka halaman legal themaja.com (Syarat Penggunaan, Kebijakan Privasi) */
export default function LegalPage({ title, updated, intro, sections }: {
  title: string; updated: string; intro: React.ReactNode; sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-[#0D0A06] text-[#F5EBDD]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <header className="flex items-center justify-between py-5 border-b border-[#C6A75E]/15">
          <Link href="/" className="flex items-center gap-2 text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/museum/branding/themaja-logo-600.png" alt="Logo The MAJA" className="h-8 w-auto" />
            <span className="tracking-[0.25em] text-sm whitespace-nowrap">THE MAJA</span>
          </Link>
          <nav className="flex gap-3 sm:gap-4 text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase text-[#F5EBDD]/60" style={{ fontFamily: "var(--font-inter)" }}>
            <Link href="/" className="hover:text-[#C6A75E]">Beranda</Link>
            <Link href="/syarat/" className="hover:text-[#C6A75E]">Syarat</Link>
            <Link href="/privasi/" className="hover:text-[#C6A75E]">Privasi</Link>
          </nav>
        </header>

        <main className="py-10 sm:py-14" style={{ fontFamily: "var(--font-inter)" }}>
          <h1 className="text-3xl sm:text-4xl text-[#C6A75E] mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>{title}</h1>
          <p className="text-sm text-[#F5EBDD]/45 mb-8">Terakhir diperbarui: {updated}</p>
          <div className="text-[15px] leading-7 text-[#F5EBDD]/80 mb-10 space-y-3">{intro}</div>

          <div className="space-y-9">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg text-[#E8C878] mb-3" style={{ fontFamily: "var(--font-philosopher)" }}>{s.title}</h2>
                <div className="text-[15px] leading-7 text-[#F5EBDD]/70 space-y-3 [&_a]:text-[#E8C878] [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
