/**
 * PreloadScene - Asset loading scene
 * 
 * Loads all game assets with progress bar
 */

import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Create loading UI
    this.createLoadingUI();
    
    // Load all game assets
    this.loadSprites();
    this.loadBackgrounds();
    this.loadUI();
    this.loadAudio();
  }

  createLoadingUI() {
    const { width, height } = this.cameras.main;
    
    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a00);
    
    // Title
    this.add.text(width / 2, height / 2 - 100, '🏃 Majapahit Runner', {
      fontSize: '48px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700',
      stroke: '#8B4513',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    // Loading bar background
    const barWidth = 400;
    const barHeight = 30;
    const barX = (width - barWidth) / 2;
    const barY = height / 2;
    
    this.add.rectangle(width / 2, barY, barWidth + 4, barHeight + 4, 0x8B4513);
    const progressBg = this.add.rectangle(width / 2, barY, barWidth, barHeight, 0x2d1810);
    
    // Loading bar fill
    const progressBar = this.add.rectangle(
      barX + 2,
      barY,
      0,
      barHeight - 4,
      0xffd700
    ).setOrigin(0, 0.5);
    
    // Loading text
    const loadingText = this.add.text(width / 2, barY + 40, 'Memuat...', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setOrigin(0.5);
    
    // Percentage text
    const percentText = this.add.text(width / 2, barY, '0%', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#1a0a00',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Update progress bar
    this.load.on('progress', (value) => {
      progressBar.width = (barWidth - 4) * value;
      percentText.setText(`${Math.round(value * 100)}%`);
    });
    
    // Update loading text with current file
    this.load.on('fileprogress', (file) => {
      loadingText.setText(`Memuat: ${file.key}`);
    });
    
    // Complete
    this.load.on('complete', () => {
      loadingText.setText('Selesai!');
    });
  }

  loadSprites() {
    // Player character sprites (placeholder - will use spritesheet)
    this.load.spritesheet('player_run', 'assets/sprites/player_run.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('player_jump', 'assets/sprites/player_jump.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('player_slide', 'assets/sprites/player_slide.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    
    // Obstacles
    this.load.image('obstacle_cart', 'assets/sprites/obstacle_cart.png');
    this.load.image('obstacle_pot', 'assets/sprites/obstacle_pot.png');
    this.load.image('obstacle_log', 'assets/sprites/obstacle_log.png');
    
    // Collectibles
    this.load.spritesheet('coin', 'assets/sprites/coin.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image('lontar', 'assets/sprites/lontar.png');
    
    // Power-ups
    this.load.image('powerup_keris', 'assets/sprites/powerup_keris.png');
    this.load.image('powerup_magnet', 'assets/sprites/powerup_magnet.png');
    this.load.image('powerup_jimat', 'assets/sprites/powerup_jimat.png');
  }

  loadBackgrounds() {
    // Zone backgrounds (parallax layers)
    // Layer 1 - Sky (farthest)
    this.load.image('bg_sky', 'assets/backgrounds/sky.png');
    
    // Layer 2 - Mountains/Buildings
    this.load.image('bg_trowulan_far', 'assets/backgrounds/trowulan_far.png');
    this.load.image('bg_hutan_far', 'assets/backgrounds/hutan_far.png');
    
    // Layer 3 - Middle ground
    this.load.image('bg_trowulan_mid', 'assets/backgrounds/trowulan_mid.png');
    this.load.image('bg_hutan_mid', 'assets/backgrounds/hutan_mid.png');
    
    // Layer 4 - Ground/Road
    this.load.image('ground_brick', 'assets/backgrounds/ground_brick.png');
    this.load.image('ground_dirt', 'assets/backgrounds/ground_dirt.png');
  }

  loadUI() {
    // UI elements
    this.load.image('btn_play', 'assets/ui/btn_play.png');
    this.load.image('btn_shop', 'assets/ui/btn_shop.png');
    this.load.image('btn_leaderboard', 'assets/ui/btn_leaderboard.png');
    this.load.image('btn_pause', 'assets/ui/btn_pause.png');
    this.load.image('icon_coin', 'assets/ui/icon_coin.png');
    this.load.image('icon_distance', 'assets/ui/icon_distance.png');
    this.load.image('panel', 'assets/ui/panel.png');
  }

  loadAudio() {
    // Music
    this.load.audio('music_menu', 'assets/audio/music_menu.mp3');
    this.load.audio('music_game', 'assets/audio/music_game.mp3');
    
    // Sound effects
    this.load.audio('sfx_jump', 'assets/audio/sfx_jump.mp3');
    this.load.audio('sfx_slide', 'assets/audio/sfx_slide.mp3');
    this.load.audio('sfx_coin', 'assets/audio/sfx_coin.mp3');
    this.load.audio('sfx_crash', 'assets/audio/sfx_crash.mp3');
    this.load.audio('sfx_powerup', 'assets/audio/sfx_powerup.mp3');
  }

  create() {
    // Create animations
    this.createAnimations();
    
    // Small delay then go to menu
    this.time.delayedCall(500, () => {
      this.scene.start('MenuScene');
    });
  }

  createAnimations() {
    // Player run animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player_run', { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1
    });
    
    // Player jump animation
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player_jump', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    });
    
    // Player slide animation
    this.anims.create({
      key: 'slide',
      frames: this.anims.generateFrameNumbers('player_slide', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    });
    
    // Coin spin animation
    this.anims.create({
      key: 'coin_spin',
      frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
  }
}
