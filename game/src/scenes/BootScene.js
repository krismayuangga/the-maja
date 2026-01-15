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
    // No external assets needed - all generated in PreloadScene
  }

  create() {
    // Set up any global game settings
    this.scale.refresh();
    
    // Transition to preload scene
    this.scene.start('PreloadScene');
  }
}
