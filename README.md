# MAJA — Digital Museum Experience

> **Creative Economy Infrastructure of Nusantara**
> Menyatukan Nusantara Melalui Kreativitas.

Website interaktif berbentuk **Digital Museum** untuk proyek MAJA — menampilkan sejarah, visi, tokenomics, dan masa depan ekonomi kreatif Nusantara melalui pengalaman sinematik horizontal-scroll. Dibangun dengan Next.js 15, Tailwind CSS 4, Framer Motion, dan GSAP.

---

## ✨ Fitur Utama

- **Museum Experience** — 6 ruangan interaktif dengan horizontal scroll (desktop) / vertical scroll (mobile)
- **Cinematic Opening** — Preloader + animasi pembuka sinematik sebelum memasuki museum
- **Room Sejarah** — Sejarah Majapahit dengan parallax & visual storytelling
- **Room Masalah** — Masalah ekonomi kreatif Indonesia dengan data & statistik
- **Room Solusi** — Solusi MAJA untuk ekosistem kreatif
- **Room Nusantara** — Circular gallery & peta budaya Nusantara
- **Room Ekonomi** — Tokenomics Hall: donut chart interaktif, token allocation, revenue engine, smart contract info, roadmap, dan video rotating MAJA Token
- **Room Masa Depan** — Vision Room: typewriter animation filosofi, 5 visi numbered grid, CTA buttons
- **Responsive** — Fully responsive untuk desktop, tablet, dan mobile
- **Custom Animations** — SplitText, BlurText, FadeIn, Magnetic, ParticleField, SpotlightCard, GlowBorder, CountUp
- **GSAP ScrollTrigger** — Horizontal snap scrolling pada desktop
- **Custom Fonts** — Cinzel, Cormorant Garamond, Philosopher, Inter (via Google Fonts)
- **SEO Ready** — Open Graph, metadata, structured data

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.3.4 | React framework (App Router, Static Export) |
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **Framer Motion** | 12.x | React animations & transitions |
| **GSAP** | 3.14.x | ScrollTrigger horizontal scroll & advanced animations |
| **@gsap/react** | 2.1.x | GSAP React integration |
| **OGL** | 1.0.x | WebGL (circular gallery) |
| **Recharts** | 3.0.x | Charts (jika dibutuhkan) |
| **Sharp** | 0.34.x | Image optimization (dev) |
| **ESLint** | 9.x | Linting |

---

## 📋 Prerequisites

Pastikan sudah terinstall di sistem (Windows / macOS / Linux):

