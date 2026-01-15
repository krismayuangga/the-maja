/**
 * PreloadScene - Asset loading scene
 * 
 * Creates placeholder textures for development
 * Real assets will be loaded when available
 */

import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Create loading UI
    this.createLoadingUI();
    
    // Generate placeholder textures instead of loading files
    this.generatePlaceholderTextures();
  }

  createLoadingUI() {
    const { width, height } = this.cameras.main;
    
    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a00);
    
    // Title
    this.add.text(width / 2, height / 2 - 100, '🏃', {
      fontSize: '64px'
    }).setOrigin(0.5);
    
    this.add.text(width / 2, height / 2 - 30, 'Majapahit Runner', {
      fontSize: '28px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700',
      stroke: '#8B4513',
      strokeThickness: 3
    }).setOrigin(0.5);
    
    // Loading bar background
    const barWidth = 280;
    const barHeight = 20;
    const barY = height / 2 + 50;
    
    this.add.rectangle(width / 2, barY, barWidth + 4, barHeight + 4, 0x8B4513);
    this.add.rectangle(width / 2, barY, barWidth, barHeight, 0x2d1810);
    
    // Loading text
    this.add.text(width / 2, barY + 40, 'Mempersiapkan Game...', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setOrigin(0.5);
  }

  generatePlaceholderTextures() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    
    // Player textures (64x64)
    this.createPlayerTexture(graphics, 'player_run', 0xffd700);
    this.createPlayerTexture(graphics, 'player_jump', 0xffaa00);
    this.createPlayerTexture(graphics, 'player_slide', 0xff8800);
    
    // Obstacle textures
    this.createObstacleTexture(graphics, 'obstacle_cart', 80, 50, 0x8B4513);
    this.createObstacleTexture(graphics, 'obstacle_pot', 40, 40, 0xCD853F);
    this.createObstacleTexture(graphics, 'obstacle_log', 60, 30, 0x654321);
    this.createObstacleTexture(graphics, 'obstacle_low', 80, 30, 0x5D4037);
    this.createObstacleTexture(graphics, 'obstacle_high', 60, 80, 0x795548);
    
    // Coin texture (32x32)
    graphics.clear();
    graphics.fillStyle(0xffd700, 1);
    graphics.fillCircle(16, 16, 14);
    graphics.fillStyle(0xffaa00, 1);
    graphics.fillCircle(16, 16, 10);
    graphics.generateTexture('coin', 32, 32);
    
    // Power-up textures
    this.createPowerupTexture(graphics, 'powerup_keris', 0xff0000);
    this.createPowerupTexture(graphics, 'powerup_magnet', 0x00ff00);
    this.createPowerupTexture(graphics, 'powerup_jimat', 0x00ffff);
    this.createPowerupTexture(graphics, 'powerup_kuda', 0xff00ff);
    this.createPowerupTexture(graphics, 'powerup_speed', 0xffff00);
    
    // Background textures
    this.createBackgroundTexture(graphics, 'bg_sky', 0x87CEEB);
    this.createBackgroundTexture(graphics, 'bg_trowulan_far', 0x4a3728);
    this.createBackgroundTexture(graphics, 'bg_trowulan_mid', 0x3d2817);
    
    // Ground texture
    graphics.clear();
    graphics.fillStyle(0x8B4513, 1);
    graphics.fillRect(0, 0, 64, 64);
    graphics.fillStyle(0x654321, 1);
    graphics.fillRect(0, 0, 32, 32);
    graphics.fillRect(32, 32, 32, 32);
    graphics.generateTexture('ground_brick', 64, 64);
    
    graphics.destroy();
  }

  createPlayerTexture(graphics, key, color) {
    graphics.clear();
    graphics.fillStyle(color, 1);
    graphics.fillRoundedRect(8, 4, 48, 56, 8);
    graphics.fillStyle(0x1a0a00, 1);
    graphics.fillCircle(32, 20, 8);
    graphics.generateTexture(key, 64, 64);
  }

  createObstacleTexture(graphics, key, w, h, color) {
    graphics.clear();
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, w, h);
    graphics.lineStyle(2, 0x1a0a00, 1);
    graphics.strokeRect(0, 0, w, h);
    graphics.generateTexture(key, w, h);
  }

  createPowerupTexture(graphics, key, color) {
    graphics.clear();
    graphics.fillStyle(color, 1);
    graphics.fillCircle(20, 20, 18);
    graphics.fillStyle(0xffffff, 0.5);
    graphics.fillCircle(15, 15, 6);
    graphics.generateTexture(key, 40, 40);
  }

  createBackgroundTexture(graphics, key, color) {
    graphics.clear();
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, 64, 64);
    graphics.generateTexture(key, 64, 64);
  }

  create() {
    // Small delay then go to menu
    this.time.delayedCall(500, () => {
      this.scene.start('MenuScene');
    });
  }
}
