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
      // should return a tuple [playableDomino, side]
      const play = [];
      for (let i = 0; i < hand.length; i++) {
        const { left, right } = hand[i];
        if (
          left.value === leftDomino.value ||
          right.value === leftDomino.value
        ) {
          play[0] = hand[i];
          play[1] = 'left';
        } else if (
          right.value === rightDomino.value ||
          left.value === rightDomino.value
        ) {
          play[0] = hand[i];
          play[1] = 'right';
        }
      }
      return play;
    };
    this.highlightPlayableDominoes = () => {
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
          playableDominoes.push(hand[i]);
          hand[i].setInteractive();
          hand[i].on('pointerdown', function (pointer) {
            // where can that domino play left or right or both
            // create temp fade domino if both create two
            // Main Issue: orient domino to correct facing side
            // if playing left pips on left side
            // domino left should be facing right and vice versa
            // place temp domino(s) on potential position
            // add pointerDown events on temp dominoes
            // when clicked remove visibility of temp dominoes
            // and tween this domino to location of selected temp domino position
            // delete temp dominoes
            // end my turn
          });
        } else {
          hand[i].setAlpha(0.5);
        }
      }
      return playableDominoes;
    };
  }

  // might want to create instance method to play domino
}