- **Node.js** — versi **18.17** atau lebih baru (disarankan **20 LTS** atau **22 LTS**)
  - Download: [https://nodejs.org/](https://nodejs.org/)
  - Verifikasi: `node -v`
- **npm** — sudah termasuk bersama Node.js (versi 9+)
  - Verifikasi: `npm -v`
- **Git** — untuk clone & version control
  - Download: [https://git-scm.com/](https://git-scm.com/)
  - Verifikasi: `git --version`

### Opsional

- **pnpm** atau **yarn** — bisa digunakan sebagai alternatif npm
- **VS Code** — editor yang disarankan dengan extension:
  - ESLint
  - Tailwind CSS IntelliSense
  - TypeScript Nightly

---

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/krismayuangga/the-maja.git
cd the-maja
```

### 2. Install Dependencies

```bash
# Menggunakan npm
npm install

# ATAU menggunakan pnpm
pnpm install

# ATAU menggunakan yarn
yarn install
```

> **Catatan untuk macOS (Apple Silicon M1/M2/M3):**
> Jika ada error saat install `sharp`, jalankan:
> ```bash
> npm install --platform=darwin --arch=arm64 sharp
> ```

> **Catatan untuk Windows:**
> Jika ada error terkait `node-gyp`, install build tools:
> ```bash
> npm install -g windows-build-tools
> ```
> Atau install Visual Studio Build Tools dari [https://visualstudio.microsoft.com/visual-cpp-build-tools/](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

### 3. Jalankan Development Server

```bash
npm run dev
```

Akses di [http://localhost:3000](http://localhost:3000)

> Dev server menggunakan **Turbopack** untuk fast refresh.

### 4. Build untuk Produksi (Static Export)

```bash
npm run build
```

Output static di folder `out/` — bisa di-deploy ke hosting statis manapun.

Untuk preview build lokal:

```bash
npm start
```

### 5. Lint

```bash
npm run lint
```

---

## 📁 Struktur Proyek

```
the-maja/
├── public/
│   ├── images/
│   │   └── museum/
│   │       ├── branding/        # Logo, video token (Maja Token.mp4)
│   │       ├── ekonomi/         # Asset room ekonomi
│   │       ├── masa-depan/      # Asset room masa depan
│   │       ├── masalah/         # Asset room masalah
│   │       ├── nusantara/       # Asset room nusantara
│   │       ├── opening/         # Asset cinematic opening
│   │       ├── sejarah/         # Asset room sejarah
│   │       └── solusi/          # Asset room solusi
│   └── sound/                   # Audio files
├── src/
│   ├── fonts.ts                 # Google Fonts config (Cinzel, Cormorant, Inter, Philosopher)
│   ├── app/
│   │   ├── globals.css          # Global styles & Tailwind imports
│   │   ├── layout.tsx           # Root layout dengan metadata SEO
│   │   └── page.tsx             # Entry point → MuseumExperience
│   ├── components/
│   │   ├── museum/
│   │   │   ├── MuseumExperience.tsx   # Orchestrator utama (GSAP horizontal scroll)
│   │   │   ├── MuseumNav.tsx          # Navigasi samping kiri
│   │   │   ├── Preloader.tsx          # Loading screen
│   │   │   ├── CinematicOpening.tsx   # Animasi pembuka
│   │   │   ├── RoomSejarah.tsx        # Room 1 — Sejarah Majapahit
│   │   │   ├── RoomMasalah.tsx        # Room 2 — Masalah Ekonomi Kreatif
│   │   │   ├── RoomSolusi.tsx         # Room 3 — Solusi MAJA
│   │   │   ├── RoomNusantara.tsx      # Room 4 — Budaya Nusantara
│   │   │   ├── RoomEkonomi.tsx        # Room 5 — Tokenomics Hall
│   │   │   └── RoomMasaDepan.tsx      # Room 6 — Vision Room
│   │   └── ui/
│   │       ├── CardEffects.tsx        # SpotlightCard, ParticleField, GlowBorder, CountUp
│   │       ├── CircularGallery.tsx    # WebGL circular gallery (OGL)
│   │       ├── CircularGallery.css
│   │       └── TextEffects.tsx        # SplitText, BlurText, FadeIn, Magnetic
│   └── hooks/
│       ├── useIsMobile.ts             # Mobile detection hook
│       └── useParallax.ts             # Parallax effect hook
├── scripts/
│   ├── generate-og-image.js           # OG image generator
│   └── optimize-images.mjs            # Image optimization script
├── docs/
│   └── IMAGE_ASSETS_GUIDE.md          # Panduan asset gambar
├── next.config.ts                     # Next.js config (static export)
├── tailwind.config.js                 # Tailwind custom colors & fonts
├── tsconfig.json                      # TypeScript config
├── eslint.config.mjs                  # ESLint config
├── postcss.config.mjs                 # PostCSS config
└── package.json
```

---

## 🎨 Design System

### Warna Utama

| Token | Hex | Penggunaan |
|---|---|---|
| Antique Gold | `#C6A75E` | Aksen utama, heading, border |
| Deep Brown | `#1A1008` | Background utama |
| Ivory/Cream | `#F5EBDD` | Teks body |
| Dark Emerald | `#0F3B2E` | Aksen hijau |
| Gold Light | `#D4B978` | Highlight sekunder |

### Font

| Font | CSS Variable | Penggunaan |
|---|---|---|
| Cinzel | `--font-cinzel` | Heading, judul ruangan, display |
| Cormorant Garamond | `--font-cormorant` | Deskripsi, sub-heading |
| Philosopher | `--font-philosopher` | Label, kategori |
| Inter | `--font-inter` | Body text, data, UI |

---

## 🏛️ Museum Rooms Overview

| # | Room | Component | Deskripsi |
|---|---|---|---|
| 1 | Sejarah | `RoomSejarah` | Kisah kejayaan Majapahit & warisan budaya |
| 2 | Masalah | `RoomMasalah` | Data masalah ekonomi kreatif Indonesia |
| 3 | Solusi | `RoomSolusi` | Solusi infrastruktur MAJA |
| 4 | Nusantara | `RoomNusantara` | Circular gallery budaya nusantara |
| 5 | Ekonomi | `RoomEkonomi` | Tokenomics: donut chart, allocation, revenue, smart contract (BSC/BEP-20), roadmap |
| 6 | Masa Depan | `RoomMasaDepan` | Visi: typewriter quote, 5 target visi, CTA |

---

## 📱 Responsive Behavior

- **Desktop** — Horizontal scroll (GSAP ScrollTrigger snap) antar ruangan
- **Mobile** — Vertical scroll biasa, semua ruangan tersusun vertikal
- Breakpoint utama: `sm` (640px), `md` (768px), `lg` (1024px)
- Deteksi mobile via custom hook `useIsMobile`

---

## 🔧 Troubleshooting

### `npm install` gagal

```bash
# Hapus cache & node_modules, lalu install ulang
rm -rf node_modules package-lock.json
npm install
```

Di Windows (PowerShell):
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Error `sharp` di macOS

```bash
npm install --platform=darwin --arch=arm64 sharp
```

### Port 3000 sudah dipakai

```bash
npm run dev -- -p 3001
```

### Video tidak muncul di RoomEkonomi

Pastikan file `public/images/museum/branding/Maja Token.mp4` ada. Video ini autoplay, loop, muted untuk rotating token coin di tengah donut chart.

### GSAP horizontal scroll tidak jalan

Pastikan browser window cukup lebar (≥640px). Di mobile, otomatis switch ke vertical scroll.

---

## 🚢 Deployment

Project dikonfigurasi sebagai **static export** (`output: "export"` di `next.config.ts`).

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
1. Build command: `npm run build`
2. Publish directory: `out`

### Static Hosting (Nginx, Apache, dll)
```bash
npm run build
# Upload isi folder 'out/' ke server
```

### GitHub Pages
```bash
npm run build
# Deploy folder 'out/' ke gh-pages branch
```

---

## 📝 Smart Contract Info

| Field | Value |
|---|---|
| Network | BSC (BNB Chain) |
| Standard | BEP-20 |
| Decimals | 18 |
| Total Supply | 5,248 MAJA |
| Max Supply | 5,248 MAJA |
| Mintable | No |

---

## 🤝 Kontribusi

Pull request & issue sangat diterima! Silakan fork repo ini dan buat PR.

## 📄 Lisensi

MIT

---

**MAJA Team** — *Uniting Nusantara Through Creativity*
