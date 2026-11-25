import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi themaja.com — situs ini tidak meminta data pribadi, tanpa akun, formulir, cookie, maupun pelacak.",
  alternates: { canonical: "https://themaja.com/privasi/" },
};

const MC = "https://majacraft.id";

export default function PrivasiPage() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      updated="25 November 2026"
      intro={
        <>
          <p>
            Kebijakan ini menjelaskan bagaimana <strong>themaja.com</strong> memperlakukan informasi pengunjung. Pengendali data
            untuk situs ini adalah <strong>PT BSE Group Teknologi</strong> (NIB <span className="font-mono">0807240028155</span>),
            Jatipasar, Trowulan, Mojokerto, Jawa Timur.
          </p>
          <p className="text-[#E8D5A3]">
            Ringkasnya: themaja.com tidak meminta data pribadi Anda. Situs ini tidak memiliki akun, formulir pendaftaran,
            cookie, analitik, maupun pelacak iklan.
          </p>
        </>
      }
      sections={[
        {
          title: "1. Data yang Tidak Kami Kumpulkan",
          body: (
            <ul>
              <li>Tidak ada pendaftaran akun, login, atau formulir yang meminta nama, email, atau nomor telepon.</li>
              <li>Tidak ada cookie, Google Analytics, piksel iklan, atau alat pelacak sejenis.</li>
              <li>Tidak ada data yang disimpan di perangkat Anda (local storage) oleh situs ini.</li>
            </ul>
          ),
        },
        {
          title: "2. Catatan Teknis Server",
          body: (
            <p>
              Seperti umumnya situs web, server penyedia hosting kami secara otomatis mencatat data teknis kunjungan, seperti
              alamat IP, jenis peramban, halaman yang diminta, dan waktu akses. Catatan ini digunakan hanya untuk menjaga keamanan
              dan kelancaran situs, tidak digunakan untuk mengenali Anda secara pribadi, dan tidak dijual atau dibagikan untuk
              kepentingan pemasaran.
            </p>
          ),
        },
        {
          title: "3. Konten yang Dimuat dari MajaCraft",
          body: (
            <p>
              Karya, angka statistik, dan sertifikat yang tampil di situs ini dimuat langsung dari server MajaCraft (majacraft.id).
              Saat halaman dibuka, peramban Anda menghubungi server tersebut sehingga MajaCraft menerima data teknis yang sama
              (seperti alamat IP). Data ini diperlakukan sesuai{" "}
              <a href={`${MC}/privasi`} target="_blank" rel="noopener">Kebijakan Privasi MajaCraft</a>.
            </p>
          ),
        },
        {
          title: "4. Pencarian Sertifikat",
          body: (
            <p>
              Kata kunci yang Anda ketik di kolom cek sertifikat (ID sertifikat atau nama karya) dikirim ke MajaCraft hanya untuk
              menampilkan hasil pencarian, dan tidak dikaitkan dengan identitas Anda.
            </p>
          ),
        },
        {
          title: "5. Layanan dengan Data Pribadi",
          body: (
            <p>
              Jika Anda berbelanja, berjualan, atau mengajukan sertifikat MAJA Certified, proses tersebut berlangsung di MajaCraft
              dan tunduk pada <a href={`${MC}/privasi`} target="_blank" rel="noopener">Kebijakan Privasi MajaCraft</a>, yang
              menjelaskan data apa yang dikumpulkan dan hak Anda atas data tersebut.
            </p>
          ),
        },
        {
          title: "6. Hak Anda & Kontak",
          body: (
            <p>
              Sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda dapat mengajukan pertanyaan atau
              permintaan terkait data pribadi ke <a href="mailto:halo@themaja.com">halo@themaja.com</a>. Untuk data pribadi di layanan MajaCraft, hubungi <a href="mailto:privasi@majacraft.id">privasi@majacraft.id</a>.
            </p>
          ),
        },
        {
          title: "7. Perubahan Kebijakan",
          body: (
            <p>
              Jika kelak themaja.com menambahkan fitur yang mengumpulkan data (misalnya formulir atau analitik), kebijakan ini akan
              diperbarui sebelum fitur tersebut berlaku. Versi terbaru selalu tersedia di halaman ini.
            </p>
          ),
        },
      ]}
    />
  );
}
