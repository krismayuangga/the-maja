🏛 MAJA DIGITAL MUSEUM
“Uniting Nusantara Through Creativity”
1️⃣ CORE CONCEPT

Website bukan halaman scroll biasa.

Website adalah:

Sebuah museum digital imersif yang membawa pengunjung menjelajahi perjalanan budaya Nusantara menuju ekonomi kreatif berbasis blockchain.

User tidak “scroll membaca”.

User “berjalan menjelajah”.

Navigasi utama = horizontal scroll cinematic.

2️⃣ USER EXPERIENCE FLOW (STEP BY STEP)
🎬 0. CINEMATIC OPENING (5–8 detik)
Tampilan:

Layar hitam

Sound ambience gamelan halus

Partikel debu emas pelan muncul

Text Fade In:

Dulu Nusantara disatukan oleh Sumpah Palapa.
Hari ini Nusantara disatukan oleh kreativitas.

Fade → pintu museum terbuka perlahan.

Masuk ke ruang utama.

3️⃣ STRUKTUR RUANG MUSEUM

Website dibagi menjadi 6 RUANG (sections horizontal).

Struktur DOM bisa seperti ini:

<body>
  <div class="museum-wrapper">
     <section class="room room-1"></section>
     <section class="room room-2"></section>
     <section class="room room-3"></section>
     <section class="room room-4"></section>
     <section class="room room-5"></section>
     <section class="room room-6"></section>
  </div>
</body>

Wrapper width = 600vw
Each room = 100vw

Scrolling vertikal → translateX horizontal (GSAP ScrollTrigger).

4️⃣ DETAIL TIAP RUANG
🏛 ROOM 1 – RUANG SEJARAH (Foundation Room)
Visual:

Relief batu Majapahit (3D texture)

Warm lighting (golden amber)

Ornamen ukiran halus di dinding

Elemen:

Center:
Judul besar:

MAJA
Creative Economy of Nusantara

Subtext:

Gajah Mada mempersatukan Nusantara melalui kekuasaan.
MAJA mempersatukan Nusantara melalui kreativitas.

Animasi:

Kamera slow pan

Partikel debu emas

Relief sedikit parallax

Tech:

Background 3D via Three.js atau baked 3D PNG depth parallax

Lighting effect pakai shader ringan

🎭 ROOM 2 – RUANG MASALAH (The Broken Gallery)
Konsep:

Galeri kosong.
Frame retak.
Lampu redup.

Visual:

Lukisan tanpa isi

Frame retak

Bayangan seniman bekerja sendirian

Teks muncul per layer:

“70% margin hilang ke perantara.”
“Seniman takut tidak dibayar.”
“Kolektor takut karya palsu.”

Animasi:

Setiap scroll sedikit → frame retak lebih jelas.

Tone warna:
Desaturated, dingin.

💡 ROOM 3 – RUANG SOLUSI (The Innovation Chamber)

Kontras total dari Room 2.

Visual:

Ruangan terang

NFT certificate hologram

Barang fisik + NFT menyatu

Elemen utama:

Animasi:
Lukisan fisik → berubah jadi NFT hologram → kembali jadi fisik + NFT linked.

Teks:

MAJA Marketplace
Hybrid Physical & Digital Commerce

Bullet animasi masuk:
• NFT Certificate
• On-chain Provenance
• Smart Escrow
• Logistics Trigger

🌏 ROOM 4 – RUANG NUSANTARA (Interactive Map)

Ini highlight utama.

Visual:

Peta Indonesia stylized 3D minimal.

User hover:
Pulau menyala.

Klik:
Popup karya dari daerah tersebut.

Contoh:
Jawa → Batik
Bali → Ukiran
Papua → Seni Kayu

Tech:

SVG map dengan interactive highlight
atau Three.js 3D map ringan

💰 ROOM 5 – RUANG EKONOMI (Tokenomics Hall)

Konsep seperti ruang instalasi seni modern.

Visual:

Lingkaran besar floating (token supply)

Node jaringan glowing

Flow animasi fee → buyback → burn

Animasi loop:

Marketplace Fee → Treasury
Marketplace Fee → Buyback
Buyback → Burn

Visual harus subtle, tidak terlalu crypto neon.

🚀 ROOM 6 – RUANG MASA DEPAN (Vision Room)

Konsep:
Langit digital Nusantara.

Background:
Silhouette pulau-pulau dengan cahaya menyambung seperti jaringan.

Text center:

MAJA is not a token.
It is the Creative Infrastructure of Nusantara.

Button:
Enter Marketplace
Read Whitepaper
Join Community

5️⃣ NAVIGATION SYSTEM

Tidak pakai navbar biasa.

Gunakan:

Floating minimal indicator di kiri:

● Sejarah
● Masalah
● Solusi
● Nusantara
● Ekonomi
● Masa Depan

Klik → smooth scroll ke room.

6️⃣ VISUAL STYLE GUIDE
🎨 Color Palette

Primary:

Deep Brown (#2C1A12)

Antique Gold (#C6A75E)

Ivory (#F5EBDD)

Accent:

Dark Emerald (#0F3B2E)

Charcoal (#1A1A1A)

Jangan pakai neon crypto.

🔠 Typography

Heading:
Serif klasik elegan (Playfair / Cinzel / Cormorant)

Body:
Modern clean (Inter / Lato)

Mix klasik + modern = heritage + future.

7️⃣ TECH STACK RECOMMENDATION

Frontend:
Next.js (App Router)
TailwindCSS
GSAP + ScrollTrigger
Framer Motion (micro animation)
Three.js (light usage only)

Optimization:
Lazy load 3D assets
Compress textures
Avoid heavy real-time lighting

8️⃣ PERFORMANCE STRATEGY

Karena banyak animasi:

• Gunakan Lottie untuk animasi ringan
• Gunakan WebP untuk tekstur
• Gunakan reduced-motion mode untuk mobile
• Disable heavy 3D di mobile

Mobile version bisa lebih sederhana:
Vertical scroll + simplified visuals.

9️⃣ UX PSYCHOLOGY

Room 1 → Authority
Room 2 → Pain
Room 3 → Relief
Room 4 → Belonging
Room 5 → Logic
Room 6 → Vision

Itu alur persuasi lengkap.

🔥 LEVEL DIFFERENSIASI

99% crypto website:
Hero + Tokenomics + Roadmap.

MAJA:
Cultural Digital Experience.

Ini positioning level nasional.

1️⃣0️⃣ OPTIONAL EXTREME VERSION

Kalau mau lebih gila:

Tambahkan:
Ambient sound toggle
Subtle gamelan background
Cursor custom (ornamen kecil)
Transition seperti membuka pintu kayu

🚨 PENTING

Jangan terlalu ramai.
Elegan.
Slow.
Berwibawa.
Seperti masuk museum premium.