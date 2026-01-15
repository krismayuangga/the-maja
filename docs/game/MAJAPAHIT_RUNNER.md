# 🏃 Majapahit Runner - Game Design Document

**Versi:** 1.1  
**Tanggal:** 15 Januari 2026  
**Last Updated:** 15 Januari 2026  
**Status:** Konsep / Pre-Development  
**Target Release:** Q1 2026 (sesuai Roadmap $MAJA)  
**Platform:** Web-Based (PWA)  
**Blockchain:** BSC (BNB Smart Chain)  
**Token:** $MAJA (BEP-20)

---

## 📖 Overview

### High Concept
Endless runner 2D side-scrolling dengan setting Kerajaan Majapahit. Pemain berperan sebagai kurir kerajaan yang harus menghindari rintangan sambil mengumpulkan koin dan mempelajari sejarah Majapahit.

### Storyline
**"Lari Sang Kurir Kerajaan"**

Kamu adalah **Jaya**, seorang kurir muda Kerajaan Majapahit. Suatu hari, kamu dipercaya membawa **pesan rahasia dari Gajah Mada** ke berbagai wilayah kerajaan. Dalam perjalanan, kamu harus menghindari rintangan, mengumpulkan koin emas, dan melewati berbagai landmark bersejarah Majapahit!

### Target Audience
- Casual gamers (semua umur)
- Pemain mobile Indonesia
- Pelajar yang ingin belajar sejarah dengan cara menyenangkan
- Komunitas $MAJA Token

---

## 🎮 Core Gameplay

### Mekanik Dasar

| Kontrol | Aksi |
|---------|------|
| **Tap/Swipe Up** | Lompat |
| **Swipe Down** | Slide/Merunduk |
| **Swipe Left/Right** | Pindah jalur (3 lanes) |
| **Double Tap** | Lompat tinggi |
| **Hold** | Glide (dengan power-up) |

### Sistem 3 Lane
```
┌─────────────────────────────────────┐
│  [Kiri]    [Tengah]    [Kanan]      │
│    🏃                               │
│  ═══════════════════════════════    │
│  Jalan utama kerajaan               │
└─────────────────────────────────────┘
```

### Game Loop
1. Pemain mulai berlari otomatis
2. Kecepatan meningkat seiring waktu
3. Hindari rintangan dengan swipe
4. Kumpulkan koin dan power-up
5. Ambil Lontar untuk unlock fakta sejarah
6. Game over saat menabrak rintangan
7. Bandingkan skor di leaderboard

---

## 🗺️ Environment/World Themes

### 5 Zone Berlatar Sejarah

| Zone | Nama | Deskripsi | Rintangan Unik | Unlock |
|------|------|-----------|----------------|--------|
| 1 | **Trowulan** | Ibukota kerajaan, jalanan bata merah | Pedagang, gerobak, pot tanah liat | Default |
| 2 | **Hutan Jati** | Hutan lebat menuju desa | Pohon tumbang, sungai, harimau | Level 10 |
| 3 | **Pelabuhan** | Dermaga ramai pedagang | Tali kapal, peti kargo, bajak laut | Level 20 |
| 4 | **Candi** | Area suci penuh candi | Tangga candi, patung, api ritual | Level 30 |
| 5 | **Gunung Bromo** | Jalur pegunungan vulkanik | Lava, batu jatuh, kabut tebal | Level 40 |

### Detail Environment

#### Zone 1: Trowulan (Ibukota)
- **Background**: Gapura kerajaan, rumah-rumah tradisional, pasar
- **Ground**: Bata merah khas Majapahit
- **Obstacles**: 
  - Gerobak pedagang (lompat)
  - Pot tanah liat (slide atau lompat)
  - Pedagang berjalan (pindah lane)
  - Kain tergantung (slide)
- **Ambience**: Ramai pasar, suara gamelan

#### Zone 2: Hutan Jati
- **Background**: Pohon jati tinggi, sinar matahari tembus daun
- **Ground**: Tanah dengan akar pohon
- **Obstacles**:
  - Pohon tumbang (slide atau lompat)
  - Sungai kecil (lompat)
  - Harimau (pindah lane cepat)
  - Cabang rendah (slide)
- **Ambience**: Suara burung, angin

#### Zone 3: Pelabuhan
- **Background**: Kapal-kapal Jung, dermaga kayu
- **Ground**: Papan kayu dermaga
- **Obstacles**:
  - Tali kapal (lompat)
  - Peti kargo (slide atau lompat)
  - Bajak laut (pindah lane)
  - Jaring ikan (slide)
- **Ambience**: Ombak, teriakan pelaut

#### Zone 4: Candi
- **Background**: Candi Penataran, relief-relief
- **Ground**: Batu candi
- **Obstacles**:
  - Tangga candi (timing jump)
  - Patung Dwarapala (pindah lane)
  - Api ritual (slide)
  - Batu runtuh (react cepat)
- **Ambience**: Lonceng kuil, mantra

#### Zone 5: Gunung Bromo
- **Background**: Pegunungan vulkanik, langit merah
- **Ground**: Batu vulkanik
- **Obstacles**:
  - Aliran lava (lompat jauh)
  - Batu jatuh (pindah lane)
  - Kabut tebal (blind section)
  - Retakan tanah (timing)
- **Ambience**: Gemuruh gunung, angin kencang

---

## 🎭 Karakter System

### Karakter Utama (Unlockable)

| ID | Karakter | Nama | Skill Pasif | Cara Unlock | Rarity |
|----|----------|------|-------------|-------------|--------|
| 1 | 🏃 | **Jaya** (Kurir) | Kecepatan +5% | Default | Common |
| 2 | ⚔️ | **Bhayangkara** (Prajurit) | Armor 1x hit | 5,000 koin | Common |
| 3 | 💃 | **Srikandi** (Penari) | Double jump | 10,000 koin | Rare |
| 4 | 🧙 | **Dang Hyang** (Pendeta) | Magnet koin | 15,000 koin | Rare |
| 5 | 👑 | **Hayam Wuruk** (Raja) | 2x multiplier | 25,000 koin | Epic |
| 6 | 🐘 | **Gajah Mada** (Patih) | Shield + Speed | $MAJA Premium | Legendary |

