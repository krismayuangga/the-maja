# The MAJA — Rumah Ekosistem Seni & Kerajinan Nusantara

**[themaja.com](https://themaja.com)** adalah situs induk **Ekosistem MAJA**, yang dikembangkan dan dikelola oleh
**PT BSE Group Teknologi**. Situs ini memperkenalkan seluruh unit ekosistem dan menampilkan **data live** dari
platform MajaCraft.

| Unit | Fungsi | Tautan |
|---|---|---|
| **MajaCraft** | Marketplace karya seniman & pengrajin Nusantara, pembayaran melalui payment gateway resmi (Midtrans) | [majacraft.id](https://majacraft.id) |
| **MAJA Certified** | Sertifikat **kepemilikan** karya yang tercatat di BNB Smart Chain dan dapat diperiksa siapa pun | [majacraft.id/certified](https://majacraft.id/certified) |
| **Ruang Budaya** | Kisah di balik karya, profil pengrajin, liputan tradisi | [majacraft.id/ruang-budaya](https://majacraft.id/ruang-budaya) |
| **Komunitas MAJA** | Duta Daerah, Program Kampus, Kontributor | [majacraft.id/karir](https://majacraft.id/karir) |

> MAJA Certified mencatat kepemilikan sah atas karya orisinal — **bukan** penilaian keaslian, taksiran nilai,
> maupun produk investasi.

---

## Isi Situs

Halaman utama berupa enam ruang yang digulir vertikal:

1. **Sejarah** — identitas MAJA: "Dari Sabang sampai Merauke, setiap karya seni dan kriya menyimpan tangan, waktu, dan cerita."
2. **Masalah** — empat tantangan pengrajin (harga adil, rasa aman, kepemilikan, jangkauan pasar) beserta jawaban MAJA.
3. **Ekosistem** — siklus Dijual → Tercatat → Diceritakan → Tumbuh, dengan angka live dan animasi alur.
4. **Certified** — alur Karya → Sertifikat → Diperiksa memakai satu karya nyata, plus pencarian sertifikat.
5. **Nusantara** — peta hidup sebaran seniman per provinsi, filter provinsi & kategori, dan galeri bola berisi seluruh karya aktif.
6. **Visi** — arah ekosistem ke depan.

Halaman pendukung: `/sertifikat` (cek & arsip sertifikat), `/tentang`, `/kontak`, `/syarat`, `/privasi`.

### Data live
Situs ini statis, tetapi membaca API publik MajaCraft (CORS diizinkan untuk themaja.com):

- `GET /api/stats/public` — jumlah karya, seniman, provinsi, sertifikat, sebaran per provinsi, artikel terbaru
- `GET /api/products` — daftar karya aktif (galeri Nusantara)
- `GET /api/certificate` — daftar & detail sertifikat

Situs **tidak** memakai akun, formulir, cookie, maupun analitik.

---

## Riwayat Pengembangan

| Waktu | Tahap |
|---|---|
| Juni 2025 | Gagasan MAJA; repositori & landing page pertama |
| Februari 2026 | **MAJA Digital Museum** tayang di themaja.com — museum digital interaktif seni & budaya Nusantara |
| Juli 2026 | Peluncuran marketplace **MajaCraft** |
| Agustus 2026 | Sertifikat **MAJA Certified** pertama terbit di BNB Smart Chain |
| November 2026 | themaja.com dibangun ulang menjadi **induk ekosistem** dengan data live |

---

## Teknologi

Next.js 15 (App Router, static export) · React 18 · TypeScript · Tailwind CSS 4 · Framer Motion

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npx next build     # hasil statis di folder out/
```

Hasil `out/` diunggah ke hosting statis (Apache/LiteSpeed) bersama `.htaccess` untuk rute dan cache.

## Struktur Singkat

```
src/app/                 halaman (beranda, sertifikat, tentang, kontak, syarat, privasi)
src/components/museum/   enam ruang halaman utama + navigasi
src/components/site/     header, footer, halaman legal, angka live
src/components/ui/       efek teks, kartu, galeri bola
public/images/           aset gambar (webp)
```

---

© 2025–2026 PT BSE Group Teknologi · [themaja.com](https://themaja.com) · halo@themaja.com
