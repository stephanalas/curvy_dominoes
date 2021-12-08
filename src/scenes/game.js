import whiteDominoesImage from '../assets/dominoes/black_and_white_dominoes.png';
import blankDominoesImage from '../assets/dominoes/blanks.png';
import Player from '../classes/Player';
import DominoHandler from '../utils/DominoHandler';
import GameHandler from '../utils/GameHandler';
export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'game',
    });
    this.gameState = {
      isActive: false,
      currentTurn: null,
      // left and right should be numbers
      leftDomino: {},
      rightDomino: {},
    };
  }
  preload() {
    const DOMINOES_HEIGHT_WIDTH = {
      frameWidth: 32,
      frameHeight: 16,
    };
    this.load.spritesheet(
      'white_dominoes',
      whiteDominoesImage,
      DOMINOES_HEIGHT_WIDTH
    );

    this.load.spritesheet('blanks', blankDominoesImage, DOMINOES_HEIGHT_WIDTH);
  }
  create() {
    // creates handlers and destructure methods from object
    this.DominoHandler = new DominoHandler(this);
    this.GameHandler = new GameHandler(this);
    const { startGame } = this.GameHandler;
    const { createDominoes, shuffleDominoes, dealDominoes } =
      this.DominoHandler;

    // creates and shuffle scene dominoes
    this.dominoes = shuffleDominoes(createDominoes());
    // later down the line I would want to log in jwt
    const stephan = new Player({ id: 1, name: 'stephan' }, this);
    const bot = new Player({ id: 2, name: 'dru', isBot: true }, this);
    this.lobby = [stephan, bot].reduce((lobby, nextPlayer) => {
      lobby[nextPlayer.name] = nextPlayer;
      return lobby;
    }, {});

    dealDominoes(this.dominoes, this.lobby);
    setTimeout(() => startGame(this.lobby, this.gameState), 2000);
  }
  update(time, deltaTime) {
    if (this.gameState.isActive) {
      const { currentTurn, leftDomino, rightDomino } = this.gameState;
      const player = this.lobby[currentTurn];
      if (player?.isBot) {
        // peform bots play
        // check left and right values of gamestate
        const playableDomino = player.checkForPlayableDomino();
        if (!playableDominoes.length) {
          player.pluck();
          this.gameState.currentTurn = Object.keys(this.lobby).find(
            (name) => name !== currentTurn
          );
        } else {
          // playable Domino is array [domino , 'left' || 'right' || 'both']
          // orient domino based on second element
          // tween domino to playable x, y of leftDomino/rightDomino
          // end turn
        }
      } else {
        // can I play if not we pluck dominoes
        const playableDominoes = player.highlightPlayableDominoes();
        console.log(playableDominoes);
        if (!playableDominoes.length) {
          player.pluck();
          this.gameState.currentTurn = Object.keys(this.lobby).find(
            (name) => name !== currentTurn
          );
        }
      }
    }
  }
}