### Detail Skill Karakter

#### Jaya (Default)
- **Lore**: Kurir muda yang gesit dan berani
- **Passive**: Kecepatan dasar +5%
- **Visual**: Pakaian sederhana, ikat kepala

#### Bhayangkara
- **Lore**: Prajurit elit pengawal kerajaan
- **Passive**: Dapat menahan 1 tabrakan tanpa game over
- **Visual**: Armor ringan, membawa tombak

#### Srikandi
- **Lore**: Penari istana yang lincah
- **Passive**: Bisa double jump di udara
- **Visual**: Pakaian penari, selendang

#### Dang Hyang
- **Lore**: Pendeta sakti dengan kekuatan magis
- **Passive**: Magnet koin otomatis radius 2 lane
- **Visual**: Jubah putih, tongkat

#### Hayam Wuruk
- **Lore**: Raja Majapahit di masa kejayaan
- **Passive**: Semua skor x2 permanen
- **Visual**: Mahkota emas, jubah kerajaan

#### Gajah Mada (Premium)
- **Lore**: Patih legendaris penakluk Nusantara
- **Passive**: Shield setiap 500m + Speed +10%
- **Visual**: Armor emas, cape merah
- **Unlock**: Hold minimal 1000 $MAJA atau beli dengan token

### Kostum/Skin System

| Kategori | Contoh | Cara Dapat |
|----------|--------|------------|
| **Regional** | Pakaian Bali, Jawa, Sumatera | Koin |
| **Festival** | Edisi Galungan, Sekaten | Event seasonal |
| **Legendary** | Full Gold, Diamond | Achievement |
| **Kolaborasi** | (Future) | Partnership |

---

## 💎 Collectibles & Economy

### In-Game Currency

| Item | Ikon | Fungsi | Cara Dapat |
|------|------|--------|------------|
| **Koin Emas** | 🪙 | Currency utama | Gameplay |
| **Permata Merah** | 💎 | Premium currency | Achievement/IAP |

### Collectibles

| Item | Ikon | Fungsi |
|------|------|--------|
| **Lontar** | 📜 | Unlock fakta sejarah (50 total) |
| **Prasasti** | 🗿 | Achievement badge |

### Koin Economy Balance

| Item | Harga (Koin) |
|------|--------------|
| Revive (1x) | 500 |
| Karakter Common | 5,000 |
| Karakter Rare | 10,000-15,000 |
| Karakter Epic | 25,000 |
| Skin Common | 2,000 |
| Skin Rare | 5,000 |
| Power-up Starter | 200 |

---

## ⚡ Power-Up System

### Power-Ups (Durasi 10 detik)

| Power-Up | Ikon | Efek | Spawn Rate |
|----------|------|------|------------|
| **Keris Sakti** | 🗡️ | Hancurkan semua rintangan | 5% |
| **Kuda Terbang** | 🐴 | Terbang di atas rintangan | 5% |
| **Jimat Pelindung** | 🛡️ | Kebal 1x tabrakan | 10% |
| **Magnet Emas** | 🧲 | Tarik semua koin otomatis | 15% |
| **Super Speed** | ⚡ | Kecepatan 2x + skor 2x | 8% |

### Power-Up Upgrades (Permanent)

| Upgrade | Level 1 | Level 2 | Level 3 |
|---------|---------|---------|---------|
| Durasi | 10 detik | 12 detik | 15 detik |
| Efek | Normal | +25% | +50% |
| Harga | - | 3,000 | 8,000 |

---

## 📊 Progression System

### Level & XP

```
Level 1-10:   Kurir Pemula      → Unlock Zone 1-2
Level 11-25:  Kurir Mahir       → Unlock Zone 3
Level 26-40:  Duta Kerajaan     → Unlock Zone 4
Level 41-50:  Legenda Majapahit → Unlock Zone 5
```

### XP Requirements

| Level Range | XP per Level |
|-------------|--------------|
| 1-10 | 100 XP |
| 11-25 | 250 XP |
| 26-40 | 500 XP |
| 41-50 | 1,000 XP |

### XP Sources

| Action | XP |
|--------|-----|
| Per 100m lari | 10 XP |
| Per 100 koin | 5 XP |
| Complete daily mission | 50 XP |
| Collect Lontar | 25 XP |

---

## 🎯 Mission System

### Daily Missions (3 per hari, reset 00:00 WIB)

| Misi | Contoh | Reward |
|------|--------|--------|
| Jarak | Lari 1,000m total | 200 koin |
| Koin | Kumpulkan 500 koin | 100 koin |
| Rintangan | Hindari 50 rintangan | 150 koin |
| Power-up | Gunakan 3 power-up | 100 koin |
| Perfect Run | Revive 0 kali | 300 koin |

### Weekly Challenges (Reset Senin 00:00 WIB)

| Challenge | Target | Reward |
|-----------|--------|--------|
| Marathon | Total jarak 10 km | 1,000 koin + 5 💎 |
| Collector | Kumpulkan 10 Lontar | 500 koin |
| Explorer | Main semua zone | 800 koin |
| Versatile | Pakai 3 karakter berbeda | 600 koin |

### Achievement System

| Achievement | Kondisi | Reward |
|-------------|---------|--------|
| **First Steps** | Lari 100m pertama | 50 koin |
| **Speed Demon** | Capai 2,000m | 200 koin |
| **Collector** | Kumpulkan 10 Lontar | 💎 x3 |
| **Historian** | Kumpulkan 50 Lontar | Skin eksklusif |
| **Millionaire** | Kumpulkan 1M koin total | Prasasti emas |
| **Legend** | Capai Level 50 | Title + Badge |

---

## 🏆 Leaderboard System

### Papan Skor

| Kategori | Reset | Reward Top 10 |
|----------|-------|---------------|
| **High Score** | Permanen | Hall of Fame badge |
| **Jarak Terjauh** | Permanen | - |
| **Daily Run** | 24 jam | 500 koin |
| **Weekly Tournament** | 7 hari | 💎 x10 + Skin |
| **Monthly Championship** | 30 hari | $MAJA Token* |

