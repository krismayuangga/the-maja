/**
 * BootScene - Initial loading scene
 * 
 * Handles initial setup and transitions to PreloadScene
 */

import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Load minimal assets for loading screen
    // These should be very small files
    
    // Loading bar background
    this.load.image('loading_bg', 'assets/ui/loading_bg.png');
    this.load.image('loading_bar', 'assets/ui/loading_bar.png');
    this.load.image('logo', 'assets/ui/logo.png');
  }

  create() {
    // Set up any global game settings
    this.scale.refresh();
    
    // Transition to preload scene
    this.scene.start('PreloadScene');
  }
}
