# 🏃 Majapahit Runner - Game Design Document

**Versi:** 1.0  
**Tanggal:** 15 Januari 2026  
**Status:** Konsep / Pre-Development  
**Target Release:** Q1 2026 (sesuai Roadmap $MAJA)

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

**Document Version History**
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 15 Jan 2026 | Initial GDD created |

---

*Dokumen ini adalah Game Design Document untuk Majapahit Runner, bagian dari ekosistem $MAJA Token.*
