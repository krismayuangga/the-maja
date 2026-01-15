/**
 * Majapahit Runner - Main Entry Point
 * 
 * Endless runner game set in the Majapahit Kingdom
 * Part of $MAJA Token ecosystem
 * 
 * @author The Maja Project
 * @version 0.1.0
 */

import Phaser from 'phaser';
import { gameConfig } from './config/gameConfig.js';

// Import scenes
import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

// Register all scenes
const config = {
  ...gameConfig,
  scene: [
    BootScene,
    PreloadScene,
    MenuScene,
    GameScene,
    GameOverScene
  ]
};

// Create game instance
const game = new Phaser.Game(config);

// Mark game as loaded
window.addEventListener('load', () => {
  document.body.classList.add('game-loaded');
});

// Handle visibility change (pause when tab inactive)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    try {
      const gameScene = game.scene.getScene('GameScene');
      if (gameScene && gameScene.scene.isActive()) {
        game.scene.pause('GameScene');
      }
    } catch (e) {
      // Ignore errors
    }
  } else {
    try {
      const gameScene = game.scene.getScene('GameScene');
      if (gameScene && gameScene.scene.isPaused()) {
        game.scene.resume('GameScene');
      }
    } catch (e) {
      // Ignore errors
    }
  }
});

// Export for debugging
window.game = game;
