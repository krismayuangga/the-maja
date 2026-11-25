import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import LiveStats from "@/components/site/LiveStats";

export const metadata: Metadata = {
  title: "Tentang MAJA",
  description: "The MAJA — rumah ekosistem seni & kerajinan Nusantara: MajaCraft, MAJA Certified, Ruang Budaya, dan Komunitas MAJA. Didirikan oleh BSE Group Teknologi.",
  alternates: { canonical: "https://themaja.com/tentang/" },
};

const MC = "https://majacraft.id";

const units = [
  { tag: "Marketplace", name: "MajaCraft", desc: "Tempat seniman dan pengrajin menjual karya langsung ke pembeli, dengan pembayaran aman melalui payment gateway resmi.", href: MC, cta: "Kunjungi MajaCraft" },
  { tag: "Sertifikasi", name: "MAJA Certified", desc: "Sertifikat kepemilikan yang tercatat di blockchain dan dapat diperiksa siapa pun, termasuk untuk karya yang dijual di luar MajaCraft.", href: `${MC}/certified`, cta: "Ajukan sertifikat" },
  { tag: "Budaya", name: "Ruang Budaya", desc: "Kisah di balik karya, profil pengrajin, dan liputan tradisi dari seluruh Nusantara.", href: `${MC}/ruang-budaya`, cta: "Baca kisahnya" },
  { tag: "Komunitas", name: "Komunitas MAJA", desc: "Duta Daerah, Program Kampus, dan Kontributor yang menghadirkan pengrajin baru dari daerah.", href: `${MC}/karir`, cta: "Bergabung" },
];

