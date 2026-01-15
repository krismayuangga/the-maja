/**
 * Phaser Game Configuration
 * VERTICAL/PORTRAIT Endless Runner
 */

export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  
  // Portrait orientation - LARGER SIZE
  width: 450,
  height: 900,
  
  // Scaling - responsive to container
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 360,
      height: 640
    },
    max: {
      width: 540,
      height: 1080
    }
  },
  
  // Physics
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // No gravity - we control movement
      debug: false
    }
  },
  
  // Rendering
  render: {
    pixelArt: false,
    antialias: true,
    roundPixels: true
  },
  
  // Background color
  backgroundColor: '#1a0a00'
};

/**
 * Game Constants for Vertical Runner
 */
export const GAME = {
  // Screen dimensions
  WIDTH: 450,
  HEIGHT: 900,
  
  // Player settings
  PLAYER: {
    Y: 750,           // Near bottom of screen
    SIZE: 70,
    JUMP_HEIGHT: 180,
    JUMP_DURATION: 500,
    SLIDE_DURATION: 500
  },
  
  // 3 Lanes (Left, Center, Right)
  LANES: {
    LEFT: 100,
    CENTER: 225,
    RIGHT: 350,
    POSITIONS: [100, 225, 350]
  },
  
  // Road/Track settings
  ROAD: {
    WIDTH: 340,
    LEFT_EDGE: 55,
    RIGHT_EDGE: 395
  },
  
  // Speed settings - SLOWER!
  SPEED: {
    INITIAL: 3,
    MAX: 10,
    INCREMENT: 0.0005
  },
  
  // Scoring
  SCORE: {
    PER_METER: 1,
    PER_COIN: 10
  },
  
  // Spawn settings - MORE TIME BETWEEN SPAWNS
  SPAWN: {
    OBSTACLE_MIN: 1500,
    OBSTACLE_MAX: 3000,
    COIN_MIN: 800,
    COIN_MAX: 2000
  }
};

/**
 * Characters
 */
export const CHARACTERS = {
  jaya: {
    id: 'jaya',
    name: 'Jaya',
    emoji: '🏃',
    color: 0xFFD700,
    description: 'Kurir muda yang gesit',
    passive: 'Lari 5% lebih cepat',
    unlocked: true,
    price: 0
  },
  bhayangkara: {
    id: 'bhayangkara',
    name: 'Bhayangkara',
    emoji: '⚔️',
    color: 0xC0C0C0,
    description: 'Prajurit kerajaan',
    passive: 'Tahan 1x tabrak',
    unlocked: false,
    price: 1000
  },
  srikandi: {
    id: 'srikandi',
    name: 'Srikandi',
    emoji: '🏹',
    color: 0xFF69B4,
    description: 'Pemanah wanita',
    passive: 'Double coin 10%',
    unlocked: false,
    price: 2000
  }
};

/**
 * Zones/Themes
 */
export const ZONES = {
  trowulan: {
    id: 'trowulan',
    name: 'Trowulan',
    bgColor: 0x87CEEB,
    groundColor: 0xD2691E,
    roadColor: 0x8B4513,
    unlockDistance: 0
  },
  hutan: {
    id: 'hutan',
    name: 'Hutan Jati',
    bgColor: 0x228B22,
    groundColor: 0x2E8B57,
    roadColor: 0x3CB371,
    unlockDistance: 500
  },
  pelabuhan: {
    id: 'pelabuhan', 
    name: 'Pelabuhan',
    bgColor: 0x00CED1,
    groundColor: 0xF4A460,
    roadColor: 0xDEB887,
    unlockDistance: 1500
  }
};
