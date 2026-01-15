# Majapahit Runner - Game Assets

Folder ini berisi semua asset untuk game Majapahit Runner.

## Struktur Folder

```
assets/
├── sprites/          # Karakter, obstacle, collectibles
├── backgrounds/      # Parallax backgrounds untuk setiap zone
├── audio/           # Music dan sound effects
├── ui/              # UI elements (buttons, panels, icons)
└── icons/           # App icons untuk PWA
```

## Sprite Specifications

### Characters (64x64 pixels)
- `player_run.png` - Run animation (8 frames)
- `player_jump.png` - Jump animation (4 frames)
- `player_slide.png` - Slide animation (4 frames)

### Obstacles (varies)
- `obstacle_cart.png` - Gerobak (80x60)
- `obstacle_pot.png` - Pot tanah liat (40x40)
- `obstacle_log.png` - Pohon tumbang (100x40)

### Collectibles
- `coin.png` - Koin emas spritesheet (32x32, 6 frames)
- `lontar.png` - Lontar scroll (32x48)

### Power-ups (48x48)
- `powerup_keris.png`
- `powerup_magnet.png`
- `powerup_jimat.png`
- `powerup_kuda.png`
- `powerup_speed.png`

## Background Specifications

### Each Zone needs:
- `{zone}_far.png` - Far background layer (1600x600)
- `{zone}_mid.png` - Middle layer (1600x600)
- `ground_{type}.png` - Tileable ground (128x120)

## Audio Specifications

### Music (MP3/OGG, loopable)
- `music_menu.mp3` - Menu theme (gamelan ambient)
- `music_game.mp3` - Gameplay theme (gamelan upbeat)

### Sound Effects (MP3/OGG, short)
- `sfx_jump.mp3` - Jump sound
- `sfx_slide.mp3` - Slide sound
- `sfx_coin.mp3` - Coin collect
- `sfx_crash.mp3` - Hit obstacle
- `sfx_powerup.mp3` - Power-up collect

## Color Palette

- Primary Gold: #FFD700
- Secondary Bronze: #B08D57
- Dark Brown: #1A0A00
- Medium Brown: #2D1810
- Brick Red: #8B4513
- Accent Red: #FF4444

## Art Style Reference

- Semi-realistic with traditional Indonesian influences
- Inspired by wayang (shadow puppet) aesthetics
- Warm earth tones with gold accents
- Clean silhouettes for gameplay clarity
