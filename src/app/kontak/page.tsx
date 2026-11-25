import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi The MAJA — email, WhatsApp, dan alamat. Untuk kemitraan, media, seniman, maupun bantuan pesanan MajaCraft.",
  alternates: { canonical: "https://themaja.com/kontak/" },
};

const MC = "https://majacraft.id";

const channels = [
  { title: "Umum, Kemitraan & Media", desc: "Kolaborasi, kerja sama institusi, liputan, dan pertanyaan seputar MAJA.", label: "halo@themaja.com", href: "mailto:halo@themaja.com" },
  { title: "Seniman & Pengrajin", desc: "Bergabung sebagai seniman, membuka toko, atau program kemitraan seniman.", label: "seniman@majacraft.id", href: "mailto:seniman@majacraft.id" },
  { title: "Bantuan Pesanan & Akun", desc: "Pesanan, pembayaran, pengiriman, dan akun di MajaCraft.", label: "support@majacraft.id", href: "mailto:support@majacraft.id", extra: { label: "Pusat Bantuan MajaCraft →", href: `${MC}/bantuan` } },
  { title: "Data Pribadi", desc: "Pertanyaan atau permintaan terkait data pribadi di layanan MajaCraft & MAJA Certified.", label: "privasi@majacraft.id", href: "mailto:privasi@majacraft.id" },
];

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-[#0D0A06] text-[#F5EBDD]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SiteHeader />

        <main className="py-12 sm:py-16" style={{ fontFamily: "var(--font-inter)" }}>
          <section className="text-center mb-10 sm:mb-12">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#C6A75E]/60 mb-3" style={{ fontFamily: "var(--font-philosopher)" }}>Kontak</p>
            <h1 className="text-3xl sm:text-5xl text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>Hubungi Kami</h1>
            <p className="mt-4 text-lg sm:text-xl text-[#F5EBDD]/70" style={{ fontFamily: "var(--font-cormorant)" }}>
              Pilih jalur yang paling sesuai agar pesan Anda sampai ke tim yang tepat.
            </p>
          </section>

          <div className="grid sm:grid-cols-2 gap-4">
            {channels.map((c) => (
              <div key={c.title} className="p-5 rounded-xl border border-[#C6A75E]/20 bg-[#1A1008]/60">
                <p className="text-lg text-[#C6A75E]" style={{ fontFamily: "var(--font-philosopher)" }}>{c.title}</p>
                <p className="mt-1.5 text-sm leading-6 text-[#F5EBDD]/60">{c.desc}</p>
                <a href={c.href} className="mt-3 inline-block text-[15px] text-[#E8D5A3] underline underline-offset-4 decoration-[#C6A75E]/40 hover:text-[#E8C878] break-all">{c.label}</a>
                {c.extra && (
                  <a href={c.extra.href} target="_blank" rel="noopener" className="block mt-2 text-xs tracking-wider uppercase text-[#C6A75E]/80 hover:text-[#E8C878]">{c.extra.label}</a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <a href="https://wa.me/6285280002089" target="_blank" rel="noopener"
              className="p-5 rounded-xl border border-[#C6A75E]/40 bg-[#C6A75E]/10 hover:bg-[#C6A75E]/15 transition-colors">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/70">WhatsApp</p>
              <p className="mt-1 text-xl text-[#E8D5A3]">+62 852-8000-2089</p>
              <p className="mt-1 text-sm text-[#F5EBDD]/60">Kirim pesan langsung →</p>
            </a>
            <div className="p-5 rounded-xl border border-[#C6A75E]/20 bg-[#1A1008]/60">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/70">Alamat</p>
              <p className="mt-1 text-[15px] leading-7 text-[#F5EBDD]/80">
                PT BSE Group Teknologi<br />Jatipasar, Trowulan, Mojokerto<br />Jawa Timur, Indonesia
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs text-center text-[#F5EBDD]/40">
            Halaman ini tidak memakai formulir — pesan Anda langsung masuk ke email atau WhatsApp kami.
          </p>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
