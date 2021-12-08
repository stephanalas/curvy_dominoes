import { GameObjects } from 'phaser';
import Domino from './Domino';

export default class Player {
  constructor(playerConfig, scene) {
    this.id = playerConfig.id;
    this.name = playerConfig.name;
    this.hand = scene.add.group();
    this.points = 0;
    this.isBot = playerConfig.isBot || false;
    this.pluck = () => {
      scene.dominoes.pop();
      console.log(this.hand.getLast());
    };
    this.checkForPlayableDomino = () => {
      const { leftDomino, rightDomino } = scene.gameState;
      const hand = this.hand.getChildren();
      const playableDominoes = [];
      for (let i = 0; i < hand.length; i++) {
        const { left, right } = hand[i];
        if (
          left.value === leftDomino.value ||
          right.value === leftDomino.value ||
          right.value === rightDomino.value ||
          left.value === rightDomino.value
        ) {
          if (!this.isBot) {
            hand[i].on('pointerdown', function () {
              const phantom = new Domino(scene, {});
            });
          }
          playableDominoes.push(hand[i]);
        } else {
          if (!this.isBot) hand[i].setAlpha(0.5);
        }
      }
      return playableDominoes;
    };
  }

  // might want to create instance method to play domino
}