*Jika token integration aktif

### Leaderboard Display
- Rank 1-3: Gold, Silver, Bronze badge
- Rank 4-10: Special frame
- Personal best highlight
- Friend leaderboard (jika ada social)

---

## 📚 Edukasi System

### Lontar Collection (50 Total)

Setiap 500 meter, muncul **Lontar terbang** yang bisa diambil.

### Kategori Lontar

#### Tokoh (15 Lontar)
1. Raden Wijaya - Pendiri Majapahit
2. Gajah Mada - Patih Amangkubhumi
3. Hayam Wuruk - Raja Terbesar
4. Tribhuwana Tunggadewi - Ratu Perkasa
5. Ken Arok - Pendahulu dari Singhasari
6. Ken Dedes - Ratu Legendaris
7. Adityawarman - Raja Sumatera
8. Jayanegara - Raja Kedua
9. Kertanegara - Raja Terakhir Singhasari
10. Raden Wijaya - Kisah Pelarian
11. Dang Hyang Nirartha - Pendeta Suci
12. Prapanca - Penulis Negarakertagama
13. Tantular - Penulis Sutasoma
14. Ratu Suhita - Ratu Wanita
15. Wikramawardhana - Raja Penerus

#### Tempat (15 Lontar)
1. Trowulan - Ibukota Kerajaan
2. Candi Penataran - Candi Terbesar
3. Candi Bajang Ratu - Gapura Megah
4. Candi Tikus - Pemandian Suci
5. Candi Brahu - Tempat Kremasi
6. Pelabuhan Tuban - Gerbang Perdagangan
7. Pelabuhan Gresik - Kota Pedagang
8. Gunung Penanggungan - Gunung Suci
9. Balai Sidang - Tempat Sumpah Palapa
10. Keraton Majapahit - Istana Raja
11. Kolam Segaran - Danau Buatan
12. Candi Jago - Candi Buddha
13. Candi Kidal - Candi Ken Arok
14. Pasarean - Makam Raja
15. Benteng Majapahit - Pertahanan

#### Peristiwa (10 Lontar)
1. Sumpah Palapa (1336)
2. Perang Bubat (1357)
3. Ekspedisi Pamalayu (1275)
4. Penaklukan Bali (1343)
5. Serangan Mongol (1293)
6. Berdirinya Majapahit (1293)
7. Masa Keemasan (1350-1389)
8. Perang Paregreg (1401-1406)
9. Runtuhnya Majapahit (1527)
10. Perjanjian dengan Tiongkok

#### Budaya (10 Lontar)
1. Negarakertagama - Kitab Sejarah
2. Sutasoma - Bhinneka Tunggal Ika
3. Pararaton - Kitab Raja-Raja
4. Wayang - Seni Pertunjukan
5. Gamelan - Musik Tradisional
6. Batik Majapahit - Corak Khas
7. Arsitektur Candi - Gaya Bangunan
8. Sistem Mandala - Pemerintahan
9. Agama Hindu-Buddha - Kepercayaan
10. Bahasa Kawi - Bahasa Sastra

### Lontar Display Format
```
┌──────────────────────────────────────┐
│  📜 LONTAR #7                        │
│  ─────────────────────────────       │
│  "Sumpah Palapa"                     │
│                                      │
│  Gajah Mada bersumpah tidak akan     │
│  makan palapa (rempah) sebelum       │
│  berhasil menyatukan Nusantara.      │
│  Sumpah ini diucapkan pada tahun     │
│  1336 di hadapan Ratu Tribhuwana.    │
│                                      │
│  [Koleksi: 7/50 Lontar]              │
└──────────────────────────────────────┘
```

---

## 🎨 Art Direction

