/**
 * GameOverScene - Game Over Screen (Vertical Layout)
 */

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
    const { width, height } = this.scale;
    
    // Check if new high score
    const savedData = JSON.parse(localStorage.getItem('majapahitRunner') || '{}');
    const isNewHighScore = this.finalScore > (savedData.highScore || 0);
    
    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a05);
    
    // Overlay effect
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.7);
    overlay.fillRect(0, 0, width, height);
    
    // Game Over title
    this.add.text(width / 2, 150, '💀', { fontSize: '80px' }).setOrigin(0.5);
    
    this.add.text(width / 2, 250, 'GAME OVER', {
      fontSize: '42px',
      fontStyle: 'bold',
      color: '#E74C3C',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    // New High Score badge
    if (isNewHighScore) {
      this.add.text(width / 2, 300, '🎉 REKOR BARU! 🎉', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#FFD700'
      }).setOrigin(0.5);
      
      // Sparkle effect
      for (let i = 0; i < 10; i++) {
        const star = this.add.text(
          Phaser.Math.Between(50, width - 50),
          Phaser.Math.Between(100, 350),
          '✨',
          { fontSize: '20px' }
        );
        this.tweens.add({
          targets: star,
          alpha: 0,
          y: star.y - 50,
          duration: 1000,
          delay: i * 100,
          repeat: -1
        });
      }
    }
    
    // Score display
    const scoreY = isNewHighScore ? 380 : 340;
    
    this.add.text(width / 2, scoreY, 'JARAK', {
      fontSize: '18px',
      color: '#888888'
    }).setOrigin(0.5);
    
    this.add.text(width / 2, scoreY + 50, this.distance + 'm', {
      fontSize: '64px',
      fontStyle: 'bold',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    // Stats row
    const statsY = scoreY + 140;
    
    // Coins collected
    this.add.text(width / 2 - 80, statsY, '🪙', { fontSize: '32px' }).setOrigin(0.5);
    this.add.text(width / 2 - 40, statsY, '+' + this.coinsCollected, {
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#FFD700'
    }).setOrigin(0, 0.5);
    
    // Previous best
    this.add.text(width / 2 + 40, statsY, '🏆', { fontSize: '32px' }).setOrigin(0.5);
    this.add.text(width / 2 + 70, statsY, (savedData.highScore || 0) + 'm', {
      fontSize: '20px',
      color: '#AAAAAA'
    }).setOrigin(0, 0.5);
    
    // Buttons
    const btnY = height - 250;
    
    // Retry button
    const retryBtn = this.add.rectangle(width / 2, btnY, 220, 60, 0x27AE60)
      .setStrokeStyle(3, 0x1E8449)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => retryBtn.setScale(1.05))
      .on('pointerout', () => retryBtn.setScale(1))
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(300);
        this.time.delayedCall(300, () => {
          this.scene.start('GameScene');
        });
      });
    
    this.add.text(width / 2, btnY, '🔄 MAIN LAGI', {
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    // Menu button
    const menuBtn = this.add.rectangle(width / 2, btnY + 80, 220, 50, 0x555555)
      .setStrokeStyle(2, 0x333333)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => menuBtn.setScale(1.05))
      .on('pointerout', () => menuBtn.setScale(1))
      .on('pointerdown', () => {
        this.cameras.main.fadeOut(300);
        this.time.delayedCall(300, () => {
          this.scene.start('MenuScene');
        });
      });
    
    this.add.text(width / 2, btnY + 80, '🏠 MENU UTAMA', {
      fontSize: '18px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    // Share button (placeholder)
    const shareBtn = this.add.rectangle(width / 2, btnY + 150, 180, 45, 0x3498DB)
      .setStrokeStyle(2, 0x2980B9)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        // Copy score to clipboard
        const shareText = `🏃 Majapahit Runner\n📏 Jarak: ${this.distance}m\n🪙 Koin: ${this.coinsCollected}\n\n#MajapahitRunner #MAJA`;
        navigator.clipboard.writeText(shareText).then(() => {
          this.showToast('📋 Disalin ke clipboard!');
        });
      });
    
    this.add.text(width / 2, btnY + 150, '📤 Bagikan Skor', {
      fontSize: '16px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    // Fade in
    this.cameras.main.fadeIn(500);
  }
  
  showToast(message) {
    const { width, height } = this.scale;
    
    const toast = this.add.container(width / 2, height - 100);
    
    const bg = this.add.rectangle(0, 0, 250, 40, 0x27AE60, 0.9);
    const text = this.add.text(0, 0, message, {
      fontSize: '16px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    toast.add([bg, text]);
    toast.setAlpha(0);
    
    this.tweens.add({
      targets: toast,
      alpha: 1,
      y: height - 120,
      duration: 300,
      onComplete: () => {
        this.time.delayedCall(2000, () => {
          this.tweens.add({
            targets: toast,
            alpha: 0,
            duration: 300,
            onComplete: () => toast.destroy()
          });
        });
      }
    });
  }
}
