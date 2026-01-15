/**
 * GameScene - Main gameplay
 * 
 * Endless runner: Player stays in place, world moves left
 * Player can JUMP (avoid ground obstacles) and SLIDE (avoid flying obstacles)
 * NO lane changing - single lane gameplay for mobile
 */

import Phaser from 'phaser';
import { GAME } from '../config/gameConfig.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    // Game state
    this.score = 0;
    this.distance = 0;
    this.coins = 0;
    this.gameSpeed = GAME.SPEED.INITIAL;
    this.isGameOver = false;
    this.isPaused = false;
    
    // Player state
    this.isJumping = false;
    this.isSliding = false;
    this.canJump = true;
    
    // Current zone
    this.currentZone = 'trowulan';
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Create game layers (order matters!)
    this.createBackground(width, height);
    this.createGround(width, height);
    this.createPlayer(width, height);
    this.createUI(width, height);
    this.createGroups();
    
    // Setup
    this.setupInput();
    this.setupCollisions();
    this.startSpawners();
  }

  createBackground(width, height) {
    // Sky gradient
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE0F7FA, 0xE0F7FA, 1);
    sky.fillRect(0, 0, width, height * 0.6);
    
    // Distant mountains/temple silhouette
    this.add.rectangle(width / 2, height * 0.35, width, height * 0.15, 0x5D4037);
    
    // Mid ground (trees/buildings)
    this.add.rectangle(width / 2, height * 0.45, width, height * 0.1, 0x4E342E);
  }

  createGround(width, height) {
    const groundY = height * 0.75;
    this.groundY = groundY;
    
    // Ground visual - brown earth
    this.add.rectangle(width / 2, groundY + 50, width, 100, 0x8B4513);
    
    // Ground top line
    this.add.rectangle(width / 2, groundY, width, 6, 0x5D4037);
    
    // Scrolling ground pattern (using graphics)
    this.groundLines = this.add.graphics();
    this.groundLines.lineStyle(2, 0x6D4C41, 0.5);
    for (let i = 0; i < width + 100; i += 60) {
      this.groundLines.lineBetween(i, groundY + 10, i - 30, groundY + 100);
    }
    
    // Physics ground (invisible)
    const groundBody = this.add.rectangle(width / 2, groundY + 15, width, 30, 0x000000, 0);
    this.physics.add.existing(groundBody, true);
    this.ground = groundBody;
  }

  createPlayer(width, height) {
    const playerX = width * 0.15; // Player at 15% from left
    const playerY = this.groundY - 50;
    
    this.playerX = playerX;
    
    // Player body (physics)
    this.player = this.add.rectangle(playerX, playerY, 50, 90, 0xFFD700);
    this.player.setStrokeStyle(3, 0xB8860B);
    this.physics.add.existing(this.player);
    this.player.body.setGravityY(1500);
    this.player.body.setCollideWorldBounds(true);
    
    // Player emoji
    this.playerEmoji = this.add.text(playerX, playerY - 10, '🏃', {
      fontSize: '45px'
    }).setOrigin(0.5);
    
    // Store original size for slide
    this.playerOriginalHeight = 90;
    this.playerSlideHeight = 35;
  }

  createUI(width, height) {
    // Top bar background
    this.add.rectangle(width / 2, 35, width, 70, 0x000000, 0.4);
    
    // Distance/Score (center)
    this.scoreText = this.add.text(width / 2, 30, '0', {
      fontSize: '42px',
      fontFamily: 'Georgia, serif',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    this.add.text(width / 2, 58, 'meter', {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    // Coins (left)
    this.coinText = this.add.text(15, 30, '🪙 0', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#FFD700'
    }).setOrigin(0, 0.5);
    
    // Zone indicator
    this.zoneText = this.add.text(15, 55, '📍 Trowulan', {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: '#FFFFFF'
    });
    
    // Pause button (right)
    const pauseBtn = this.add.text(width - 15, 35, '⏸️', {
      fontSize: '32px',
      backgroundColor: '#2196F3',
      padding: { x: 8, y: 4 }
    }).setOrigin(1, 0.5).setInteractive({ useHandCursor: true });
    
    pauseBtn.on('pointerup', () => this.togglePause());
    
    // Mobile controls hint
    this.add.text(width / 2, height - 20, '⬆️ Tap = Lompat | ⬇️ Swipe Down = Slide', {
      fontSize: '12px',
      color: '#FFFFFF',
      backgroundColor: '#00000066',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
  }

  createGroups() {
    this.obstacles = this.physics.add.group();
    this.coinGroup = this.physics.add.group();
  }

  setupInput() {
    // Keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Touch - tap/swipe detection
    this.input.on('pointerdown', (pointer) => {
      this.touchStartY = pointer.y;
      this.touchStartTime = Date.now();
    });
    
    this.input.on('pointerup', (pointer) => {
      if (this.isGameOver || this.isPaused) return;
      
      const deltaY = pointer.y - this.touchStartY;
      const deltaTime = Date.now() - this.touchStartTime;
      
      if (deltaTime < 300) {
        if (deltaY > 40) {
          this.slide(); // Swipe down
        } else {
          this.jump(); // Tap or swipe up = jump
        }
      }
    });
  }

  setupCollisions() {
    // Player vs ground
    this.physics.add.collider(this.player, this.ground, () => {
      if (this.isJumping) {
        this.isJumping = false;
        this.canJump = true;
      }
    });
    
    // Player vs obstacles
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
    
    // Player vs coins
    this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);
  }

  startSpawners() {
    // Obstacle spawner
    this.obstacleTimer = this.time.addEvent({
      delay: 1800,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });
    
    // Coin spawner
    this.coinTimer = this.time.addEvent({
      delay: 1000,
      callback: this.spawnCoin,
      callbackScope: this,
      loop: true
    });
  }

  // === PLAYER ACTIONS ===
  
  jump() {
    if (!this.canJump || this.isSliding || this.isGameOver) return;
    
    this.isJumping = true;
    this.canJump = false;
    this.player.body.setVelocityY(-700);
    
    // Jump animation
    this.playerEmoji.setText('🦘');
    this.time.delayedCall(500, () => {
      if (!this.isSliding && !this.isGameOver) this.playerEmoji.setText('🏃');
    });
  }

  slide() {
    if (this.isJumping || this.isSliding || this.isGameOver) return;
    
    this.isSliding = true;
    
    // Shrink player
    this.player.setSize(50, this.playerSlideHeight);
    this.player.y = this.groundY - this.playerSlideHeight / 2 - 5;
    this.player.body.setSize(50, this.playerSlideHeight);
    
    this.playerEmoji.setText('🏊');
    this.playerEmoji.y = this.player.y;
    
    // End slide
    this.time.delayedCall(700, () => {
      if (this.isGameOver) return;
      this.isSliding = false;
      this.player.setSize(50, this.playerOriginalHeight);
      this.player.y = this.groundY - this.playerOriginalHeight / 2 + 5;
      this.player.body.setSize(50, this.playerOriginalHeight);
      this.playerEmoji.setText('🏃');
    });
  }

  // === SPAWNERS ===
  
  spawnObstacle() {
    if (this.isGameOver || this.isPaused) return;
    
    const { width } = this.cameras.main;
    const x = width + 60;
    
    // Random obstacle type: ground (jump over) or flying (slide under)
    const isFlying = Phaser.Math.Between(0, 100) < 25; // 25% flying
    
    let obstacle;
    if (isFlying) {
      // Flying obstacle - need to slide under
      const y = this.groundY - 90;
      obstacle = this.add.rectangle(x, y, 70, 35, 0xFF5722);
      obstacle.setStrokeStyle(3, 0xBF360C);
      obstacle.obstacleType = 'flying';
      
      // Add icon
      const icon = this.add.text(x, y, '🦅', { fontSize: '35px' }).setOrigin(0.5);
      obstacle.icon = icon;
    } else {
      // Ground obstacle - need to jump over
      const obstacleHeight = Phaser.Math.Between(45, 75);
      const y = this.groundY - obstacleHeight / 2;
      obstacle = this.add.rectangle(x, y, 45, obstacleHeight, 0xF44336);
      obstacle.setStrokeStyle(3, 0xB71C1C);
      obstacle.obstacleType = 'ground';
      obstacle.obstacleHeight = obstacleHeight;
      
      // Add icon  
      const icon = this.add.text(x, y - 5, '🪨', { fontSize: '32px' }).setOrigin(0.5);
      obstacle.icon = icon;
    }
    
    this.physics.add.existing(obstacle);
    obstacle.body.setVelocityX(-this.gameSpeed);
    obstacle.body.setAllowGravity(false);
    obstacle.body.setImmovable(true);
    
    this.obstacles.add(obstacle);
    
    // Vary spawn delay based on speed
    const minDelay = Math.max(900, 1800 - this.distance);
    const maxDelay = Math.max(1400, 2800 - this.distance);
    this.obstacleTimer.delay = Phaser.Math.Between(minDelay, maxDelay);
  }

  spawnCoin() {
    if (this.isGameOver || this.isPaused) return;
    
    const { width } = this.cameras.main;
    const x = width + 40;
    
    // Random height: ground level, low jump, high jump
    const heights = [
      this.groundY - 35,   // Ground level
      this.groundY - 90,   // Low jump
      this.groundY - 150   // High jump
    ];
    const y = Phaser.Math.RND.pick(heights);
    
    // Create coin
    const coin = this.add.circle(x, y, 16, 0xFFD700);
    coin.setStrokeStyle(3, 0xFFA000);
    
    // Coin symbol
    const symbol = this.add.text(x, y, '🪙', { fontSize: '22px' }).setOrigin(0.5);
    coin.symbol = symbol;
    
    this.physics.add.existing(coin);
    coin.body.setVelocityX(-this.gameSpeed);
    coin.body.setAllowGravity(false);
    coin.body.setCircle(16);
    
    this.coinGroup.add(coin);
    
    // Coin animation
    this.tweens.add({
      targets: [coin, symbol],
      y: y - 8,
      duration: 250,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Vary spawn delay
    this.coinTimer.delay = Phaser.Math.Between(700, 1400);
  }

  // === COLLISIONS ===
  
  hitObstacle(playerRect, obstacle) {
    // Flying obstacle - only hit if not sliding
    if (obstacle.obstacleType === 'flying') {
      if (this.isSliding) {
        return; // Dodged!
      }
    }
    
    // Ground obstacle - only hit if not jumping high enough
    if (obstacle.obstacleType === 'ground') {
      const playerBottom = this.player.y + this.player.height / 2;
      const obstacleTop = obstacle.y - obstacle.height / 2;
      if (playerBottom < obstacleTop + 15) {
        return; // Jumped over!
      }
    }
    
    this.gameOver();
  }

  collectCoin(playerRect, coin) {
    // Remove coin and symbol
    if (coin.symbol) coin.symbol.destroy();
    coin.destroy();
    
    this.coins++;
    this.score += 10;
    this.coinText.setText(`🪙 ${this.coins}`);
    
    // Collect effect
    this.tweens.add({
      targets: this.coinText,
      scale: { from: 1.3, to: 1 },
      duration: 150
    });
  }

  // === GAME STATE ===
  
  togglePause() {
    this.isPaused = !this.isPaused;
    
    const { width, height } = this.cameras.main;
    
    if (this.isPaused) {
      this.physics.pause();
      
      // Pause overlay
      this.pauseOverlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.85);
      this.pauseText = this.add.text(width/2, height/2 - 60, '⏸️ PAUSE', {
        fontSize: '42px',
        fontFamily: 'Georgia',
        color: '#FFD700'
      }).setOrigin(0.5);
      
      // Resume button
      this.resumeBtn = this.add.text(width/2, height/2 + 10, '▶️ LANJUT', {
        fontSize: '26px',
        backgroundColor: '#4CAF50',
        padding: { x: 25, y: 12 },
        color: '#FFFFFF'
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      
      this.resumeBtn.on('pointerup', () => this.togglePause());
      
      // Menu button
      this.menuBtn = this.add.text(width/2, height/2 + 80, '🏠 MENU UTAMA', {
        fontSize: '22px',
        backgroundColor: '#F44336',
        padding: { x: 25, y: 12 },
        color: '#FFFFFF'
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      
      this.menuBtn.on('pointerup', () => {
        this.scene.start('MenuScene');
      });
      
    } else {
      this.physics.resume();
      this.pauseOverlay?.destroy();
      this.pauseText?.destroy();
      this.resumeBtn?.destroy();
      this.menuBtn?.destroy();
    }
  }

  gameOver() {
    if (this.isGameOver) return;
    this.isGameOver = true;
    
    this.physics.pause();
    this.obstacleTimer?.destroy();
    this.coinTimer?.destroy();
    
    // Crash animation
    this.playerEmoji.setText('💥');
    this.tweens.add({
      targets: this.player,
      angle: 90,
      alpha: 0.5,
      duration: 300
    });
    
    // Save and go to game over
    this.saveScore();
    
    this.time.delayedCall(1200, () => {
      this.scene.start('GameOverScene', {
        score: Math.floor(this.distance),
        coins: this.coins,
        distance: Math.floor(this.distance)
      });
    });
  }

  saveScore() {
    try {
      const saved = JSON.parse(localStorage.getItem('majapahit_runner') || '{}');
      saved.coins = (saved.coins || 0) + this.coins;
      saved.totalDistance = (saved.totalDistance || 0) + Math.floor(this.distance);
      saved.totalRuns = (saved.totalRuns || 0) + 1;
      if (this.distance > (saved.highScore || 0)) {
        saved.highScore = Math.floor(this.distance);
      }
      localStorage.setItem('majapahit_runner', JSON.stringify(saved));
    } catch (e) {
      console.error('Save failed:', e);
    }
  }

  // === UPDATE LOOP ===
  
  update(time, delta) {
    if (this.isGameOver || this.isPaused) return;
    
    // Increase speed gradually
    if (this.gameSpeed < GAME.SPEED.MAX) {
      this.gameSpeed += 0.03;
    }
    
    // Update distance
    this.distance += (this.gameSpeed * delta) / 4000;
    this.scoreText.setText(Math.floor(this.distance).toString());
    
    // Update obstacles and remove off-screen
    this.obstacles.getChildren().forEach(obstacle => {
      obstacle.body.setVelocityX(-this.gameSpeed);
      if (obstacle.icon) {
        obstacle.icon.x = obstacle.x;
        obstacle.icon.y = obstacle.y - (obstacle.obstacleType === 'ground' ? 5 : 0);
      }
      if (obstacle.x < -80) {
        if (obstacle.icon) obstacle.icon.destroy();
        obstacle.destroy();
      }
    });
    
    // Update coins
    this.coinGroup.getChildren().forEach(coin => {
      coin.body.setVelocityX(-this.gameSpeed);
      if (coin.symbol) coin.symbol.x = coin.x;
      if (coin.x < -40) {
        if (coin.symbol) coin.symbol.destroy();
        coin.destroy();
      }
    });
    
    // Keyboard input
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || 
        Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.jump();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.slide();
    }
    
    // Sync emoji with player (when not sliding)
    if (!this.isSliding) {
      this.playerEmoji.x = this.player.x;
      this.playerEmoji.y = this.player.y - 10;
    }
    
    // Zone changes based on distance
    this.updateZone();
  }
  
  updateZone() {
    const zones = ['Trowulan', 'Hutan Jati', 'Pelabuhan', 'Candi Penataran', 'Gunung Bromo'];
    const zoneIndex = Math.min(Math.floor(this.distance / 500), zones.length - 1);
    const zoneName = zones[zoneIndex];
    if (this.zoneText.text !== `📍 ${zoneName}`) {
      this.zoneText.setText(`📍 ${zoneName}`);
    }
  }
}
