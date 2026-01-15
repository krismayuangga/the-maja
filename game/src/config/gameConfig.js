/**
 * Phaser Game Configuration
 */

export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  
  // Game dimensions (16:9 for mobile/widescreen)
  width: 720,
  height: 480,
  
  // Scaling - responsive to container
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 320,
      height: 213
    },
    max: {
      width: 1280,
      height: 853
    }
  },
  
  // Physics
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 },
      debug: false // Set true for development
    }
  },
  
  // Rendering
  render: {
    pixelArt: false,
    antialias: true,
    roundPixels: true
  },
  
  // Audio
  audio: {
    disableWebAudio: false
  },
  
  // Background color (Majapahit brown)
  backgroundColor: '#1a0a00'
};

/**
 * Game Constants
 */
export const GAME = {
  // Player settings
  PLAYER: {
    START_X: 100,
    GROUND_Y: 360,
    JUMP_VELOCITY: -650,
    SLIDE_DURATION: 500,
    LANE_WIDTH: 100,
    LANES: [-100, 0, 100] // Left, Center, Right offset from center
  },
  
  // Speed settings
  SPEED: {
    INITIAL: 300,
    MAX: 800,
    INCREMENT: 0.5 // Per frame
  },
  
  // Scoring
  SCORE: {
    PER_METER: 1,
    PER_COIN: 10,
    PER_LONTAR: 100
  },
  
  // Spawn rates (in milliseconds)
  SPAWN: {
    OBSTACLE_MIN: 1000,
    OBSTACLE_MAX: 2500,
    COIN_MIN: 500,
    COIN_MAX: 1500,
    POWERUP_MIN: 10000,
    POWERUP_MAX: 20000,
    LONTAR_MIN: 30000,
    LONTAR_MAX: 60000
  },
  
  // Power-up durations (in milliseconds)
  POWERUP: {
    DURATION: 10000,
    MAGNET_RADIUS: 200,
    SPEED_MULTIPLIER: 1.5,
    INVINCIBLE_FLICKER: 100
  }
};

/**
 * Character Definitions
 */
export const CHARACTERS = {
  jaya: {
    id: 'jaya',
    name: 'Jaya',
    title: 'Kurir Kerajaan',
    description: 'Kurir muda yang gesit dan berani',
    passive: 'Kecepatan +5%',
    passiveValue: 1.05,
    unlocked: true,
    price: 0,
    rarity: 'common',
    sprite: 'char_jaya'
  },
  bhayangkara: {
    id: 'bhayangkara',
    name: 'Bhayangkara',
    title: 'Prajurit Elit',
    description: 'Prajurit elit pengawal kerajaan',
    passive: 'Armor 1x hit',
    passiveValue: 1,
    unlocked: false,
    price: 5000,
    rarity: 'common',
    sprite: 'char_bhayangkara'
  },
  srikandi: {
    id: 'srikandi',
    name: 'Srikandi',
    title: 'Penari Istana',
    description: 'Penari istana yang lincah',
    passive: 'Double Jump',
    passiveValue: true,
    unlocked: false,
    price: 10000,
    rarity: 'rare',
    sprite: 'char_srikandi'
  },
  danghyang: {
    id: 'danghyang',
    name: 'Dang Hyang',
    title: 'Pendeta Sakti',
    description: 'Pendeta sakti dengan kekuatan magis',
    passive: 'Magnet Koin',
    passiveValue: 150,
    unlocked: false,
    price: 15000,
    rarity: 'rare',
    sprite: 'char_danghyang'
  },
  hayamwuruk: {
    id: 'hayamwuruk',
    name: 'Hayam Wuruk',
    title: 'Raja Majapahit',
    description: 'Raja Majapahit di masa kejayaan',
    passive: 'Skor 2x',
    passiveValue: 2,
    unlocked: false,
    price: 25000,
    rarity: 'epic',
    sprite: 'char_hayamwuruk'
  },
  gajahmada: {
    id: 'gajahmada',
    name: 'Gajah Mada',
    title: 'Patih Amangkubhumi',
    description: 'Patih legendaris penakluk Nusantara',
    passive: 'Shield + Speed',
    passiveValue: { shield: true, speed: 1.1 },
    unlocked: false,
    price: 0, // Premium only
    rarity: 'legendary',
    sprite: 'char_gajahmada',
    premium: true
  }
};

/**
 * Zone Definitions
 */
export const ZONES = {
  trowulan: {
    id: 'trowulan',
    name: 'Trowulan',
    subtitle: 'Ibukota Kerajaan',
    description: 'Jalanan bata merah ibukota Majapahit',
    unlockLevel: 1,
    background: 'bg_trowulan',
    ground: 'ground_brick',
    obstacles: ['cart', 'pot', 'merchant', 'cloth'],
    ambience: 'sfx_market'
  },
  hutan: {
    id: 'hutan',
    name: 'Hutan Jati',
    subtitle: 'Hutan Lebat',
    description: 'Hutan jati menuju desa-desa',
    unlockLevel: 10,
    background: 'bg_hutan',
    ground: 'ground_dirt',
    obstacles: ['log', 'river', 'tiger', 'branch'],
    ambience: 'sfx_forest'
  },
  pelabuhan: {
    id: 'pelabuhan',
    name: 'Pelabuhan',
    subtitle: 'Dermaga Pedagang',
    description: 'Dermaga ramai kapal-kapal Jung',
    unlockLevel: 20,
    background: 'bg_pelabuhan',
    ground: 'ground_wood',
    obstacles: ['rope', 'crate', 'pirate', 'net'],
    ambience: 'sfx_harbor'
  },
  candi: {
    id: 'candi',
    name: 'Candi',
    subtitle: 'Area Suci',
    description: 'Kompleks candi-candi megah',
    unlockLevel: 30,
    background: 'bg_candi',
    ground: 'ground_stone',
    obstacles: ['stairs', 'statue', 'fire', 'rubble'],
    ambience: 'sfx_temple'
  },
  bromo: {
    id: 'bromo',
    name: 'Gunung Bromo',
    subtitle: 'Pegunungan Vulkanik',
    description: 'Jalur pegunungan berbahaya',
    unlockLevel: 40,
    background: 'bg_bromo',
    ground: 'ground_volcanic',
    obstacles: ['lava', 'rock', 'fog', 'crack'],
    ambience: 'sfx_volcano'
  }
};

/**
 * Power-up Definitions
 */
export const POWERUPS = {
  keris: {
    id: 'keris',
    name: 'Keris Sakti',
    description: 'Hancurkan semua rintangan',
    duration: 10000,
    sprite: 'powerup_keris',
    effect: 'destroy'
  },
  kuda: {
    id: 'kuda',
    name: 'Kuda Terbang',
    description: 'Terbang di atas rintangan',
    duration: 10000,
    sprite: 'powerup_kuda',
    effect: 'fly'
  },
  jimat: {
    id: 'jimat',
    name: 'Jimat Pelindung',
    description: 'Kebal 1x tabrakan',
    duration: 0, // Until used
    sprite: 'powerup_jimat',
    effect: 'shield'
  },
  magnet: {
    id: 'magnet',
    name: 'Magnet Emas',
    description: 'Tarik semua koin otomatis',
    duration: 10000,
    sprite: 'powerup_magnet',
    effect: 'magnet'
  },
  speed: {
    id: 'speed',
    name: 'Super Speed',
    description: 'Kecepatan 2x + skor 2x',
    duration: 10000,
    sprite: 'powerup_speed',
    effect: 'speed'
  }
};
