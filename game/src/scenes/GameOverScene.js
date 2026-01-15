/**
 * GameOverScene - Game over screen
 * 
 * Shows final score, coins collected, and options to retry or return to menu
 */

import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.coinsCollected = data.coins || 0;
    this.distance = data.distance || 0;
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Dark overlay background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a00, 0.95);
    
    // Decorative border
    this.createBorder();
    
    // Game Over title
    this.add.text(width / 2, 100, '💀 GAME OVER', {
      fontSize: '48px',
      fontFamily: 'Georgia, serif',
      color: '#ff4444',
      stroke: '#1a0a00',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    // Stats panel
    this.createStatsPanel();
    
    // Check for new high score
    this.checkHighScore();
    
    // Buttons
    this.createButtons();
    
    // Play again hint
    this.add.text(width / 2, height - 40, 'Tekan SPACE untuk main lagi', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#666'
    }).setOrigin(0.5);
    
    // Keyboard shortcut
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }

  createBorder() {
    const { width, height } = this.cameras.main;
    const graphics = this.add.graphics();
    
    // Gold border
    graphics.lineStyle(4, 0xffd700, 1);
    graphics.strokeRect(30, 30, width - 60, height - 60);
    
    // Inner border
    graphics.lineStyle(2, 0x8B4513, 1);
    graphics.strokeRect(40, 40, width - 80, height - 80);
  }

  createStatsPanel() {
    const { width, height } = this.cameras.main;
    const centerY = height / 2 - 20;
    
    // Panel background
    this.add.rectangle(width / 2, centerY, 350, 200, 0x2d1810)
      .setStrokeStyle(3, 0xffd700);
    
    // Distance
    this.add.text(width / 2, centerY - 60, '📍 Jarak', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setOrigin(0.5);
    
    this.add.text(width / 2, centerY - 30, `${this.distance.toLocaleString()} m`, {
      fontSize: '36px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700'
    }).setOrigin(0.5);
    
    // Divider
    this.add.rectangle(width / 2, centerY + 5, 280, 2, 0x8B4513);
    
    // Coins
    this.add.text(width / 2 - 70, centerY + 40, '🪙 Koin', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setOrigin(0.5);
    
    this.add.text(width / 2 - 70, centerY + 65, this.coinsCollected.toString(), {
      fontSize: '28px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700'
    }).setOrigin(0.5);
    
    // Score
    this.add.text(width / 2 + 70, centerY + 40, '⭐ Skor', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setOrigin(0.5);
    
    this.add.text(width / 2 + 70, centerY + 65, this.finalScore.toLocaleString(), {
      fontSize: '28px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700'
    }).setOrigin(0.5);
  }

  checkHighScore() {
    const { width, height } = this.cameras.main;
    
    try {
      const saved = JSON.parse(localStorage.getItem('majapahit_runner') || '{}');
      const highScore = saved.highScore || 0;
      
      if (this.distance >= highScore && this.distance > 0) {
        // New high score!
        this.add.text(width / 2, 160, '🎉 REKOR BARU! 🎉', {
          fontSize: '28px',
          fontFamily: 'Arial',
          color: '#ffd700'
        }).setOrigin(0.5);
        
        // Animate
        this.tweens.add({
          targets: this.children.list[this.children.list.length - 1],
          scale: { from: 0.8, to: 1.1 },
          duration: 500,
          yoyo: true,
          repeat: -1
        });
      } else {
        // Show current high score
        this.add.text(width / 2, 160, `🏆 Rekor: ${highScore.toLocaleString()} m`, {
          fontSize: '20px',
          fontFamily: 'Arial',
          color: '#b08d57'
        }).setOrigin(0.5);
      }
    } catch (e) {
      console.log('No saved data');
    }
  }

  createButtons() {
    const { width, height } = this.cameras.main;
    const buttonY = height / 2 + 130;
    
    // Retry button
    this.createButton(width / 2 - 100, buttonY, '🔄 LAGI', () => {
      this.scene.start('GameScene');
    }, true);
    
    // Menu button
    this.createButton(width / 2 + 100, buttonY, '🏠 MENU', () => {
      this.scene.start('MenuScene');
    });
  }

  createButton(x, y, text, callback, isPrimary = false) {
    const width = 150;
    const height = 50;
    
    // Button background
    const bg = this.add.rectangle(x, y, width, height, isPrimary ? 0xffd700 : 0x2d1810)
      .setStrokeStyle(3, isPrimary ? 0x8B4513 : 0xffd700)
      .setInteractive({ useHandCursor: true });
    
    // Button text
    const label = this.add.text(x, y, text, {
      fontSize: '20px',
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
    
    bg.on('pointerdown', () => {
      bg.setScale(0.95);
    });
    
    bg.on('pointerup', () => {
      callback();
    });
    
    return { bg, label };
  }
}