### Visual Style
- **Art Style**: 2D Semi-realistik dengan sentuhan wayang
- **Perspective**: Side-scrolling dengan parallax
- **Color Palette**:
  - Primary: Coklat (#8B4513, #A0522D)
  - Secondary: Emas (#FFD700, #DAA520)
  - Accent: Merah bata (#B22222)
  - Background: Gradasi langit tropis

### Parallax Layers
```
Layer 4: Langit + Awan (0.1x speed)
Layer 3: Gunung + Candi jauh (0.3x speed)
Layer 2: Pohon + Bangunan (0.5x speed)
Layer 1: Dekorasi jalan (0.8x speed)
Layer 0: Ground + Character (1x speed)
```

### Character Sprites
- **Resolution**: 128x128 pixels
- **Animation Frames**:
  - Run cycle: 8 frames
  - Jump: 4 frames
  - Slide: 4 frames
  - Crash: 6 frames
  - Victory: 8 frames
  - Idle: 4 frames

### UI Style
- Frame: Ornamen Majapahit (ukiran)
- Buttons: Batu bata dengan relief
- Font: Serif tradisional
- Icons: Flat dengan outline emas

---

## 🔊 Audio Design

### Music
| Scene | Style | Tempo |
|-------|-------|-------|
| Menu | Gamelan ambient | Slow |
| Gameplay Zone 1-3 | Gamelan upbeat | Medium-Fast |
| Gameplay Zone 4-5 | Gamelan intense | Fast |
| Game Over | Melankolis | Slow |
| Victory | Triumphant gamelan | Medium |

### Sound Effects

| Action | Sound |
|--------|-------|
| Jump | "Whoosh" + kain berkibar |
| Slide | Gesekan tanah |
| Coin collect | "Kling" metalik |
| Power-up | Gong kecil |
| Crash | "Duk" + suara jatuh |
| Lontar collect | Suara kertas + bell |
| Lane change | Langkah kaki |
| Button tap | Ketukan kayu |

---

## 🔧 Technical Specification

### Game Engine
**Recommended: Phaser.js 3.x**

```javascript
// Konfigurasi dasar
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { 
      gravity: { y: 1000 },
      debug: false
    }
  },
  scene: [
    BootScene,
    PreloadScene,
    MenuScene,
    CharacterSelectScene,
    GameScene,
    PauseScene,
    GameOverScene,
    LeaderboardScene,
    ShopScene,
    LontarScene
  ]
};
```

### Target Platform
- 📱 **Mobile Web** (Primary) - PWA
- 💻 **Desktop Web** (Secondary)
- 📲 **Telegram Mini App** (Optional)

### Performance Target
- 60 FPS on mid-range mobile
- < 3 second initial load
- < 50MB total assets
- Offline capable (PWA)

### Browser Support
- Chrome 80+
- Safari 13+
- Firefox 75+
- Edge 80+

### Resolution
- Base: 800x600 (4:3)
- Responsive scaling untuk berbagai device
- Safe area untuk notch/rounded corners

---

## 💰 Monetization

### Free-to-Play Model

| Fitur | Free | Premium |
|-------|------|---------|
| Karakter dasar | ✅ 2 | ✅ Semua |
| Continue/Revive | Ads atau koin | Unlimited |
| Double Reward | ❌ | ✅ Permanent |
| Ad-free | ❌ | ✅ |
| Exclusive Skin | ❌ | ✅ |
| Gajah Mada | ❌ | ✅ |

### $MAJA Token Integration

| Fitur | Implementasi |
|-------|--------------|
| **Premium Character** | Hold 1000+ $MAJA unlock Gajah Mada |
| **Tournament Entry** | Bayar $MAJA untuk join |
| **Play-to-Earn Lite** | Top 10 weekly dapat $MAJA |
| **NFT Export** | Karakter/skin jadi NFT (future) |
| **Staking Bonus** | Holder dapat 2x daily rewards |

### Ad Placements (Free Version)
- Rewarded video: Revive (optional)
- Rewarded video: 2x coin bonus end of run
- Interstitial: Setiap 3 runs (skippable)
- Banner: Leaderboard screen only

---

## 📅 Development Timeline

### Phase 1: Core (Week 1-2)
- [ ] Project setup (Phaser.js)
- [ ] Basic run mechanics
- [ ] Jump, slide, lane change
- [ ] Collision detection
- [ ] Basic obstacle spawning
- [ ] Score system

### Phase 2: Content (Week 3-4)
- [ ] Zone 1 (Trowulan) complete
- [ ] Zone 2 (Hutan) complete
- [ ] 5 obstacle types per zone
- [ ] Power-up system (4 types)
- [ ] Coin collection

### Phase 3: Progression (Week 5-6)
- [ ] 3 playable characters
- [ ] Level/XP system
- [ ] Daily missions
- [ ] Lontar collection (20 items)
- [ ] Local storage save

### Phase 4: Polish (Week 7-8)
- [ ] UI/UX complete
- [ ] Menu screens
- [ ] Leaderboard (local)
- [ ] Sound effects
- [ ] Background music
- [ ] Tutorial
- [ ] Testing & bug fixes

### MVP Deliverables
- ✅ 2 Zones (Trowulan, Hutan)
- ✅ 3 Characters
- ✅ 4 Power-ups
- ✅ 20 Lontar (edukasi)
- ✅ Local leaderboard
- ✅ Mobile responsive
- ✅ PWA ready

---

## 💵 Budget Estimation

### Option A: Outsource Development

| Item | Estimasi (USD) |
|------|----------------|
| Game development | $300-600 |
| Art assets (sprites, BG) | $100-200 |
| Sound effects + music | $50-100 |
| **Total MVP** | **$450-900** |

### Option B: DIY with Assets

| Item | Estimasi (USD) |
|------|----------------|
| Sprite sheets (marketplace) | $20-50 |
| Background art packs | $30-80 |
| Sound/music pack | $15-30 |
| **Total DIY** | **$65-160** |

### Asset Marketplaces
- [itch.io](https://itch.io/game-assets)
- [OpenGameArt](https://opengameart.org/)
- [Craftpix](https://craftpix.net/)
- [GameDev Market](https://www.gamedevmarket.net/)

---

## 🎮 Sample Gameplay Flow

```
┌─────────────────────────────────────────┐
│  [MENU UTAMA]                           │
│  ┌─────┐  ┌─────┐  ┌─────┐             │
│  │MAIN │  │TOKO │  │SKOR │             │
│  └─────┘  └─────┘  └─────┘             │
│           [KOLEKSI]                     │
└─────────────────────────────────────────┘
                ↓ Tap MAIN
┌─────────────────────────────────────────┐
│  [PILIH KARAKTER]                       │
│  🏃 Jaya   ⚔️ Bhayangkara   🔒 ...     │
│            [MULAI]                      │
└─────────────────────────────────────────┘
                ↓ Tap MULAI
┌─────────────────────────────────────────┐
│  [IN-GAME]                              │
│  Score: 1,250    🪙 45    💎 2          │
│  ───────────────────────────────────    │
│       🪙   🪙        📜                 │
│   🌳      🏃      🪨                   │
│  ════════════════════════════════       │
│  Swipe ↑↓←→ untuk menghindar           │
└─────────────────────────────────────────┘
                ↓ Nabrak!
┌─────────────────────────────────────────┐
│  [GAME OVER]                            │
│  Jarak: 1,250m    Skor: 12,500         │
│  Koin: 45    High Score: 15,000        │
│                                         │
│  📜 Lontar baru: "Candi Penataran"     │
│                                         │
│  [LAGI] [🎬 REVIVE] [MENU]             │
└─────────────────────────────────────────┘
```

---

## 📋 Task Checklist

### Pre-Production
- [x] Game Design Document
- [ ] Asset list finalized
- [ ] Technical stack confirmed
- [ ] Budget approved

### Production
- [ ] Core mechanics prototype
- [ ] Art assets created/sourced
- [ ] Audio assets created/sourced
- [ ] All zones implemented
- [ ] All characters implemented
- [ ] UI/UX implemented
- [ ] Save system
- [ ] Leaderboard

### Post-Production
- [ ] QA testing
- [ ] Performance optimization
- [ ] PWA configuration
- [ ] Deployment
- [ ] Analytics integration

---

## 📝 Notes

### Unique Selling Points
1. **100% Indonesia** - Setting, karakter, cerita lokal
2. **Edukasi sejarah** - Belajar sambil bermain
3. **5 Zone unik** - Bukan generic environment
4. **Token integration** - Earn $MAJA (opsional)
5. **Cultural pride** - Bangga dengan heritage Majapahit

### Risks & Mitigation
| Risk | Mitigation |
|------|------------|
| Art quality | Use professional asset packs |
| Performance | Test early on target devices |
| Scope creep | Stick to MVP, iterate later |
| Competition | Focus on unique cultural aspect |

### Future Expansion Ideas
- More zones (Bali, Sumatera, Kalimantan)
- PvP racing mode
- Seasonal events (Lebaran, Nyepi)
- Character crossover
- Multiplayer co-op

---

## 🛠️ Technical Stack

### Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                    MAJAPAHIT RUNNER                      │
├─────────────────────────────────────────────────────────┤
│  Frontend Game    : Phaser.js 3.x (Game Engine)         │
│  UI Framework     : React/Next.js (Menu, Leaderboard)   │
│  Wallet Connect   : Web3.js / Ethers.js                 │
│  Backend          : Node.js + Express                   │
│  Database         : MongoDB Atlas / Supabase            │
│  Blockchain       : BSC (BNB Smart Chain)               │
│  Token            : $MAJA (BEP-20)                      │
│  Hosting          : Vercel / Netlify                    │
│  CDN              : Cloudflare                          │
└─────────────────────────────────────────────────────────┘
```

### Kenapa Web-Based?

| Alasan | Penjelasan |
|--------|------------|
| **Aksesibilitas** | Semua orang bisa main tanpa install |
| **Cross-platform** | Desktop, mobile, tablet dalam 1 build |
| **Integrasi Wallet** | Mudah connect dengan MetaMask/TrustWallet |
| **Update Instant** | Deploy langsung, user dapat versi terbaru |
| **PWA Ready** | Bisa "install" seperti app native |
| **Telegram Mini App** | Bisa embed di Telegram |

### Target Platform
- 📱 **Mobile Web** (Primary) - PWA
- 💻 **Desktop Web** (Secondary)
- 📲 **Telegram Mini App** (Optional)

### Performance Target
- 60 FPS on mid-range mobile
- < 3 second initial load
- < 50MB total assets
- Offline capable (PWA)

### Browser Support
- Chrome 80+
- Safari 13+
- Firefox 75+
- Edge 80+

---

## 💎 Play-to-Earn (P2E) System

### Earning Mechanism Flow

```
┌─────────────────────────────────────────────────────────┐
│                   $MAJA EARNING FLOW                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   🎮 PLAY          →    🏆 ACHIEVE       →   💰 EARN    │
│                                                          │
│   Daily Run             Top 100 Daily       $MAJA Pool  │
│   Weekly Tournament     Top 10 Weekly       Prize Pool  │
│   Monthly Championship  Top 3 Monthly       Big Reward  │
│   Lontar Collection     Complete 50         NFT Badge   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### P2E Eligibility Requirements

| Requirement | Detail |
|-------------|--------|
| **Wallet Connected** | MetaMask/TrustWallet wajib |
| **Minimum Hold** | Hold minimal 100 $MAJA untuk eligible |
| **Account Age** | Minimal 24 jam setelah registrasi |
| **KYC Level** | Tidak perlu KYC untuk tier dasar |
| **Daily Limit** | Max 10 P2E runs per hari |

### Reward Pool Distribution (dari Dana Budaya 2%)

| Tier | Kondisi | Reward Pool Share |
|------|---------|-------------------|
| **Daily** | Top 100 skor harian | 5% dari pool bulanan |
| **Weekly** | Top 50 tournament | 15% dari pool bulanan |
| **Monthly** | Top 20 championship | 40% dari pool bulanan |
| **Special** | Event & achievement | 20% dari pool bulanan |
| **Reserve** | Carry forward | 20% |

### Contoh Kalkulasi Reward

```
Asumsi: Volume trading $100,000/bulan
├── Dana Budaya (2%): $2,000
├── Alokasi Game Rewards: 50% = $1,000
│
├── Daily Pool (5%): $50/bulan = ~$1.67/hari
│   └── Dibagi 100 pemain = ~$0.017 per pemain/hari
│
├── Weekly Pool (15%): $150/bulan = ~$37.50/minggu
│   └── Top 50 share = $0.50 - $5 per pemain
│
├── Monthly Pool (40%): $400/bulan
│   └── Top 20 share = $5 - $100 per pemain
│
└── Special Events (20%): $200/bulan
    └── Achievement, seasonal events
```

### Anti-Cheat & Fair Play

| Measure | Implementasi |
|---------|--------------|
| **Wallet Verification** | 1 wallet = 1 account |
| **Server-side Validation** | Skor divalidasi backend |
| **Cooldown** | Max 10 runs per jam untuk P2E |
| **Anti-bot** | Captcha untuk claim reward |
| **Suspicious Activity** | Flag unusual patterns |
| **Replay System** | Store game replay untuk verifikasi |
| **IP Monitoring** | Deteksi multi-account |
| **Device Fingerprint** | Limit device per account |

### Reward Claim Process

```
1. Pemain finish run dengan skor tinggi
2. Skor dikirim ke backend dengan encrypted payload
3. Backend validasi:
   - Timestamp masuk akal
   - Score progression valid
   - No anomaly detected
4. Skor masuk leaderboard
5. Akhir periode (daily/weekly/monthly):
   - Snapshot leaderboard
   - Calculate rewards
   - Push ke claiming queue
6. Pemain claim reward:
   - Connect wallet
   - Verify ownership
   - Sign transaction
   - Receive $MAJA
```

---

## 🏆 Tournament System

### Tournament Tiers

```
┌─────────────────────────────────────────────────────────┐
│                   TOURNAMENT STRUCTURE                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🥉 DAILY RACE (Gratis)                                 │
│     • Reset setiap 24 jam (00:00 WIB)                   │
│     • Top 100 dapat poin                                │
│     • Poin = tiket weekly tournament                    │
│     • Tidak perlu entry fee                             │
│                                                          │
│  🥈 WEEKLY TOURNAMENT (Butuh Tiket/Entry Fee)           │
│     • Mulai: Senin 00:00 WIB                            │
│     • Selesai: Minggu 23:59 WIB                         │
│     • Entry: 100 $MAJA atau 500 Poin                    │
│     • Pool: Semua entry fee + bonus dari Dana Budaya    │
│     • Top 50 share pool                                 │
│                                                          │
│  🥇 MONTHLY CHAMPIONSHIP (Qualify dari Weekly)          │
│     • Periode: Tanggal 1-28/30/31                       │
│     • Top 100 weekly auto-qualify                       │
│     • Grand Prize Pool                                  │
│     • Top 3: NFT Trophy + $MAJA                         │
│     • Live streaming final day                          │
│                                                          │
│  👑 SEASONAL GRAND PRIX (4x setahun)                    │
│     • Q1: Maret, Q2: Juni, Q3: September, Q4: Desember  │
│     • Invite only (top performers)                      │
│     • Massive prize pool                                │
│     • Exclusive legendary skin                          │
│     • Sponsored prizes (partnership)                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Tournament Rules

#### Daily Race
- **Durasi**: 24 jam (00:00 - 23:59 WIB)
- **Entry**: Gratis
- **Attempts**: Unlimited (best score counts)
- **Rewards**: Poin untuk weekly tournament
- **Poin Distribution**:
  - Rank 1: 100 poin
  - Rank 2-10: 50 poin
  - Rank 11-50: 20 poin
  - Rank 51-100: 10 poin

#### Weekly Tournament
- **Durasi**: 7 hari (Senin-Minggu)
- **Entry Fee**: 100 $MAJA atau 500 Poin
- **Attempts**: 5 attempts per entry (best score counts)
- **Additional Entry**: Boleh beli entry tambahan
- **Prize Pool**: Entry fees + 15% Dana Budaya bulanan

#### Monthly Championship
- **Qualification**: Top 100 average weekly rank
- **Entry**: Free untuk yang qualify
- **Format**: 3 runs, total score
- **Special Rules**: 
  - Semua power-up disabled
  - Pure skill competition
  - Anti-cheat extra strict

### Prize Distribution (Weekly Example)

| Rank | Share | Contoh (Pool 10,000 $MAJA) |
|------|-------|---------------------------|
| 🥇 1st | 20% | 2,000 $MAJA |
| 🥈 2nd | 12% | 1,200 $MAJA |
| 🥉 3rd | 8% | 800 $MAJA |
| 4-10 | 3% each | 2,100 $MAJA total |
| 11-25 | 1% each | 1,500 $MAJA total |
| 26-50 | 0.5% each | 1,250 $MAJA total |
| Platform | 5% | 500 $MAJA (sustainability) |
| Burn | 1.5% | 150 $MAJA (deflation) |

### Tournament Badges & Rewards

| Achievement | Badge | Reward |
|-------------|-------|--------|
| Win Daily Race | 🏅 Daily Champion | 50 $MAJA |
| Win Weekly Tournament | 🏆 Weekly Champion | Trophy NFT + Prize |
| Win Monthly Championship | 👑 Monthly Legend | Legendary Skin + Prize |
| Win Seasonal Grand Prix | 💎 Grand Master | Exclusive Title + Prize |
| 10 Tournament Wins | 🌟 Tournament Star | Special Frame |
| 100 Tournament Participations | 💪 Veteran | Veteran Badge |

---

## 🗄️ Database Schema

### MongoDB Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  walletAddress: "0x...",              // Primary identifier (lowercase)
  username: "Jaya123",                 // Unique, 3-20 chars
  email: "optional@email.com",         // Optional
  createdAt: ISODate,
  lastLoginAt: ISODate,
  
  // Game Progress
  stats: {
    level: 15,
    xp: 2500,
    highScore: 45000,
    totalDistance: 125000,             // Meters
    totalCoins: 85000,
    totalRuns: 342,
    totalPlayTime: 18000               // Seconds
  },
  
  // Unlocks
  inventory: {
    characters: ["jaya", "bhayangkara", "srikandi"],
    skins: ["default", "gold"],
    powerups: {
      keris: 5,
      kuda: 3,
      jimat: 10,
      magnet: 8,
      speed: 2
    }
  },
  
  // Collection Progress
  lontar: {
    collected: [1, 2, 5, 7, 12],       // Lontar IDs
    total: 50
  },
  
  // P2E Stats
  p2e: {
    totalEarned: 1500,                 // $MAJA earned lifetime
    pendingReward: 25,                 // Unclaimed
    tournamentWins: 3,
    currentStreak: 5,
    bestRank: {
      daily: 3,
      weekly: 12,
      monthly: 45
    }
  },
  
  // Anti-cheat
  security: {
    lastPlayTime: ISODate,
    dailyRunCount: 8,
    p2eRunsToday: 4,
    flagged: false,
    flagReason: null,
    deviceFingerprints: ["fp1", "fp2"],
    ipHistory: ["ip1", "ip2"]
  },
  
  // Settings
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    notifications: true,
    language: "id"
  }
}
```

#### Leaderboard Collection
```javascript
{
  _id: ObjectId,
  period: "daily-2026-01-15",          // Identifier
  type: "daily",                        // daily, weekly, monthly
  startDate: ISODate,
  endDate: ISODate,
  
  entries: [
    { 
      rank: 1,
      wallet: "0x...", 
      username: "Player1",
      score: 85000,
      distance: 2500,
      timestamp: ISODate
    },
    { 
      rank: 2,
      wallet: "0x...", 
      username: "Player2",
      score: 72000,
      distance: 2100,
      timestamp: ISODate
    }
    // ... up to 1000 entries
  ],
  
  prizePool: 500,                       // $MAJA
  distributed: false,
  distributedAt: null,
  transactionHashes: []
}
```

#### Tournament Collection
```javascript
{
  _id: ObjectId,
  tournamentId: "weekly-2026-w03",      // Unique identifier
  name: "Weekly Tournament #3",
  type: "weekly",                        // weekly, monthly, seasonal
  
  schedule: {
    registrationStart: ISODate,
    registrationEnd: ISODate,
    startDate: ISODate,
    endDate: ISODate
  },
  
  config: {
    entryFee: 100,                       // $MAJA
    maxParticipants: 10000,
    attemptsPerEntry: 5,
    additionalEntryAllowed: true,
    powerupsEnabled: true
  },
  
  pool: {
    basePrize: 5000,                     // From Dana Budaya
    entryFees: 50000,                    // Collected from entries
    totalPrize: 55000
  },
  
  participants: [
    {
      wallet: "0x...",
      username: "Player1",
      registeredAt: ISODate,
      entryCount: 2,
      bestScore: 85000,
      attempts: [
        { score: 72000, timestamp: ISODate },
        { score: 85000, timestamp: ISODate }
      ]
    }
  ],
  
  results: [
    { rank: 1, wallet: "0x...", score: 85000, prize: 11000 },
    { rank: 2, wallet: "0x...", score: 82000, prize: 6600 }
  ],
  
  status: "active",                      // upcoming, active, ended, distributed
  distributed: false,
  distributedAt: null
}
```

#### GameRuns Collection (untuk anti-cheat)
```javascript
{
  _id: ObjectId,
  wallet: "0x...",
  runId: "uuid-v4",
  
  gameData: {
    character: "jaya",
    zone: "trowulan",
    score: 45000,
    distance: 1500,
    coinsCollected: 234,
    powerupsUsed: ["keris", "magnet"],
    lontarCollected: [15, 22],
    duration: 180                        // Seconds
  },
  
  // Anti-cheat data
  validation: {
    clientTimestamp: ISODate,
    serverTimestamp: ISODate,
    clientHash: "sha256...",
    validated: true,
    anomalyScore: 0.1,                   // 0-1, higher = more suspicious
    flags: []
  },
  
  // Replay data (optional, for disputed scores)
  replay: {
    stored: false,
    replayUrl: null
  },
  
  // Context
  context: {
    tournamentId: "weekly-2026-w03",     // null if casual play
    isP2E: true,
    ip: "xxx.xxx.xxx.xxx",
    deviceFingerprint: "fp123"
  }
}
```

### Database Indexes
```javascript
// Users
db.users.createIndex({ walletAddress: 1 }, { unique: true })
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ "stats.highScore": -1 })
db.users.createIndex({ "p2e.totalEarned": -1 })

// Leaderboard
db.leaderboard.createIndex({ period: 1 }, { unique: true })
db.leaderboard.createIndex({ type: 1, endDate: -1 })

// Tournament
db.tournaments.createIndex({ tournamentId: 1 }, { unique: true })
db.tournaments.createIndex({ status: 1, "schedule.startDate": 1 })

// GameRuns
db.gameruns.createIndex({ wallet: 1, "context.tournamentId": 1 })
db.gameruns.createIndex({ runId: 1 }, { unique: true })
db.gameruns.createIndex({ "validation.validated": 1, "validation.anomalyScore": -1 })
```

---

## 📁 Project Structure

```
the-maja/
├── docs/
│   └── game/
│       └── MAJAPAHIT_RUNNER.md          ← Dokumen ini
│
├── game/                                 # Phaser.js Game
│   ├── src/
│   │   ├── scenes/
│   │   │   ├── BootScene.js             # Initial loading
│   │   │   ├── PreloadScene.js          # Asset loading
│   │   │   ├── MenuScene.js             # Main menu
│   │   │   ├── CharacterSelectScene.js  # Character selection
│   │   │   ├── GameScene.js             # Main gameplay
│   │   │   ├── PauseScene.js            # Pause overlay
│   │   │   ├── GameOverScene.js         # Results screen
│   │   │   ├── LeaderboardScene.js      # Leaderboard view
│   │   │   ├── ShopScene.js             # Character/skin shop
│   │   │   ├── TournamentScene.js       # Tournament lobby
│   │   │   └── LontarScene.js           # Lontar collection
│   │   ├── objects/
│   │   │   ├── Player.js                # Player character
│   │   │   ├── Obstacle.js              # Obstacle types
│   │   │   ├── PowerUp.js               # Power-up items
│   │   │   ├── Coin.js                  # Collectible coins
│   │   │   └── Lontar.js                # Lontar scroll
│   │   ├── managers/
│   │   │   ├── GameManager.js           # Game state
│   │   │   ├── ScoreManager.js          # Score tracking
│   │   │   ├── AudioManager.js          # Sound control
│   │   │   └── SaveManager.js           # Local save
│   │   ├── config/
│   │   │   ├── gameConfig.js            # Phaser config
│   │   │   ├── characters.js            # Character data
│   │   │   ├── zones.js                 # Zone definitions
│   │   │   └── lontar.js                # Lontar content
│   │   ├── utils/
│   │   │   ├── api.js                   # Backend API calls
│   │   │   ├── wallet.js                # Wallet connection
│   │   │   └── antiCheat.js             # Client-side validation
│   │   └── main.js                      # Entry point
│   ├── assets/
│   │   ├── sprites/                     # Character & object sprites
│   │   ├── backgrounds/                 # Parallax backgrounds
│   │   ├── audio/                       # SFX & music
│   │   └── ui/                          # UI elements
│   ├── index.html
│   └── package.json
│
├── api/                                  # Backend Server
│   ├── routes/
│   │   ├── auth.js                      # Wallet auth
│   │   ├── user.js                      # User profile
│   │   ├── leaderboard.js               # Leaderboard API
│   │   ├── tournament.js                # Tournament API
│   │   ├── rewards.js                   # Claim rewards
│   │   └── gamerun.js                   # Submit scores
│   ├── models/
│   │   ├── User.js                      # User model
│   │   ├── Leaderboard.js               # Leaderboard model
│   │   ├── Tournament.js                # Tournament model
│   │   └── GameRun.js                   # Game run model
│   ├── middleware/
│   │   ├── auth.js                      # JWT verification
│   │   ├── walletVerify.js              # Wallet signature
│   │   └── antiCheat.js                 # Score validation
│   ├── services/
│   │   ├── rewardService.js             # Reward distribution
│   │   ├── tournamentService.js         # Tournament logic
│   │   └── blockchainService.js         # BSC interaction
│   ├── jobs/
│   │   ├── dailyReset.js                # Reset daily leaderboard
│   │   ├── weeklyTournament.js          # Process weekly
│   │   └── rewardDistribution.js        # Send rewards
│   ├── config/
│   │   └── config.js                    # Environment config
│   ├── server.js                        # Express entry
│   └── package.json
│
├── src/                                  # Existing Website
│   ├── app/
│   └── components/
│
└── public/
    └── images/
```

---

## 💵 Budget Estimation (Updated)

### Development Cost

| Item | Estimasi (USD) | Notes |
|------|----------------|-------|
| Game development (Phaser.js) | $500-800 | Core gameplay |
| Art assets (sprites, BG) | $150-250 | Buy packs + custom |
| Sound/music | $50-100 | Gamelan themed |
| Backend development | $200-400 | API + database |
| Wallet integration | $100-200 | Web3 connection |
| P2E system | $150-300 | Reward logic |
| Tournament system | $100-200 | Matchmaking |
| Testing & QA | $100-200 | Bug fixes |
| **Total MVP** | **$1,350-2,450** | |

### Optional Additions

| Item | Estimasi (USD) |
|------|----------------|
| Smart contract audit | $300-500 |
| Custom art (not packs) | $500-1000 |
| Mobile app (React Native) | $1000-2000 |
| Advanced anti-cheat | $200-400 |

### Operational Cost (Monthly)

| Item | Estimasi (USD) |
|------|----------------|
| Server hosting (Railway/Render) | $20-50 |
| Database (MongoDB Atlas) | $0-25 |
| CDN (Cloudflare) | $0-20 |
| Domain | $1-2 |
| **Total/bulan** | **$21-97** |

---

## 📅 Development Timeline (Updated - 12 Weeks)

### Phase 0: Setup (Week 0)
- [x] Game Design Document ✓
- [ ] Setup development environment
- [ ] Create project structure
- [ ] Setup Git branches

### Phase 1: Core Game (Week 1-2)
- [ ] Phaser.js project setup
- [ ] Basic run mechanics
- [ ] Jump, slide, lane change
- [ ] Collision detection
- [ ] Basic obstacle spawning
- [ ] Score system
- [ ] Single character

### Phase 2: Content (Week 3-4)
- [ ] Zone 1 (Trowulan) complete
- [ ] Zone 2 (Hutan) complete
- [ ] 5 obstacle types per zone
- [ ] Power-up system (4 types)
- [ ] Coin collection
- [ ] 3 playable characters

### Phase 3: Backend (Week 5-6)
- [ ] MongoDB setup
- [ ] Express server
- [ ] User authentication (wallet)
- [ ] Leaderboard API
- [ ] Save/load system
- [ ] Basic anti-cheat

### Phase 4: Wallet Integration (Week 7-8)
- [ ] MetaMask connection
- [ ] TrustWallet support
- [ ] Wallet signature auth
- [ ] Token balance check
- [ ] Holder verification

### Phase 5: P2E System (Week 9-10)
- [ ] Reward pool management
- [ ] Score validation
- [ ] Daily leaderboard rewards
- [ ] Claim mechanism
- [ ] Anti-cheat enhancement

### Phase 6: Tournament (Week 11)
- [ ] Tournament registration
- [ ] Entry fee collection
- [ ] Tournament leaderboard
- [ ] Prize distribution
- [ ] Weekly automation

### Phase 7: Launch (Week 12)
- [ ] UI/UX polish
- [ ] Sound effects & music
- [ ] Performance optimization
- [ ] PWA configuration
- [ ] Beta testing
- [ ] Mainnet deployment

---

**Document Version History**
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 15 Jan 2026 | Initial GDD created |
| 1.1 | 15 Jan 2026 | Added P2E system, Tournament system, Tech stack, Database schema, Project structure, Updated timeline & budget |

---

## 🔒 Locked Concepts (JANGAN DIUBAH)

> **PENTING**: Konsep-konsep berikut sudah final dan tidak boleh diubah tanpa diskusi tim.

### Core Locked ✅
- [x] **Genre**: Endless Runner 2D Side-scrolling
- [x] **Setting**: Kerajaan Majapahit
- [x] **Karakter Utama**: Jaya (kurir kerajaan)
- [x] **Storyline**: Mengantar pesan rahasia Gajah Mada
- [x] **Gameplay**: 3-lane system dengan swipe controls
- [x] **Platform**: Web-based (Phaser.js)

### Zones Locked ✅
- [x] Zone 1: Trowulan (Ibukota)
- [x] Zone 2: Hutan Jati
- [x] Zone 3: Pelabuhan
- [x] Zone 4: Candi
- [x] Zone 5: Gunung Bromo

### Characters Locked ✅
- [x] Jaya (Kurir) - Default, Speed +5%
- [x] Bhayangkara (Prajurit) - Armor 1x hit
- [x] Srikandi (Penari) - Double jump
- [x] Dang Hyang (Pendeta) - Magnet koin
- [x] Hayam Wuruk (Raja) - 2x multiplier
- [x] Gajah Mada (Patih) - Shield + Speed (Premium)

### P2E Locked ✅
- [x] Reward dari Dana Budaya (2% tax)
- [x] Daily/Weekly/Monthly leaderboard rewards
- [x] Minimum hold 100 $MAJA untuk P2E eligible
- [x] Max 10 P2E runs per hari
- [x] Server-side score validation

### Tournament Locked ✅
- [x] Daily Race: Gratis, poin rewards
- [x] Weekly Tournament: 100 $MAJA entry fee
- [x] Monthly Championship: Qualify dari weekly
- [x] Seasonal Grand Prix: 4x setahun
- [x] Prize distribution formula (20%, 12%, 8%...)

### Tech Stack Locked ✅
- [x] Game Engine: Phaser.js 3.x
- [x] Backend: Node.js + Express
- [x] Database: MongoDB
- [x] Blockchain: BSC (BNB Smart Chain)
- [x] Token: $MAJA (BEP-20)

### Edukasi Locked ✅
- [x] 50 Lontar collectibles
- [x] 4 kategori: Tokoh, Tempat, Peristiwa, Budaya
- [x] Fakta sejarah akurat

---

*Dokumen ini adalah Game Design Document untuk Majapahit Runner, bagian dari ekosistem $MAJA Token.*

**© 2026 The Maja Project. All rights reserved.**
