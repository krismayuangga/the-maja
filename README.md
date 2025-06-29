# $MAJA (Majapahit Heritage Token) Landing Page

Landing page modern, profesional, dan informatif untuk proyek $MAJA (Majapahit Heritage Token) dengan nuansa visual Majapahit, animasi interaktif, slider, tokenomics chart, dan desain modular. Dibangun dengan Next.js, Tailwind CSS, dan Framer Motion.

## Fitur Utama
- Nuansa visual Majapahit/Jawa yang kuat
- Slider banner otomatis di Hero Section
- Tokenomics interaktif (pie chart, tooltip, info singkat)
- Section About, Feature, Token Utility, Marketplace Preview, Roadmap, Team, Community
- Animasi Framer Motion di berbagai elemen
- Modular, responsif, dan mudah dikembangkan

## Instalasi & Pengembangan

### 1. Clone Repository

```
git clone https://github.com/krismayuangga/the-maja.git
cd the-maja
```

### 2. Install Dependencies

```
npm install
```

### 3. Jalankan Development Server

```
npm run dev
```

Akses di [http://localhost:3000](http://localhost:3000)

### 4. Build untuk Produksi

```
npm run build
npm start
```

### 5. Struktur Folder Penting

- `src/components/` — Semua komponen section modular
- `public/images/` — Gambar, ornamen, pattern, NFT, dsb
- `src/app/page.tsx` — Entry point landing page
- `src/fonts.ts` & `src/fonts-bhutuka.ts` — Font custom

### 6. Customisasi
- Ganti gambar di `public/images/` sesuai kebutuhan
- Edit copywriting di masing-masing komponen section
- Ubah tokenomics di `TokenomicsSection.tsx`

### 7. Deployment
- Bisa deploy ke Vercel, Netlify, atau server Next.js lain
- Pastikan variabel lingkungan (jika ada) sudah diatur

## Stack
- Next.js 14+
- Tailwind CSS
- Framer Motion
- Recharts (untuk chart)

## Kontribusi
Pull request & issue sangat diterima!

## Lisensi
MIT

---

**Tim $MAJA**
