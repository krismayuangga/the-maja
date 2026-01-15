/**
 * GameScene - Main gameplay
 * 
 * Core endless runner gameplay with obstacles, coins, and power-ups
 */

import Phaser from 'phaser';
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
    this.currentLane = 1; // 0: left, 1: center, 2: right
    this.isJumping = false;
    this.isSliding = false;
    this.hasShield = false;
    this.activePowerups = {};
    
    // Current zone
    this.currentZone = 'trowulan';
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Create game layers
    this.createBackground();
    this.createGround();
    this.createPlayer();
    this.createUI();
    this.createGroups();
    
    // Setup input
    this.setupInput();
    
    // Setup collision
    this.setupCollisions();
    
    // Start spawners
    this.startSpawners();
    
    // Play game music
    // this.sound.play('music_game', { loop: true, volume: 0.3 });
  }

  createBackground() {
    const { width, height } = this.cameras.main;
    
    // Sky layer (static or slow scroll)
    this.sky = this.add.tileSprite(width / 2, height / 2, width, height, 'bg_sky')
      .setScrollFactor(0);
    
    // For now, use simple colored rectangles as placeholder
    // Far background
    this.bgFar = this.add.rectangle(width / 2, height / 2 - 50, width, 300, 0x4a3728)
      .setScrollFactor(0);
    
    // Mid background
    this.bgMid = this.add.rectangle(width / 2, height / 2 + 50, width, 200, 0x3d2817)
      .setScrollFactor(0);
  }

  createGround() {
    const { width, height } = this.cameras.main;
    
    // Ground (tileSprite for infinite scroll)
    this.ground = this.add.tileSprite(width / 2, GAME.PLAYER.GROUND_Y + 60, width, 120, 'ground_brick')
      .setScrollFactor(0);
    
    // For now, use rectangle as placeholder
    this.groundRect = this.add.rectangle(width / 2, GAME.PLAYER.GROUND_Y + 60, width, 120, 0x8B4513);
    
    // Physics ground (invisible)
    this.groundPhysics = this.physics.add.staticGroup();
    const groundBody = this.groundPhysics.create(width / 2, GAME.PLAYER.GROUND_Y + 30, null);
    groundBody.setSize(width, 60);
    groundBody.setVisible(false);
    groundBody.refreshBody();
  }

  createPlayer() {
    const { width } = this.cameras.main;
    
    // Create player sprite
    this.player = this.physics.add.sprite(
      GAME.PLAYER.START_X,
      GAME.PLAYER.GROUND_Y - 32,
      'player_run'
    );
    
    // For now, use rectangle as placeholder
    this.player.setVisible(false);
    this.playerRect = this.add.rectangle(
      GAME.PLAYER.START_X,
      GAME.PLAYER.GROUND_Y - 40,
      50,
      80,
      0xffd700
    );
    this.playerRect.setStrokeStyle(3, 0x8B4513);
    
    // Player physics
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(800);
    this.player.setSize(40, 70);
    
    // Player indicator
    this.add.text(GAME.PLAYER.START_X, GAME.PLAYER.GROUND_Y - 90, '🏃', {
      fontSize: '48px'
    }).setOrigin(0.5);
    
    // Lane positions
    this.laneX = [
      width / 2 + GAME.PLAYER.LANES[0],
      width / 2 + GAME.PLAYER.LANES[1],
      width / 2 + GAME.PLAYER.LANES[2]
    ];
    
    // Set initial lane
    this.player.x = GAME.PLAYER.START_X;
  }

  createUI() {
    const { width } = this.cameras.main;
    
    // Score display
    this.scoreText = this.add.text(width / 2, 30, '0', {
      fontSize: '36px',
      fontFamily: 'Georgia, serif',
      color: '#ffd700',
      stroke: '#1a0a00',
      strokeThickness: 4
    }).setOrigin(0.5).setScrollFactor(0);
    
    // Distance label
    this.add.text(width / 2, 60, 'meter', {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setOrigin(0.5).setScrollFactor(0);
    
    // Coins display
    this.coinText = this.add.text(30, 30, '🪙 0', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffd700'
    }).setScrollFactor(0);
    
    // Pause button
    this.pauseBtn = this.add.text(width - 30, 30, '⏸️', {
      fontSize: '32px'
    }).setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true });
    
    this.pauseBtn.on('pointerup', () => this.togglePause());
    
    // Zone indicator
    this.zoneText = this.add.text(30, 60, '📍 Trowulan', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#b08d57'
    }).setScrollFactor(0);
  }

  createGroups() {
    // Obstacle group
    this.obstacles = this.physics.add.group();
    
    // Coin group
    this.coinGroup = this.physics.add.group();
    
    // Power-up group
    this.powerups = this.physics.add.group();
  }

  setupInput() {
    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Touch/swipe controls
    this.input.on('pointerdown', this.handlePointerDown, this);
    this.input.on('pointerup', this.handlePointerUp, this);
    
    // Track swipe
    this.swipeStart = null;
  }

  handlePointerDown(pointer) {
    this.swipeStart = { x: pointer.x, y: pointer.y, time: Date.now() };
  }

  handlePointerUp(pointer) {
    if (!this.swipeStart || this.isGameOver) return;
    
    const swipeEnd = { x: pointer.x, y: pointer.y };
    const deltaX = swipeEnd.x - this.swipeStart.x;
    const deltaY = swipeEnd.y - this.swipeStart.y;
    const deltaTime = Date.now() - this.swipeStart.time;
    
    // Minimum swipe distance and max time
    const minSwipe = 50;
    const maxTime = 300;
    
    if (deltaTime > maxTime) {
      // Tap instead of swipe
      this.jump();
      return;
    }
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > minSwipe) {
        this.changeLane(1); // Right
      } else if (deltaX < -minSwipe) {
        this.changeLane(-1); // Left
      }
    } else {
      // Vertical swipe
      if (deltaY < -minSwipe) {
        this.jump(); // Up
      } else if (deltaY > minSwipe) {
        this.slide(); // Down
      }
    }
    
    this.swipeStart = null;
  }

  setupCollisions() {
    // Player vs ground
    this.physics.add.collider(this.player, this.groundPhysics, () => {
      this.isJumping = false;
    });
    
    // Player vs obstacles
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
    
    // Player vs coins
    this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);
    
    // Player vs powerups
    this.physics.add.overlap(this.player, this.powerups, this.collectPowerup, null, this);
  }

  startSpawners() {
    // Obstacle spawner
    this.obstacleTimer = this.time.addEvent({
      delay: Phaser.Math.Between(GAME.SPAWN.OBSTACLE_MIN, GAME.SPAWN.OBSTACLE_MAX),
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });
    
    // Coin spawner
    this.coinTimer = this.time.addEvent({
      delay: Phaser.Math.Between(GAME.SPAWN.COIN_MIN, GAME.SPAWN.COIN_MAX),
      callback: this.spawnCoin,
      callbackScope: this,
      loop: true
    });
  }

  // === PLAYER ACTIONS ===
  
  jump() {
    if (this.isJumping || this.isSliding || this.isGameOver) return;
    
    this.isJumping = true;
    this.player.setVelocityY(GAME.PLAYER.JUMP_VELOCITY);
    // this.sound.play('sfx_jump', { volume: 0.5 });
    
    // Visual feedback
    this.playerRect.y -= 20;
    this.tweens.add({
      targets: this.playerRect,
      y: GAME.PLAYER.GROUND_Y - 40,
      duration: 500,
      ease: 'Bounce.Out'
    });
  }

  slide() {
    if (this.isJumping || this.isSliding || this.isGameOver) return;
    
    this.isSliding = true;
    // this.sound.play('sfx_slide', { volume: 0.5 });
    
    // Shrink hitbox
    this.player.setSize(40, 35);
    this.playerRect.setSize(50, 40);
    this.playerRect.y = GAME.PLAYER.GROUND_Y - 20;
    
    // End slide after duration
    this.time.delayedCall(GAME.PLAYER.SLIDE_DURATION, () => {
      this.isSliding = false;
      this.player.setSize(40, 70);
      this.playerRect.setSize(50, 80);
      this.playerRect.y = GAME.PLAYER.GROUND_Y - 40;
    });
  }

  changeLane(direction) {
    if (this.isGameOver) return;
    
    const newLane = Phaser.Math.Clamp(this.currentLane + direction, 0, 2);
    if (newLane === this.currentLane) return;
    
    this.currentLane = newLane;
    
    // Smooth lane change
    const targetX = this.laneX[this.currentLane] - 250; // Offset from center
    
    this.tweens.add({
      targets: [this.player, this.playerRect],
      x: GAME.PLAYER.START_X + (direction * GAME.PLAYER.LANE_WIDTH),
      duration: 150,
      ease: 'Power2'
    });
  }

  // === SPAWNERS ===
  
  spawnObstacle() {
    if (this.isGameOver) return;
    
    const { width } = this.cameras.main;
    const lane = Phaser.Math.Between(0, 2);
    const x = width + 50;
    const y = GAME.PLAYER.GROUND_Y - 30;
    
    // Create obstacle (placeholder rectangle)
    const obstacle = this.add.rectangle(x, y, 40, 60, 0xff4444);
    obstacle.setStrokeStyle(2, 0xaa0000);
    
    this.physics.add.existing(obstacle);
    obstacle.body.setVelocityX(-this.gameSpeed);
    obstacle.body.setAllowGravity(false);
    obstacle.body.setImmovable(true);
    
    this.obstacles.add(obstacle);
    
    // Destroy when off screen
    obstacle.checkWorldBounds = true;
    obstacle.outOfBoundsKill = true;
    
    // Reset timer with variable delay
    this.obstacleTimer.delay = Phaser.Math.Between(
      GAME.SPAWN.OBSTACLE_MIN,
      GAME.SPAWN.OBSTACLE_MAX
    ) * (GAME.SPEED.INITIAL / this.gameSpeed);
  }

  spawnCoin() {
    if (this.isGameOver) return;
    
    const { width } = this.cameras.main;
    const lane = Phaser.Math.Between(0, 2);
    const x = width + 50;
    const yOffset = Phaser.Math.Between(0, 2); // Ground, low, high
    const yPositions = [GAME.PLAYER.GROUND_Y - 30, GAME.PLAYER.GROUND_Y - 80, GAME.PLAYER.GROUND_Y - 130];
    const y = yPositions[yOffset];
    
    // Create coin (placeholder)
    const coin = this.add.circle(x, y, 15, 0xffd700);
    coin.setStrokeStyle(2, 0xb08d57);
    
    this.physics.add.existing(coin);
    coin.body.setVelocityX(-this.gameSpeed);
    coin.body.setAllowGravity(false);
    coin.body.setCircle(15);
    
    this.coinGroup.add(coin);
    
    // Coin spin animation
    this.tweens.add({
      targets: coin,
      scaleX: { from: 1, to: 0.3 },
      duration: 300,
      yoyo: true,
      repeat: -1
    });
    
    // Reset timer
    this.coinTimer.delay = Phaser.Math.Between(GAME.SPAWN.COIN_MIN, GAME.SPAWN.COIN_MAX);
  }

  // === COLLISIONS ===
  
  hitObstacle(player, obstacle) {
    if (this.hasShield) {
      // Use shield
      this.hasShield = false;
      obstacle.destroy();
      // this.sound.play('sfx_shield', { volume: 0.5 });
      return;
    }
    
    this.gameOver();
  }

  collectCoin(player, coin) {
    coin.destroy();
    this.coins++;
    this.score += GAME.SCORE.PER_COIN;
    this.coinText.setText(`🪙 ${this.coins}`);
    // this.sound.play('sfx_coin', { volume: 0.3 });
    
    // Coin collect effect
    this.tweens.add({
      targets: this.coinText,
      scale: { from: 1.2, to: 1 },
      duration: 200
    });
  }

  collectPowerup(player, powerup) {
    powerup.destroy();
    // Apply powerup effect
    // this.sound.play('sfx_powerup', { volume: 0.5 });
  }

  // === GAME STATE ===
  
  togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      this.physics.pause();
      this.pauseBtn.setText('▶️');
      
      // Show pause overlay
      this.pauseOverlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);
      this.pauseText = this.add.text(400, 300, 'PAUSE', {
        fontSize: '48px',
        fontFamily: 'Georgia, serif',
        color: '#ffd700'
      }).setOrigin(0.5);
    } else {
      this.physics.resume();
      this.pauseBtn.setText('⏸️');
      this.pauseOverlay?.destroy();
      this.pauseText?.destroy();
    }
  }

  gameOver() {
    if (this.isGameOver) return;
    
    this.isGameOver = true;
    // this.sound.play('sfx_crash', { volume: 0.5 });
    // this.sound.stopByKey('music_game');
    
    // Stop physics
    this.physics.pause();
    
    // Stop spawners
    this.obstacleTimer.destroy();
    this.coinTimer.destroy();
    
    // Player crash effect
    this.tweens.add({
      targets: this.playerRect,
      angle: 90,
      y: GAME.PLAYER.GROUND_Y,
      duration: 300
    });
    
    // Save score
    this.saveScore();
    
    // Go to game over scene
    this.time.delayedCall(1000, () => {
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
      console.error('Failed to save:', e);
    }
  }

  // === UPDATE LOOP ===
  
  update(time, delta) {
    if (this.isGameOver || this.isPaused) return;
    
    // Increase speed over time
    if (this.gameSpeed < GAME.SPEED.MAX) {
      this.gameSpeed += GAME.SPEED.INCREMENT * (delta / 16);
    }
    
    // Update distance/score
    this.distance += (this.gameSpeed * delta) / 10000;
    this.scoreText.setText(Math.floor(this.distance).toString());
    
    // Scroll backgrounds
    // this.sky.tilePositionX += 0.1;
    // this.ground.tilePositionX += this.gameSpeed * delta / 1000;
    
    // Update obstacle speeds
    this.obstacles.getChildren().forEach(obstacle => {
      obstacle.body.setVelocityX(-this.gameSpeed);
      
      // Remove if off screen
      if (obstacle.x < -50) {
        obstacle.destroy();
      }
    });
    
    // Update coin speeds
    this.coinGroup.getChildren().forEach(coin => {
      coin.body.setVelocityX(-this.gameSpeed);
      
      if (coin.x < -50) {
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
    
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.changeLane(-1);
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.changeLane(1);
    }
    
    // Sync player visual with physics
    this.playerRect.x = this.player.x;
    if (!this.isSliding) {
      this.playerRect.y = this.player.y;
    }
  }
}
