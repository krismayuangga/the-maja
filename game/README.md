# Majapahit Runner Game

🏃 Endless runner game set in the Majapahit Kingdom - Part of $MAJA Token ecosystem.

## Tech Stack

- **Game Engine**: Phaser.js 3.x
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## Development

### Install Dependencies

```bash
cd game
npm install
```

### Run Development Server

```bash
npm run dev
```

Game akan berjalan di `http://localhost:3001`

### Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`

## Project Structure

```
game/
├── src/
│   ├── main.js              # Entry point
│   ├── config/
│   │   └── gameConfig.js    # Game settings & constants
│   └── scenes/
│       ├── BootScene.js     # Initial loading
│       ├── PreloadScene.js  # Asset loading
│       ├── MenuScene.js     # Main menu
│       ├── GameScene.js     # Gameplay
│       └── GameOverScene.js # Game over
├── assets/
│   ├── sprites/             # Character & object sprites
│   ├── backgrounds/         # Parallax backgrounds
│   ├── audio/              # Music & SFX
│   └── ui/                 # UI elements
├── public/
│   └── manifest.json       # PWA manifest
├── index.html
├── package.json
└── vite.config.js
```

## Controls

### Desktop
- **↑ / Space**: Jump
- **↓**: Slide
- **← →**: Change lane

### Mobile
- **Swipe Up**: Jump
- **Swipe Down**: Slide
- **Swipe Left/Right**: Change lane
- **Tap**: Jump

## Current Status

**Version**: 0.1.0 (MVP Development)

### Implemented ✅
- [x] Project setup (Vite + Phaser)
- [x] Scene structure
- [x] Basic game loop
- [x] Player movement (jump, slide, lane change)
- [x] Obstacle spawning
- [x] Coin collection
- [x] Score system
- [x] Local save (localStorage)
- [x] Menu & Game Over screens

### TODO 📋
- [ ] Real sprite assets
- [ ] Background parallax
- [ ] Audio (music & SFX)
- [ ] Power-up system
- [ ] Lontar collection
- [ ] Multiple characters
- [ ] Multiple zones
- [ ] Wallet integration
- [ ] Leaderboard API

## Game Design Document

See full GDD: `docs/game/MAJAPAHIT_RUNNER.md`

## License

Part of The Maja Project © 2026
