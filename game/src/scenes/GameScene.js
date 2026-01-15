/**
 * GameScene - Vertical Endless Runner
 * Player runs FROM BOTTOM TO TOP
 * Obstacles come from top, move down
 */

import { GAME, ZONES } from '../config/gameConfig.js';

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
    this.currentLane = 1; // 0=left, 1=center, 2=right
    this.isJumping = false;
    this.isSliding = false;
    this.canMove = true;
    
    // Current zone
    this.currentZone = ZONES.trowulan;
  }

  create() {
    const { width, height } = this.scale;
    
    // Create game elements
    this.createBackground();
    this.createRoad();
    this.createPlayer();
    this.createUI();
    this.createGroups();
    this.setupInput();
    this.setupTimers();
    
    // Start game
    this.cameras.main.fadeIn(500);
  }

  createBackground() {
    const { width, height } = this.scale;
    
    // Sky gradient
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE0F7FA, 0xE0F7FA, 1);
    sky.fillRect(0, 0, width, height * 0.4);
    
    // Distant buildings/trees silhouette
    for (let i = 0; i < 8; i++) {
      const x = i * 60 + 20;
      const h = Phaser.Math.Between(40, 80);
      this.add.rectangle(x, height * 0.35, 40, h, 0x4A5568).setOrigin(0.5, 1);
    }
  }

  createRoad() {
    const { width, height } = this.scale;
    
    // Main road area
    this.roadGraphics = this.add.graphics();
    
    // Road background (brown/dirt)
    this.roadGraphics.fillStyle(0x8B4513, 1);
    this.roadGraphics.fillRect(GAME.ROAD.LEFT_EDGE, height * 0.25, GAME.ROAD.WIDTH, height * 0.75);
    
    // Road edges
    this.roadGraphics.fillStyle(0xFFD700, 1);
    this.roadGraphics.fillRect(GAME.ROAD.LEFT_EDGE - 5, height * 0.25, 5, height * 0.75);
    this.roadGraphics.fillRect(GAME.ROAD.RIGHT_EDGE, height * 0.25, 5, height * 0.75);
    
    // Lane dividers (dashed lines) - adjusted for wider lanes
    this.roadGraphics.fillStyle(0xFFF8DC, 0.5);
    for (let y = height * 0.3; y < height; y += 40) {
      this.roadGraphics.fillRect(160, y, 4, 20);  // Between left and center
      this.roadGraphics.fillRect(290, y, 4, 20);  // Between center and right
    }
    
    // Road lines that move (for motion effect)
    this.roadLines = [];
    for (let i = 0; i < 18; i++) {
      const y = height * 0.25 + (i * 50);
      const line1 = this.add.rectangle(160, y, 4, 25, 0xFFFFFF, 0.4);
      const line2 = this.add.rectangle(290, y, 4, 25, 0xFFFFFF, 0.4);
      this.roadLines.push(line1, line2);
    }
  }

  createPlayer() {
    const { width, height } = this.scale;
    
    // Player container
    const playerX = GAME.LANES.POSITIONS[this.currentLane];
    const playerY = GAME.PLAYER.Y;
    
    // Player body (rectangle placeholder) - BIGGER
    this.player = this.add.rectangle(playerX, playerY, 60, 80, 0xFFD700);
    this.player.setStrokeStyle(3, 0xB8860B);
    
    // Player emoji - BIGGER
    this.playerEmoji = this.add.text(playerX, playerY - 5, '🏃', {
      fontSize: '50px'
    }).setOrigin(0.5);
    
    // Shadow
    this.playerShadow = this.add.ellipse(playerX, playerY + 45, 60, 18, 0x000000, 0.3);
    
    // Physics body for collision
    this.physics.add.existing(this.player);
    this.player.body.setSize(50, 70);
    this.player.body.setImmovable(true);
  }

  createUI() {
    const { width, height } = this.scale;
    
    // Top UI bar background
    this.add.rectangle(width / 2, 50, width, 100, 0x000000, 0.7);
    
    // Coin counter (top left)
    this.add.text(20, 30, '🪙', { fontSize: '28px' });
    this.coinText = this.add.text(55, 30, '0', {
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#FFD700'
    });
    
    // Distance (center)
    this.distanceText = this.add.text(width / 2, 25, '0', {
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5, 0);
    
    this.add.text(width / 2, 75, 'meter', {
      fontSize: '16px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0);
    
    // Zone name (below coins)
    this.zoneText = this.add.text(20, 65, '📍 ' + this.currentZone.name, {
      fontSize: '14px',
      color: '#FF6B6B'
    });
    
    // Pause button (top right)
    this.pauseBtn = this.add.rectangle(width - 40, 50, 50, 50, 0x4A90D9, 1)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.togglePause());
    this.add.text(width - 40, 50, '⏸️', { fontSize: '24px' }).setOrigin(0.5);
    
    // Bottom control hints
    this.add.rectangle(width / 2, height - 25, width - 40, 40, 0x000000, 0.6)
      .setStrokeStyle(1, 0x333333);
    this.add.text(width / 2, height - 25, '⬅️ KIRI  |  TAP = LOMPAT  |  KANAN ➡️', {
      fontSize: '14px',
      color: '#CCCCCC'
    }).setOrigin(0.5);
  }

  createGroups() {
    // Obstacles group
    this.obstacles = this.add.group();
    
    // Coins group  
    this.coinsGroup = this.add.group();
  }

  setupInput() {
    const { width, height } = this.scale;
    
    // Touch/click zones
    const leftZone = this.add.rectangle(width * 0.25, height / 2, width * 0.5, height, 0x000000, 0)
      .setInteractive()
      .on('pointerdown', (pointer) => {
        if (pointer.x < width / 3) {
          this.moveLeft();
        } else if (pointer.x > width * 2/3) {
          this.moveRight();
        } else {
          this.jump();
        }
      });
    
    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey('SPACE');
    
    // Swipe detection
    this.input.on('pointerdown', (pointer) => {
      this.swipeStart = { x: pointer.x, y: pointer.y };
    });
    
    this.input.on('pointerup', (pointer) => {
      if (!this.swipeStart) return;
      
      const dx = pointer.x - this.swipeStart.x;
      const dy = pointer.y - this.swipeStart.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      
      if (absDx > 50 && absDx > absDy) {
        // Horizontal swipe
        if (dx > 0) this.moveRight();
        else this.moveLeft();
      } else if (absDy > 50 && absDy > absDx) {
        // Vertical swipe
        if (dy < 0) this.jump();  // Swipe up = jump
        else this.slide();         // Swipe down = slide
      }
      
      this.swipeStart = null;
    });
  }

  setupTimers() {
    // Spawn obstacles
    this.obstacleTimer = this.time.addEvent({
      delay: Phaser.Math.Between(GAME.SPAWN.OBSTACLE_MIN, GAME.SPAWN.OBSTACLE_MAX),
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });
    
    // Spawn coins
    this.coinTimer = this.time.addEvent({
      delay: Phaser.Math.Between(GAME.SPAWN.COIN_MIN, GAME.SPAWN.COIN_MAX),
      callback: this.spawnCoin,
      callbackScope: this,
      loop: true
    });
    
    // Update distance
    this.distanceTimer = this.time.addEvent({
      delay: 100,
      callback: () => {
        if (!this.isPaused && !this.isGameOver) {
          this.distance += Math.floor(this.gameSpeed);
          this.distanceText.setText(this.distance.toString());
          this.checkZoneChange();
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  // ==================
  // PLAYER MOVEMENT
  // ==================
  
  moveLeft() {
    if (!this.canMove || this.isGameOver || this.isPaused) return;
    if (this.currentLane > 0) {
      this.currentLane--;
      this.movePlayerToLane();
    }
  }
  
  moveRight() {
    if (!this.canMove || this.isGameOver || this.isPaused) return;
    if (this.currentLane < 2) {
      this.currentLane++;
      this.movePlayerToLane();
    }
  }
  
  movePlayerToLane() {
    const targetX = GAME.LANES.POSITIONS[this.currentLane];
    
    this.tweens.add({
      targets: [this.player, this.playerEmoji, this.playerShadow],
      x: targetX,
      duration: 150,
      ease: 'Power2'
    });
  }
  
  jump() {
    if (this.isJumping || this.isGameOver || this.isPaused) return;
    
    this.isJumping = true;
    const startY = GAME.PLAYER.Y;
    const jumpY = startY - GAME.PLAYER.JUMP_HEIGHT;
    
    // Jump up
    this.tweens.add({
      targets: [this.player, this.playerEmoji],
      y: jumpY,
      duration: GAME.PLAYER.JUMP_DURATION / 2,
      ease: 'Power2.easeOut',
      onComplete: () => {
        // Fall down
        this.tweens.add({
          targets: [this.player, this.playerEmoji],
          y: startY,
          duration: GAME.PLAYER.JUMP_DURATION / 2,
          ease: 'Power2.easeIn',
          onComplete: () => {
            this.isJumping = false;
          }
        });
      }
    });
    
    // Shadow effect
    this.tweens.add({
      targets: this.playerShadow,
      scaleX: 0.5,
      scaleY: 0.5,
      alpha: 0.2,
      yoyo: true,
      duration: GAME.PLAYER.JUMP_DURATION
    });
  }
  
  slide() {
    if (this.isSliding || this.isJumping || this.isGameOver || this.isPaused) return;
    
    this.isSliding = true;
    
    // Shrink player
    this.tweens.add({
      targets: this.player,
      scaleY: 0.4,
      duration: 100,
      onComplete: () => {
        this.time.delayedCall(GAME.PLAYER.SLIDE_DURATION, () => {
          this.tweens.add({
            targets: this.player,
            scaleY: 1,
            duration: 100,
            onComplete: () => {
              this.isSliding = false;
            }
          });
        });
      }
    });
  }

  // ==================
  // SPAWNING
  // ==================
  
  spawnObstacle() {
    if (this.isGameOver || this.isPaused) return;
    
    const lane = Phaser.Math.Between(0, 2);
    const x = GAME.LANES.POSITIONS[lane];
    const y = -50;
    
    // Random obstacle type
    const types = [
      { width: 50, height: 50, color: 0xFF0000, emoji: '🪨' },   // Rock
      { width: 60, height: 40, color: 0x8B4513, emoji: '📦' },   // Crate
      { width: 40, height: 80, color: 0x228B22, emoji: '🌳' }    // Tree
    ];
    const type = Phaser.Math.RND.pick(types);
    
    // Create obstacle container
    const obstacle = this.add.container(x, y);
    
    // Obstacle body
    const body = this.add.rectangle(0, 0, type.width, type.height, type.color);
    body.setStrokeStyle(2, 0x000000);
    
    // Emoji on top
    const emoji = this.add.text(0, 0, type.emoji, { fontSize: '32px' }).setOrigin(0.5);
    
    obstacle.add([body, emoji]);
    obstacle.setSize(type.width, type.height);
    
    // Physics
    this.physics.add.existing(obstacle);
    obstacle.body.setSize(type.width - 10, type.height - 10);
    
    this.obstacles.add(obstacle);
    
    // Collision
    this.physics.add.overlap(this.player, obstacle, () => {
      if (!this.isJumping && !this.isGameOver) {
        this.gameOver();
      }
    });
  }
  
  spawnCoin() {
    if (this.isGameOver || this.isPaused) return;
    
    const lane = Phaser.Math.Between(0, 2);
    const x = GAME.LANES.POSITIONS[lane];
    const y = -30;
    
    // Coin sprite
    const coin = this.add.container(x, y);
    
    const coinCircle = this.add.circle(0, 0, 18, 0xFFD700);
    coinCircle.setStrokeStyle(2, 0xB8860B);
    
    const coinText = this.add.text(0, 0, '🪙', { fontSize: '24px' }).setOrigin(0.5);
    
    coin.add([coinCircle, coinText]);
    coin.setSize(36, 36);
    
    // Physics
    this.physics.add.existing(coin);
    coin.body.setSize(30, 30);
    
    this.coinsGroup.add(coin);
    
    // Rotation animation
    this.tweens.add({
      targets: coinText,
      scaleX: -1,
      yoyo: true,
      repeat: -1,
      duration: 300
    });
    
    // Collision - collect coin
    this.physics.add.overlap(this.player, coin, () => {
      this.collectCoin(coin);
    });
  }
  
  collectCoin(coin) {
    this.coins++;
    this.coinText.setText(this.coins.toString());
    
    // Collect effect
    this.tweens.add({
      targets: coin,
      y: coin.y - 50,
      alpha: 0,
      scale: 1.5,
      duration: 200,
      onComplete: () => {
        coin.destroy();
      }
    });
    
    // +10 popup
    const popup = this.add.text(coin.x, coin.y, '+10', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: popup,
      y: popup.y - 60,
      alpha: 0,
      duration: 500,
      onComplete: () => popup.destroy()
    });
  }

  // ==================
  // GAME LOOP
  // ==================
  
  update(time, delta) {
    if (this.isGameOver || this.isPaused) return;
    
    // Keyboard input
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.moveLeft();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.moveRight();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || 
        Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.jump();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.slide();
    }
    
    // Increase speed over time
    if (this.gameSpeed < GAME.SPEED.MAX) {
      this.gameSpeed += GAME.SPEED.INCREMENT;
    }
    
    // Move road lines down (motion effect)
    this.roadLines.forEach(line => {
      line.y += this.gameSpeed;
      if (line.y > this.scale.height) {
        line.y = this.scale.height * 0.25;
      }
    });
    
    // Move obstacles down - SLOWER (was 1.2x, now 1x)
    this.obstacles.getChildren().forEach(obstacle => {
      obstacle.y += this.gameSpeed;
      
      // Remove if off screen
      if (obstacle.y > this.scale.height + 100) {
        obstacle.destroy();
      }
    });
    
    // Move coins down - SLOWER
    this.coinsGroup.getChildren().forEach(coin => {
      coin.y += this.gameSpeed;
      
      if (coin.y > this.scale.height + 50) {
        coin.destroy();
      }
    });
  }
  
  checkZoneChange() {
    // Change zone based on distance
    if (this.distance >= ZONES.pelabuhan.unlockDistance && this.currentZone !== ZONES.pelabuhan) {
      this.currentZone = ZONES.pelabuhan;
      this.zoneText.setText('📍 ' + this.currentZone.name);
    } else if (this.distance >= ZONES.hutan.unlockDistance && this.distance < ZONES.pelabuhan.unlockDistance && this.currentZone !== ZONES.hutan) {
      this.currentZone = ZONES.hutan;
      this.zoneText.setText('📍 ' + this.currentZone.name);
    }
  }

  // ==================
  // GAME STATES
  // ==================
  
  togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      this.showPauseMenu();
    } else {
      this.hidePauseMenu();
    }
  }
  
  showPauseMenu() {
    const { width, height } = this.scale;
    
    // Overlay
    this.pauseOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.8);
    
    // Pause text
    this.pauseText = this.add.text(width / 2, height / 2 - 50, '⏸️ PAUSED', {
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#FFD700'
    }).setOrigin(0.5);
    
    // Resume button
    this.resumeBtn = this.add.rectangle(width / 2, height / 2 + 30, 150, 50, 0x27AE60)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.togglePause());
    this.resumeBtnText = this.add.text(width / 2, height / 2 + 30, '▶️ Lanjut', {
      fontSize: '20px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    // Menu button
    this.menuBtn = this.add.rectangle(width / 2, height / 2 + 100, 150, 50, 0xE74C3C)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('MenuScene'));
    this.menuBtnText = this.add.text(width / 2, height / 2 + 100, '🏠 Menu', {
      fontSize: '20px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
  }
  
  hidePauseMenu() {
    if (this.pauseOverlay) this.pauseOverlay.destroy();
    if (this.pauseText) this.pauseText.destroy();
    if (this.resumeBtn) this.resumeBtn.destroy();
    if (this.resumeBtnText) this.resumeBtnText.destroy();
    if (this.menuBtn) this.menuBtn.destroy();
    if (this.menuBtnText) this.menuBtnText.destroy();
  }
  
  gameOver() {
    this.isGameOver = true;
    
    // Stop timers
    this.obstacleTimer.destroy();
    this.coinTimer.destroy();
    
    // Flash effect
    this.cameras.main.flash(300, 255, 0, 0);
    this.cameras.main.shake(200, 0.02);
    
    // Save data
    this.saveGameData();
    
    // Go to game over scene
    this.time.delayedCall(1000, () => {
      this.scene.start('GameOverScene', {
        score: this.distance,
        coins: this.coins,
        distance: this.distance
      });
    });
  }
  
  saveGameData() {
    const savedData = JSON.parse(localStorage.getItem('majapahitRunner') || '{}');
    
    // Update high score
    if (this.distance > (savedData.highScore || 0)) {
      savedData.highScore = this.distance;
    }
    
    // Add coins
    savedData.totalCoins = (savedData.totalCoins || 0) + this.coins;
    
    // Update total distance
    savedData.totalDistance = (savedData.totalDistance || 0) + this.distance;
    
    // Increment games played
    savedData.gamesPlayed = (savedData.gamesPlayed || 0) + 1;
    
    localStorage.setItem('majapahitRunner', JSON.stringify(savedData));
  }
}
