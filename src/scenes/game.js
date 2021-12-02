import whiteDominoesImage from '../assets/dominoes/black_and_white_dominoes.png';
import blankDominoesImage from '../assets/dominoes/blanks.png';
import Player from '../classes/Player';
import DominoHandler from '../utils/DominoHandler';
export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'game',
    });
    this.gameState = {
      isActive: false,
      currentTurn: null,
      leftValue: null,
      rightValue: null,
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
    this.DominoHandler = new DominoHandler(this);
    const { createDominoes, shuffleDominoes, dealDominoes } =
      this.DominoHandler;
    this.dominoes = shuffleDominoes(createDominoes());
    const stephan = new Player('stephan', this, false);
    const bot = new Player('dru', this);
    dealDominoes(this.dominoes, [stephan, bot]);
  }
  update(time, deltaTime) {}
}