const misi = [
  "Membuka pasar yang adil bagi seniman dan pengrajin daerah — ke seluruh Indonesia, dan ke depan pasar internasional.",
  "Mencatat kepemilikan karya secara terbuka sehingga dapat diperiksa siapa pun.",
  "Merawat dan menceritakan kisah di balik setiap karya Nusantara.",
  "Menumbuhkan komunitas yang melahirkan pengrajin baru dari daerah.",
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl sm:text-2xl text-[#C6A75E] mb-4" style={{ fontFamily: "var(--font-cinzel)" }}>{children}</h2>;
}

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-[#0D0A06] text-[#F5EBDD]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SiteHeader />

        <main className="py-12 sm:py-16 space-y-14 sm:space-y-16" style={{ fontFamily: "var(--font-inter)" }}>
          {/* Pembuka */}
          <section className="text-center">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#C6A75E]/60 mb-3" style={{ fontFamily: "var(--font-philosopher)" }}>Tentang MAJA</p>
            <h1 className="text-3xl sm:text-5xl text-[#C6A75E] leading-tight text-balance" style={{ fontFamily: "var(--font-cinzel)" }}>
              Rumah Ekosistem Seni &amp; Kerajinan Nusantara
            </h1>
            <p className="mt-5 text-lg sm:text-2xl text-[#F5EBDD]/75 max-w-2xl mx-auto text-balance leading-snug" style={{ fontFamily: "var(--font-cormorant)" }}>
              Tempat karya dijual dengan adil, kepemilikannya tercatat, dan kisahnya sampai ke dunia.
            </p>
          </section>

          {/* Siapa kami */}
          <section className="text-[15px] sm:text-base leading-8 text-[#F5EBDD]/75 space-y-4">
            <H2>Siapa Kami</H2>
            <p>
              <strong className="text-[#F5EBDD]">The MAJA</strong> adalah induk dari ekosistem yang mempertemukan seniman,
              pengrajin, dan pecinta karya Nusantara. Kami percaya setiap karya seni dan kriya menyimpan tangan, waktu, dan
              cerita — dan pembuatnya layak mendapat pasar yang adil serta pengakuan yang tercatat.
            </p>
            <p>
              MAJA berakar di <strong className="text-[#F5EBDD]">Trowulan, Mojokerto</strong> — bekas pusat Kerajaan
              Majapahit. Gagasannya lahir pada <strong className="text-[#F5EBDD]">2025</strong>, dan situs pertamanya mulai
              dibangun pada <strong className="text-[#F5EBDD]">Juni 2025</strong>.
            </p>
          </section>

          {/* Angka */}
          <section>
            <LiveStats />
            <p className="mt-3 text-xs text-center text-[#F5EBDD]/40">Angka diperbarui otomatis dari MajaCraft.</p>
          </section>

          {/* Visi misi */}
          <section className="grid sm:grid-cols-[1fr_1.3fr] gap-8">
            <div>
              <H2>Visi</H2>
              <p className="text-xl sm:text-2xl text-[#E8D5A3] leading-snug" style={{ fontFamily: "var(--font-cormorant)" }}>
                Menjadi rumah bagi ekosistem seni dan kerajinan Nusantara, dengan pengrajin sebagai pusatnya.
              </p>
            </div>
            <div>
              <H2>Misi</H2>
              <ol className="space-y-3">
                {misi.map((m, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-7 text-[#F5EBDD]/75">
                    <span className="text-[#C6A75E] font-semibold" style={{ fontFamily: "var(--font-cinzel)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Ekosistem */}
          <section>
            <H2>Ekosistem MAJA</H2>
            <div className="grid sm:grid-cols-2 gap-4">
              {units.map((u) => (
                <a key={u.name} href={u.href} target="_blank" rel="noopener"
                  className="group block p-5 rounded-xl border border-[#C6A75E]/20 bg-[#1A1008]/60 hover:border-[#C6A75E]/60 transition-colors">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/60">{u.tag}</p>
                  <p className="mt-1 text-lg text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>{u.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[#F5EBDD]/65">{u.desc}</p>
                  <p className="mt-3 text-xs tracking-widest uppercase text-[#E8C878]/80 group-hover:text-[#E8C878]">{u.cta} →</p>
                </a>
              ))}
            </div>
          </section>

          {/* Pendiri & legalitas */}
          <section className="grid sm:grid-cols-2 gap-8">
            <div className="text-[15px] leading-7 text-[#F5EBDD]/75">
              <H2>Didirikan oleh BSE Group</H2>
              <p>
                MAJA didirikan dan dikelola oleh <strong className="text-[#F5EBDD]">PT BSE Group Teknologi</strong>, perusahaan
                teknologi Indonesia yang berpengalaman lebih dari 10 tahun di pengembangan perangkat lunak, blockchain, dan
                keamanan siber. Pengalaman inilah yang menjadi fondasi teknologi MajaCraft dan MAJA Certified.
              </p>
              <a href="https://bsegroup.co.id" target="_blank" rel="noopener" className="inline-block mt-3 text-sm text-[#E8C878] underline underline-offset-4">bsegroup.co.id →</a>
            </div>
            <div>
              <H2>Legalitas</H2>
              <dl className="text-sm divide-y divide-[#C6A75E]/10 border-y border-[#C6A75E]/10">
                {[
                  ["Badan usaha", "PT BSE Group Teknologi"],
                  ["Nomor AHU", "AHU-000405.AH.01.30.2024"],
                  ["NIB (OSS)", "0807240028155"],
                  ["Tanda Daftar PSE MajaCraft", "20260711-NE0SH"],
                  ["Alamat", "Jatipasar, Trowulan, Mojokerto, Jawa Timur"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-[#F5EBDD]/50">{k}</dt>
                    <dd className={`text-right text-[#F5EBDD]/85 ${/\d/.test(v) && k !== "Alamat" ? "font-mono text-xs sm:text-sm" : ""}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Penutup */}
          <section className="text-center border-t border-[#C6A75E]/15 pt-10">
            <p className="text-lg text-[#F5EBDD]/75" style={{ fontFamily: "var(--font-cormorant)" }}>Ingin berkolaborasi atau punya pertanyaan?</p>
            <Link href="/kontak/" className="inline-block mt-4 px-8 py-3 rounded-xl border-2 border-[#C6A75E]/60 text-[#C6A75E] text-xs sm:text-sm tracking-widest uppercase hover:bg-[#C6A75E]/10" style={{ fontFamily: "var(--font-cinzel)" }}>
              Hubungi Kami
            </Link>
          </section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
