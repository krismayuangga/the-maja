/**
 * Phaser Game Configuration
 * VERTICAL/PORTRAIT Endless Runner
 */

export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  
  // Portrait orientation for mobile (9:16)
  width: 390,
  height: 844,
  
  // Scaling - responsive to container
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 320,
      height: 568
    },
    max: {
      width: 430,
      height: 932
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
  WIDTH: 390,
  HEIGHT: 844,
  
  // Player settings
  PLAYER: {
    Y: 700,           // Near bottom of screen
    SIZE: 60,
    JUMP_HEIGHT: 150,
    JUMP_DURATION: 400,
    SLIDE_DURATION: 400
  },
  
  // 3 Lanes (Left, Center, Right)
  LANES: {
    LEFT: 80,
    CENTER: 195,
    RIGHT: 310,
    POSITIONS: [80, 195, 310]
  },
  
  // Road/Track settings
  ROAD: {
    WIDTH: 300,
    LEFT_EDGE: 45,
    RIGHT_EDGE: 345
  },
  
  // Speed settings
  SPEED: {
    INITIAL: 5,
    MAX: 15,
    INCREMENT: 0.001
  },
  
  // Scoring
  SCORE: {
    PER_METER: 1,
    PER_COIN: 10
  },
  
  // Spawn settings
  SPAWN: {
    OBSTACLE_MIN: 800,
    OBSTACLE_MAX: 2000,
    COIN_MIN: 500,
    COIN_MAX: 1500
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
