import Domino from '../classes/Domino';
import DominoMap from './DominoMap';
export default class DominoHandler {
  constructor(scene) {
    this.createDominoes = () => {
      const min = 0;
      const max = 6;
      const dominoes = [];

      let k = 0;
      let dominoMapCounter = 0;
      for (let i = min; i <= max; i++) {
        // min = 0 || i = 0
        for (let j = k; j <= max; j++) {
          // j = 0
          dominoes.push(new Domino(scene, DominoMap[dominoMapCounter]));
          dominoMapCounter++;
          // domino double blank
        }
        k++;
      }

      return dominoes.map((dom) => dom.render(700, 300));
    };

    this.shuffleDominoes = (dominoes) => {
      return Phaser.Actions.Shuffle(dominoes);
    };
    this.dealDominoes = (dominoes, lobby) => {
      let index = 0;
      const players = [];
      for (let player in lobby) {
        players.push(lobby[player]);
      }
      // adds domino sprites to players hand
      for (let i = 0; i < 14; i++) {
        if (index === players.length) index = 0;
        const currentPlayer = players[index];
        const currentDomino = dominoes.pop();
        currentPlayer.hand.add(currentDomino);
        index++;
      }

      let offset = 0;
      let x = 200;
      let y = 500;
      const playerTweens = players[0].hand.getChildren().map((child) => {
        child.sprite = 'white_dominoes';
        x += 40;
        offset += 100;
        return {
          targets: child,
          x,
          y,
          offset,
          onUpdate: function () {
            child.setAngle(90 * this.progress);
          },
        };
      });
      (x = 200), (offset = 0), (y = 100);
      const opponentTweens = players[1].hand.getChildren().map((child) => {
        x += 40;
        offset += 100;
        return {
          targets: child,
          x,
          y,
          offset,
          onUpdate: function () {
            child.setAngle(90 * this.progress);
          },
        };
      });
      scene.tweens.timeline({
        duration: 500,
        tweens: [...playerTweens, ...opponentTweens],
      });
      scene.gameState.isActive = true;
    };
  }
}
