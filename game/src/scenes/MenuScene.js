/**
 * MenuScene - Main menu with working popups
 */

import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a00);
    
    // Decorative border
    this.createBorder(width, height);
    
    // Title
    this.createTitle(width);
    
    // Menu buttons
    this.createMenuButtons(width, height);
    
    // Bottom info
    this.createBottomInfo(width, height);
    
    // Popup container (initially hidden)
    this.popupContainer = null;
  }

  createBorder(width, height) {
    const graphics = this.add.graphics();
    
    // Outer gold border
    graphics.lineStyle(4, 0xffd700, 1);
    graphics.strokeRect(8, 8, width - 16, height - 16);
    
    // Inner brown border
    graphics.lineStyle(2, 0x8B4513, 1);
    graphics.strokeRect(18, 18, width - 36, height - 36);
    
    // Corner decorations
    const corners = [
      { x: 18, y: 18 },
      { x: width - 18, y: 18 },
      { x: 18, y: height - 18 },
      { x: width - 18, y: height - 18 }
    ];
    
    corners.forEach(corner => {
      this.add.circle(corner.x, corner.y, 7, 0xffd700);
      this.add.circle(corner.x, corner.y, 3, 0x8B4513);
    });
  }

  createTitle(width) {
    // Main title
    this.add.text(width / 2, 90, '🏃 MAJAPAHIT', {
      fontSize: '48px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700',
      stroke: '#8B4513',
      strokeThickness: 5
    }).setOrigin(0.5);
    
    this.add.text(width / 2, 150, 'RUNNER', {
      fontSize: '64px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700',
      stroke: '#8B4513',
      strokeThickness: 5
    }).setOrigin(0.5);
    
    // Subtitle
    this.add.text(width / 2, 195, 'Lari Sang Kurir Kerajaan', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#b08d57',
      fontStyle: 'italic'
    }).setOrigin(0.5);
  }

  createMenuButtons(width, height) {
    const centerY = height / 2 + 40;
    
    // Play button (main)
    this.createButton(width / 2, centerY, '▶  MAIN', () => {
      this.scene.start('GameScene');
    }, true);
    
    // Secondary buttons row
    const secondaryY = centerY + 75;
    const spacing = 110;
    
    // Shop
    this.createButton(width / 2 - spacing, secondaryY, '🛒 Toko', () => {
      this.showShopPopup();
    });
    
    // Leaderboard
    this.createButton(width / 2, secondaryY, '🏆 Skor', () => {
      this.showScorePopup();
    });
    
    // Collection
    this.createButton(width / 2 + spacing, secondaryY, '📜 Koleksi', () => {
      this.showCollectionPopup();
    });
    
    // Settings row
    const settingsY = secondaryY + 60;
    this.createButton(width / 2 - 50, settingsY, '⚙️', () => {
      this.showSettingsPopup();
    }, false, true);
    
    this.createButton(width / 2 + 50, settingsY, '🔊', () => {
      this.toggleSound();
    }, false, true);
  }

  createButton(x, y, text, callback, isPrimary = false, isSmall = false) {
    const btnWidth = isSmall ? 55 : (isPrimary ? 180 : 100);
    const btnHeight = isSmall ? 45 : (isPrimary ? 55 : 45);
    const fontSize = isSmall ? '22px' : (isPrimary ? '26px' : '15px');
    
    // Button background
    const bg = this.add.rectangle(x, y, btnWidth, btnHeight, isPrimary ? 0xffd700 : 0x2d1810)
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
    
    bg.on('pointerdown', () => {
      bg.setScale(0.95);
      label.setScale(0.95);
    });
    
    bg.on('pointerup', () => {
      bg.setScale(1);
      label.setScale(1);
      callback();
    });
    
    return { bg, label };
  }

  createBottomInfo(width, height) {
    const savedData = this.getSavedData();
    
    // Coins display
    this.add.text(25, height - 45, `🪙 ${savedData.coins.toLocaleString()}`, {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#ffd700'
    });
    
    // High score
    this.add.text(25, height - 22, `🏆 Best: ${savedData.highScore.toLocaleString()}m`, {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: '#b08d57'
    });
    
    // Version & branding
    this.add.text(width - 25, height - 45, '$MAJA Token Game', {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setOrigin(1, 0);
    
    this.add.text(width - 25, height - 22, 'v0.1.0 MVP', {
      fontSize: '11px',
      fontFamily: 'Arial',
      color: '#666666'
    }).setOrigin(1, 0);
  }

  getSavedData() {
    try {
      const data = JSON.parse(localStorage.getItem('majapahit_runner') || '{}');
      return {
        coins: data.coins || 0,
        highScore: data.highScore || 0,
        totalRuns: data.totalRuns || 0,
        totalDistance: data.totalDistance || 0
      };
    } catch (e) {
      return { coins: 0, highScore: 0, totalRuns: 0, totalDistance: 0 };
    }
  }

  // === POPUP SYSTEM ===
  
  showPopup(title, content) {
    const { width, height } = this.cameras.main;
    
    // Close existing popup
    this.closePopup();
    
    this.popupContainer = this.add.container(width / 2, height / 2);
    
    // Backdrop
    const backdrop = this.add.rectangle(0, 0, width, height, 0x000000, 0.85)
      .setInteractive();
    
    // Popup box
    const boxWidth = Math.min(width - 40, 350);
    const boxHeight = Math.min(height - 80, 400);
    const box = this.add.rectangle(0, 0, boxWidth, boxHeight, 0x2d1810)
      .setStrokeStyle(3, 0xffd700);
    
    // Title
    const titleText = this.add.text(0, -boxHeight/2 + 35, title, {
      fontSize: '28px',
      fontFamily: 'Georgia',
      color: '#ffd700'
    }).setOrigin(0.5);
    
    // Title underline
    const underline = this.add.rectangle(0, -boxHeight/2 + 60, boxWidth - 40, 2, 0x8B4513);
    
    // Content
    const contentText = this.add.text(0, 0, content, {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: boxWidth - 50 },
      lineSpacing: 8
    }).setOrigin(0.5);
    
    // Close button
    const closeBtn = this.add.text(0, boxHeight/2 - 40, '✖ TUTUP', {
      fontSize: '18px',
      backgroundColor: '#8B4513',
      padding: { x: 25, y: 10 },
      color: '#ffd700'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
    closeBtn.on('pointerup', () => this.closePopup());
    closeBtn.on('pointerover', () => closeBtn.setScale(1.05));
    closeBtn.on('pointerout', () => closeBtn.setScale(1));
    
    // Add all to container
    this.popupContainer.add([backdrop, box, titleText, underline, contentText, closeBtn]);
    
    // Animate in
    this.popupContainer.setAlpha(0);
    this.tweens.add({
      targets: this.popupContainer,
      alpha: 1,
      duration: 200
    });
  }

  closePopup() {
    if (this.popupContainer) {
      this.popupContainer.destroy();
      this.popupContainer = null;
    }
  }

  showShopPopup() {
    const savedData = this.getSavedData();
    const content = `
🪙 Koin Anda: ${savedData.coins.toLocaleString()}

━━━━━━━━━━━━━━━━

🛡️ Perisai (100 🪙)
Lindungi dari 1x tabrakan

⚡ Boost Awal (200 🪙)
Mulai dengan kecepatan tinggi

🧲 Magnet Koin (150 🪙)
Tarik koin secara otomatis

━━━━━━━━━━━━━━━━

⚠️ Toko akan tersedia di versi berikutnya!

Butuh $MAJA token untuk
pembelian in-game
    `;
    this.showPopup('🛒 TOKO', content);
  }

  showScorePopup() {
    const savedData = this.getSavedData();
    const content = `
🏆 STATISTIK ANDA

━━━━━━━━━━━━━━━━

📏 Jarak Terjauh
${savedData.highScore.toLocaleString()} meter

🏃 Total Lari
${savedData.totalRuns.toLocaleString()} kali

📍 Total Jarak
${savedData.totalDistance.toLocaleString()} meter

🪙 Total Koin
${savedData.coins.toLocaleString()} koin

━━━━━━━━━━━━━━━━

🌐 Papan Peringkat Global
akan tersedia dengan
koneksi blockchain $MAJA
    `;
    this.showPopup('🏆 SKOR', content);
  }

  showCollectionPopup() {
    const content = `
📜 KOLEKSI LONTAR

━━━━━━━━━━━━━━━━

Kumpulkan fragmen sejarah
Majapahit saat bermain!

🔒 Prasasti Trowulan
🔒 Kitab Negarakertagama  
🔒 Relief Candi Penataran
🔒 Peta Nusantara Kuno
🔒 Legenda Gajah Mada

━━━━━━━━━━━━━━━━

0 / 5 Terkumpul

⚠️ Fitur akan tersedia
di update berikutnya!
    `;
    this.showPopup('📜 KOLEKSI', content);
  }

  showSettingsPopup() {
    const content = `
⚙️ PENGATURAN

━━━━━━━━━━━━━━━━

🔊 Suara: ON
🎵 Musik: ON
📳 Getar: ON

━━━━━━━━━━━━━━━━

🌐 Bahasa: Indonesia

━━━━━━━━━━━━━━━━

⚠️ Pengaturan lengkap
akan tersedia di versi
berikutnya!
    `;
    this.showPopup('⚙️ PENGATURAN', content);
  }

  toggleSound() {
    // TODO: Implement sound toggle
    this.showPopup('🔊 SUARA', `
Suara Game: ON

━━━━━━━━━━━━━━━━

Klik untuk toggle ON/OFF

(Fitur audio akan tersedia
setelah asset musik
gamelan ditambahkan)
    `);
  }
}
