/**
 * MenuScene - Main Menu (Vertical Layout)
 */

import { CHARACTERS } from '../config/gameConfig.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.scale;
    
    // Load saved data
    this.savedData = JSON.parse(localStorage.getItem('majapahitRunner') || '{}');
    
    // Background
    this.createBackground();
    
    // Title
    this.createTitle();
    
    // Main buttons
    this.createButtons();
    
    // Bottom stats
    this.createStats();
    
    // Fade in
    this.cameras.main.fadeIn(300);
  }

  createBackground() {
    const { width, height } = this.scale;
    
    // Gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x2C1810, 0x2C1810, 0x1a0a05, 0x1a0a05, 1);
    bg.fillRect(0, 0, width, height);
    
    // Decorative frame
    const frame = this.add.graphics();
    frame.lineStyle(4, 0xFFD700, 1);
    frame.strokeRect(20, 20, width - 40, height - 40);
    
    // Corner ornaments
    const corners = [
      { x: 20, y: 20 },
      { x: width - 20, y: 20 },
      { x: 20, y: height - 20 },
      { x: width - 20, y: height - 20 }
    ];
    corners.forEach(c => {
      this.add.circle(c.x, c.y, 8, 0xFFD700);
    });
    
    // Batik pattern (subtle)
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(40, width - 40);
      const y = Phaser.Math.Between(40, height - 40);
      this.add.circle(x, y, 2, 0xFFD700, 0.1);
    }
  }

  createTitle() {
    const { width } = this.scale;
    
    // Runner emoji
    this.add.text(width / 2 - 100, 100, '🏃', { fontSize: '48px' });
    
    // Game title
    this.add.text(width / 2 + 10, 90, 'MAJAPAHIT', {
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0, 0);
    
    this.add.text(width / 2 + 10, 130, 'RUNNER', {
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#B8860B',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0, 0);
    
    // Subtitle
    this.add.text(width / 2, 200, 'Lari Sang Kurir Kerajaan', {
      fontSize: '16px',
      fontStyle: 'italic',
      color: '#D4AF37'
    }).setOrigin(0.5);
  }

  createButtons() {
    const { width } = this.scale;
    const startY = 280;
    
    // MAIN (Play) button
    this.createButton(width / 2, startY, 200, 60, '▶️  MAIN', 0xFFD700, 0xB8860B, () => {
      this.cameras.main.fadeOut(300);
      this.time.delayedCall(300, () => {
        this.scene.start('GameScene');
      });
    });
    
    // Secondary buttons row
    const btnY = startY + 90;
    const btnWidth = 100;
    const gap = 15;
    
    // Toko (Shop)
    this.createButton(width / 2 - btnWidth - gap, btnY, btnWidth, 50, '🏪 Toko', 0x8B4513, 0x654321, () => {
      this.showShopPopup();
    });
    
    // Skor (Leaderboard)
    this.createButton(width / 2, btnY, btnWidth, 50, '🏆 Skor', 0x8B4513, 0x654321, () => {
      this.showScorePopup();
    });
    
    // Koleksi (Collection)
    this.createButton(width / 2 + btnWidth + gap, btnY, btnWidth, 50, '📚 Koleksi', 0x8B4513, 0x654321, () => {
      this.showCollectionPopup();
    });
    
    // Settings and Sound buttons (smaller, bottom row)
    const bottomY = btnY + 70;
    
    this.createButton(width / 2 - 40, bottomY, 60, 50, '⚙️', 0x555555, 0x333333, () => {
      this.showSettingsPopup();
    });
    
    this.createButton(width / 2 + 40, bottomY, 60, 50, '🔊', 0x555555, 0x333333, () => {
      // Toggle sound
    });
  }

  createButton(x, y, w, h, text, fillColor, strokeColor, callback) {
    const btn = this.add.rectangle(x, y, w, h, fillColor)
      .setStrokeStyle(3, strokeColor)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => btn.setScale(1.05))
      .on('pointerout', () => btn.setScale(1))
      .on('pointerdown', callback);
    
    this.add.text(x, y, text, {
      fontSize: w > 150 ? '24px' : '16px',
      fontStyle: 'bold',
      color: fillColor === 0xFFD700 ? '#1a0a05' : '#FFFFFF'
    }).setOrigin(0.5);
    
    return btn;
  }

  createStats() {
    const { width, height } = this.scale;
    
    // Coin display
    this.add.circle(50, height - 120, 18, 0xFFD700);
    this.add.text(50, height - 120, '🪙', { fontSize: '24px' }).setOrigin(0.5);
    this.add.text(80, height - 120, (this.savedData.totalCoins || 0).toString(), {
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#FFD700'
    }).setOrigin(0, 0.5);
    
    // High score
    this.add.text(50, height - 80, '🏆 Best: ' + (this.savedData.highScore || 0) + 'm', {
      fontSize: '16px',
      color: '#AAAAAA'
    });
    
    // Games played
    this.add.text(50, height - 55, '🎮 Games: ' + (this.savedData.gamesPlayed || 0), {
      fontSize: '14px',
      color: '#888888'
    });
    
    // Version and branding
    this.add.text(width - 40, height - 60, '$MAJA Token\nGame', {
      fontSize: '12px',
      color: '#666666',
      align: 'right'
    }).setOrigin(1, 0.5);
    
    this.add.text(width - 40, height - 30, 'v0.2.0', {
      fontSize: '10px',
      color: '#444444'
    }).setOrigin(1, 0.5);
  }

  // ==================
  // POPUP MENUS
  // ==================
  
  showPopup(title, content) {
    const { width, height } = this.scale;
    
    // Overlay
    this.popupOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.85)
      .setInteractive()
      .on('pointerdown', () => this.closePopup());
    
    // Popup container
    this.popupContainer = this.add.container(width / 2, height / 2);
    
    // Background
    const bg = this.add.rectangle(0, 0, width - 60, height - 200, 0x2C1810)
      .setStrokeStyle(3, 0xFFD700);
    
    // Title
    const titleText = this.add.text(0, -250, title, {
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#FFD700'
    }).setOrigin(0.5);
    
    // Close button
    const closeBtn = this.add.rectangle(140, -250, 40, 40, 0xE74C3C)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.closePopup());
    const closeX = this.add.text(140, -250, '✕', {
      fontSize: '24px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    this.popupContainer.add([bg, titleText, closeBtn, closeX]);
    
    // Add content
    if (typeof content === 'function') {
      content(this.popupContainer);
    }
  }
  
  closePopup() {
    if (this.popupOverlay) this.popupOverlay.destroy();
    if (this.popupContainer) this.popupContainer.destroy();
  }
  
  showShopPopup() {
    this.showPopup('🏪 TOKO', (container) => {
      // Characters for sale
      let y = -180;
      
      Object.values(CHARACTERS).forEach(char => {
        const charRow = this.add.container(0, y);
        
        // Emoji
        const emoji = this.add.text(-120, 0, char.emoji, { fontSize: '36px' }).setOrigin(0.5);
        
        // Name and desc
        const name = this.add.text(-70, -12, char.name, {
          fontSize: '18px',
          fontStyle: 'bold',
          color: '#FFD700'
        });
        const desc = this.add.text(-70, 10, char.description, {
          fontSize: '12px',
          color: '#AAAAAA'
        });
        
        // Price/Status
        let statusText;
        if (char.unlocked) {
          statusText = this.add.text(100, 0, '✅ Owned', {
            fontSize: '14px',
            color: '#27AE60'
          }).setOrigin(0.5);
        } else {
          const buyBtn = this.add.rectangle(100, 0, 80, 30, 0x27AE60)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
              const saved = JSON.parse(localStorage.getItem('majapahitRunner') || '{}');
              if ((saved.totalCoins || 0) >= char.price) {
                saved.totalCoins -= char.price;
                saved.unlockedCharacters = saved.unlockedCharacters || [];
                saved.unlockedCharacters.push(char.id);
                localStorage.setItem('majapahitRunner', JSON.stringify(saved));
                this.closePopup();
                this.showShopPopup();
              }
            });
          statusText = this.add.text(100, 0, '🪙 ' + char.price, {
            fontSize: '12px',
            color: '#FFFFFF'
          }).setOrigin(0.5);
          charRow.add(buyBtn);
        }
        
        charRow.add([emoji, name, desc, statusText]);
        container.add(charRow);
        y += 80;
      });
      
      // Current coins
      const coinInfo = this.add.text(0, 200, '🪙 Koin: ' + (this.savedData.totalCoins || 0), {
        fontSize: '18px',
        color: '#FFD700'
      }).setOrigin(0.5);
      container.add(coinInfo);
    });
  }
  
  showScorePopup() {
    this.showPopup('🏆 SKOR TERTINGGI', (container) => {
      const saved = this.savedData;
      
      // High score
      const highScore = this.add.text(0, -150, (saved.highScore || 0) + 'm', {
        fontSize: '64px',
        fontStyle: 'bold',
        color: '#FFD700'
      }).setOrigin(0.5);
      
      // Stats
      const stats = [
        { label: '🎮 Total Game', value: saved.gamesPlayed || 0 },
        { label: '📏 Total Jarak', value: (saved.totalDistance || 0) + 'm' },
        { label: '🪙 Total Koin', value: saved.totalCoins || 0 },
        { label: '⭐ Rata-rata', value: saved.gamesPlayed ? Math.floor((saved.totalDistance || 0) / saved.gamesPlayed) + 'm' : '0m' }
      ];
      
      let y = -20;
      stats.forEach(stat => {
        const row = this.add.text(0, y, stat.label + ': ' + stat.value, {
          fontSize: '18px',
          color: '#CCCCCC'
        }).setOrigin(0.5);
        container.add(row);
        y += 40;
      });
      
      container.add([highScore]);
    });
  }
  
  showCollectionPopup() {
    this.showPopup('📚 KOLEKSI', (container) => {
      const saved = this.savedData;
      const unlocked = saved.unlockedCharacters || ['jaya'];
      
      let y = -150;
      
      Object.values(CHARACTERS).forEach(char => {
        const isUnlocked = unlocked.includes(char.id);
        
        const row = this.add.container(0, y);
        
        // Emoji (gray if locked)
        const emoji = this.add.text(-100, 0, isUnlocked ? char.emoji : '🔒', {
          fontSize: '40px'
        }).setOrigin(0.5);
        if (!isUnlocked) emoji.setAlpha(0.5);
        
        // Info
        const name = this.add.text(-40, -15, isUnlocked ? char.name : '???', {
          fontSize: '20px',
          fontStyle: 'bold',
          color: isUnlocked ? '#FFD700' : '#666666'
        });
        
        const passive = this.add.text(-40, 10, isUnlocked ? char.passive : 'Belum terbuka', {
          fontSize: '14px',
          color: isUnlocked ? '#27AE60' : '#888888'
        });
        
        row.add([emoji, name, passive]);
        container.add(row);
        y += 90;
      });
    });
  }
  
  showSettingsPopup() {
    this.showPopup('⚙️ PENGATURAN', (container) => {
      // Reset data button
      const resetBtn = this.add.rectangle(0, -50, 200, 50, 0xE74C3C)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          localStorage.removeItem('majapahitRunner');
          this.closePopup();
          this.scene.restart();
        });
      const resetText = this.add.text(0, -50, '🗑️ Reset Data', {
        fontSize: '18px',
        color: '#FFFFFF'
      }).setOrigin(0.5);
      
      // Credits
      const credits = this.add.text(0, 100, 'Majapahit Runner\nby $MAJA Token Project\n\n🏛️ Lestarikan Budaya Nusantara', {
        fontSize: '14px',
        color: '#888888',
        align: 'center'
      }).setOrigin(0.5);
      
      container.add([resetBtn, resetText, credits]);
    });
  }
}
