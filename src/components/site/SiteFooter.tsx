import Link from "next/link";
import React from "react";

const MC = "https://majacraft.id";

const ekosistem = [
  { label: "MajaCraft", href: MC },
  { label: "MAJA Certified", href: `${MC}/certified` },
  { label: "Cek Sertifikat", href: "/sertifikat/", internal: true },
  { label: "Ruang Budaya", href: `${MC}/ruang-budaya` },
  { label: "Bergabung", href: `${MC}/karir` },
];

const informasi = [
  { label: "Syarat Penggunaan", href: "/syarat/", internal: true },
  { label: "Kebijakan Privasi", href: "/privasi/", internal: true },
  { label: "Tentang MajaCraft", href: `${MC}/tentang` },
  { label: "Kontak", href: `${MC}/kontak` },
  { label: "Pusat Bantuan", href: `${MC}/bantuan` },
];

const sosial = [
  {
    label: "Instagram", href: "https://www.instagram.com/majacraft.id/",
    icon: <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01" />,
  },
  {
    label: "TikTok", href: "https://www.tiktok.com/@majacraft.id",
    icon: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2.3 4.2 5 4.5" />,
  },
  {
    label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591981286814",
    icon: <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3.5h2V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15V3Z" />,
  },
  {
    label: "YouTube", href: "https://www.youtube.com/@MajaCraft",
    icon: <path d="M3 8.5C3 6.6 4.6 5 6.5 5h11C19.4 5 21 6.6 21 8.5v7c0 1.9-1.6 3.5-3.5 3.5h-11A3.5 3.5 0 0 1 3 15.5v-7ZM10 9v6l5-3-5-3Z" />,
  },
];

type L = { label: string; href: string; internal?: boolean };

function FLink({ l }: { l: L }) {
  const cls = "text-sm text-[#F5EBDD]/60 hover:text-[#E8C878] transition-colors";
  return l.internal
    ? <Link href={l.href} className={cls}>{l.label}</Link>
    : <a href={l.href} target="_blank" rel="noopener" className={cls}>{l.label}</a>;
}

function Col({ title, links }: { title: string; links: L[] }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#C6A75E]/80 mb-3" style={{ fontFamily: "var(--font-cinzel)" }}>{title}</p>
      <ul className="space-y-2">{links.map((l) => <li key={l.label}><FLink l={l} /></li>)}</ul>
    </div>
  );
}

/** Footer situs: identitas pengelola, tautan ekosistem, legal, dan media sosial */
export default function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`relative bg-[#0A0806] border-t border-[#C6A75E]/15 ${className}`} style={{ fontFamily: "var(--font-inter)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-28 sm:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-6 gap-y-10">
          {/* Identitas */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/museum/branding/themaja-logo-600.png" alt="Logo The MAJA" loading="lazy" className="h-10 w-auto" />
              <span className="text-[#C6A75E] tracking-[0.35em] text-sm" style={{ fontFamily: "var(--font-cinzel)" }}>THE MAJA</span>
            </Link>
            <p className="mt-4 text-sm text-[#F5EBDD]/60 leading-relaxed max-w-xs">
              Rumah ekosistem seni &amp; kerajinan Nusantara — karya dijual dengan adil, kepemilikannya tercatat, kisahnya sampai ke dunia.
            </p>
            <div className="mt-5 text-xs text-[#F5EBDD]/45 space-y-1">
              <p>Dikelola oleh <span className="text-[#F5EBDD]/75">PT BSE Group Teknologi</span></p>
              <p>Nomor AHU <span className="font-mono">AHU-000405.AH.01.30.2024</span></p>
              <p>NIB <span className="font-mono">0807240028155</span></p>
              <p>Jatipasar, Trowulan, Mojokerto, Jawa Timur</p>
            </div>
          </div>

          <Col title="Ekosistem" links={ekosistem} />
          <Col title="Informasi" links={informasi} />

          {/* Media sosial */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C6A75E]/80 mb-3" style={{ fontFamily: "var(--font-cinzel)" }}>Ikuti Kami</p>
            <div className="flex gap-2.5">
              {sosial.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-[#C6A75E]/25 flex items-center justify-center text-[#C6A75E]/80 hover:text-[#E8C878] hover:border-[#C6A75E]/70 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </a>
              ))}
            </div>
            <p className="mt-3 text-sm text-[#F5EBDD]/50">@majacraft.id</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#C6A75E]/10 flex flex-col sm:flex-row gap-2 justify-between text-xs text-[#F5EBDD]/40">
          <p>© {new Date().getFullYear()} The MAJA · PT BSE Group Teknologi. Hak cipta dilindungi.</p>
          <p>Induk ekosistem MajaCraft &amp; MAJA Certified</p>
        </div>
      </div>
    </footer>
  );
}
