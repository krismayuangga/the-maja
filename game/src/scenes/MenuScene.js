/**
 * MenuScene - Main menu
 * 
 * Displays title, play button, and navigation options
 */

import Phaser from 'phaser';
import { CHARACTERS } from '../config/gameConfig.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a00);
    
    // Decorative border
    this.createBorder();
    
    // Title
    this.createTitle();
    
    // Menu buttons
    this.createMenuButtons();
    
    // Bottom info
    this.createBottomInfo();
    
    // Play background music
    // this.sound.play('music_menu', { loop: true, volume: 0.5 });
  }

  createBorder() {
    const { width, height } = this.cameras.main;
    const graphics = this.add.graphics();
    
    // Outer gold border
    graphics.lineStyle(4, 0xffd700, 1);
    graphics.strokeRect(10, 10, width - 20, height - 20);
    
    // Inner brown border
    graphics.lineStyle(2, 0x8B4513, 1);
    graphics.strokeRect(20, 20, width - 40, height - 40);
    
    // Corner decorations
    const corners = [
      { x: 20, y: 20 },
      { x: width - 20, y: 20 },
      { x: 20, y: height - 20 },
      { x: width - 20, y: height - 20 }
    ];
    
    corners.forEach(corner => {
      this.add.circle(corner.x, corner.y, 8, 0xffd700);
      this.add.circle(corner.x, corner.y, 4, 0x8B4513);
    });
  }

  createTitle() {
    const { width } = this.cameras.main;
    
    // Main title
    this.add.text(width / 2, 100, '🏃 MAJAPAHIT', {
      fontSize: '56px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700',
      stroke: '#8B4513',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    this.add.text(width / 2, 160, 'RUNNER', {
      fontSize: '72px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700',
      stroke: '#8B4513',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // Subtitle
    this.add.text(width / 2, 210, 'Lari Sang Kurir Kerajaan', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#b08d57',
      fontStyle: 'italic'
    }).setOrigin(0.5);
  }

  createMenuButtons() {
    const { width, height } = this.cameras.main;
    const buttonY = height / 2 + 30;
    
    // Play button (main)
    this.createButton(width / 2, buttonY, '▶  MAIN', () => {
      this.scene.start('GameScene');
    }, true);
    
    // Secondary buttons
    const secondaryY = buttonY + 80;
    const buttonSpacing = 140;
    
    // Shop
    this.createButton(width / 2 - buttonSpacing, secondaryY, '🛒 Toko', () => {
      console.log('Shop clicked');
      // this.scene.start('ShopScene');
    });
    
    // Leaderboard
    this.createButton(width / 2, secondaryY, '🏆 Skor', () => {
      console.log('Leaderboard clicked');
      // this.scene.start('LeaderboardScene');
    });
    
    // Collection
    this.createButton(width / 2 + buttonSpacing, secondaryY, '📜 Koleksi', () => {
      console.log('Collection clicked');
      // this.scene.start('LontarScene');
    });
    
    // Settings (smaller, bottom)
    const settingsY = secondaryY + 70;
    this.createButton(width / 2 - 70, settingsY, '⚙️', () => {
      console.log('Settings clicked');
    }, false, true);
    
    this.createButton(width / 2 + 70, settingsY, '🔊', () => {
      console.log('Sound toggle clicked');
    }, false, true);
  }

  createButton(x, y, text, callback, isPrimary = false, isSmall = false) {
    const width = isSmall ? 60 : (isPrimary ? 200 : 120);
    const height = isSmall ? 50 : (isPrimary ? 60 : 50);
    const fontSize = isSmall ? '24px' : (isPrimary ? '28px' : '18px');
    
    // Button background
    const bg = this.add.rectangle(x, y, width, height, isPrimary ? 0xffd700 : 0x2d1810)
      .setStrokeStyle(3, isPrimary ? 0x8B4513 : 0xffd700)
      .setInteractive({ useHandCursor: true });
    
    // Button text
    const label = this.add.text(x, y, text, {
      fontSize: fontSize,
      fontFamily: 'Arial',
      color: isPrimary ? '#1a0a00' : '#ffd700',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Hover effects
    bg.on('pointerover', () => {
      bg.setScale(1.05);
      label.setScale(1.05);
    });
    
    bg.on('pointerout', () => {
      bg.setScale(1);
      label.setScale(1);
    });
    
    // Click effect
    bg.on('pointerdown', () => {
      bg.setScale(0.95);
      label.setScale(0.95);
    });
    
    bg.on('pointerup', () => {
      bg.setScale(1.05);
      label.setScale(1.05);
      // this.sound.play('sfx_click');
      callback();
    });
    
    return { bg, label };
  }

  createBottomInfo() {
    const { width, height } = this.cameras.main;
    
    // Player stats (if saved)
    const savedData = this.getSavedData();
    
    // Coins display
    this.add.text(30, height - 50, `🪙 ${savedData.coins.toLocaleString()}`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffd700'
    });
    
    // High score
    this.add.text(30, height - 25, `🏆 Best: ${savedData.highScore.toLocaleString()}m`, {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#b08d57'
    });
    
    // Version
    this.add.text(width - 30, height - 25, 'v0.1.0 MVP', {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: '#666'
    }).setOrigin(1, 0.5);
    
    // Token info
    this.add.text(width - 30, height - 50, '$MAJA Token Game', {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setOrigin(1, 0.5);
  }

  getSavedData() {
    try {
      const saved = localStorage.getItem('majapahit_runner');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.log('No saved data');
    }
    
    return {
      coins: 0,
      highScore: 0,
      level: 1,
      xp: 0,
      characters: ['jaya'],
      selectedCharacter: 'jaya'
    };
  }
}
