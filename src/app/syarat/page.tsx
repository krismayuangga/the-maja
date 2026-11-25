import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Syarat Penggunaan",
  description: "Syarat penggunaan situs themaja.com — situs informasi ekosistem seni & kerajinan Nusantara MAJA yang dikelola PT BSE Group Teknologi.",
  alternates: { canonical: "https://themaja.com/syarat/" },
};

const MC = "https://majacraft.id";

export default function SyaratPage() {
  return (
    <LegalPage
      title="Syarat Penggunaan"
      updated="25 November 2026"
      intro={
        <>
          <p>
            Syarat ini mengatur penggunaan situs <strong>themaja.com</strong>, situs informasi ekosistem seni &amp; kerajinan
            Nusantara <strong>The MAJA</strong> yang dikelola oleh <strong>PT BSE Group Teknologi</strong>
            (NIB <span className="font-mono">0807240028155</span>).
          </p>
          <p>Dengan mengakses themaja.com, Anda dianggap telah membaca dan menyetujui syarat berikut.</p>
        </>
      }
      sections={[
        {
          title: "1. Tentang Situs Ini",
          body: (
            <p>
              themaja.com adalah situs informasi yang memperkenalkan ekosistem MAJA: marketplace MajaCraft, sertifikat kepemilikan
              MAJA Certified, Ruang Budaya, dan program komunitas. <strong>Tidak ada transaksi jual beli, pembayaran, maupun
              pendaftaran akun di situs ini.</strong>
            </p>
          ),
        },
        {
          title: "2. Layanan Terkait",
          body: (
            <>
              <p>Saat Anda mengikuti tautan ke layanan berikut, yang berlaku adalah ketentuan layanan tersebut:</p>
              <ul>
                <li>Jual beli karya dan pengajuan sertifikat MAJA Certified tunduk pada <a href={`${MC}/syarat`} target="_blank" rel="noopener">Syarat &amp; Ketentuan MajaCraft</a>.</li>
                <li>Pengolahan data pribadi di layanan tersebut tunduk pada <a href={`${MC}/privasi`} target="_blank" rel="noopener">Kebijakan Privasi MajaCraft</a>.</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Data yang Ditampilkan",
          body: (
            <p>
              Karya, harga, angka statistik, peta sebaran, dan sertifikat yang tampil di themaja.com diambil langsung dari sistem
              MajaCraft dan dapat berubah sewaktu-waktu. Keterangan karya (nama, bahan, ukuran, asal daerah) diisi oleh
              masing-masing seniman. Harga dan ketersediaan yang berlaku adalah yang tertera di MajaCraft saat transaksi.
            </p>
          ),
        },
        {
          title: "4. Sifat Sertifikat MAJA Certified",
          body: (
            <p>
              Sertifikat MAJA Certified <strong>mencatat kepemilikan</strong> atas sebuah karya beserta riwayat perpindahannya di
              blockchain. Sertifikat ini <strong>bukan</strong> penilaian keaslian, bukan taksiran nilai, dan bukan produk
              investasi.
            </p>
          ),
        },
        {
          title: "5. Hak Kekayaan Intelektual",
          body: (
            <ul>
              <li>Nama dan logo The MAJA, MajaCraft, dan MAJA Certified, serta desain dan teks situs ini, adalah milik PT BSE Group Teknologi.</li>
              <li>Foto dan karya seni yang ditampilkan tetap menjadi hak masing-masing seniman.</li>
              <li>Konten situs ini tidak boleh disalin, diubah, atau digunakan untuk kepentingan komersial tanpa izin tertulis.</li>
            </ul>
          ),
        },
        {
          title: "6. Tautan ke Situs Lain",
          body: (
            <p>
              Situs ini memuat tautan ke situs lain, seperti MajaCraft, penjelajah blockchain, dan media sosial. Kami tidak
              bertanggung jawab atas isi maupun kebijakan situs pihak lain tersebut.
            </p>
          ),
        },
        {
          title: "7. Batasan Tanggung Jawab",
          body: (
            <p>
              Informasi di themaja.com disediakan sebagaimana adanya. Kami berupaya menjaga ketepatannya, namun tidak menjamin
              situs selalu bebas dari kesalahan atau gangguan. PT BSE Group Teknologi tidak bertanggung jawab atas kerugian yang
              timbul dari penggunaan informasi di situs ini.
            </p>
          ),
        },
        {
          title: "8. Hukum yang Berlaku & Perubahan",
          body: (
            <p>
              Syarat ini tunduk pada hukum Republik Indonesia. Kami dapat memperbarui syarat ini sewaktu-waktu; versi terbaru
              selalu tersedia di halaman ini beserta tanggal pembaruannya.
            </p>
          ),
        },
        {
          title: "9. Kontak",
          body: (
            <p>
              PT BSE Group Teknologi — Jatipasar, Trowulan, Mojokerto, Jawa Timur.<br />
              Email: <a href="mailto:halo@themaja.com">halo@themaja.com</a> · WhatsApp:{" "}
              <a href="https://wa.me/6285280002089" target="_blank" rel="noopener">+62 852-8000-2089</a>
            </p>
          ),
        },
      ]}
    />
  );
}
