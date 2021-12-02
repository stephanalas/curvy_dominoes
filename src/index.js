import Phaser from 'phaser';
import Game from './scenes/game';
console.log(true);
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#4E6A54',
  physics: {
    default: 'arcade',
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
  scene: [Game],
};
const game = new Phaser.Game(config);
