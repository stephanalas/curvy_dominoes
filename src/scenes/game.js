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
      startDomino: null,
      // left and right should be numbers
      left: null,
      right: null,
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
    const { decideFirst } = this.GameHandler;
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
    this.time.addEvent({
      delay: 1000,
      callback: function () {
        // decide first should change game state
        const { first, highestDouble } = decideFirst(this.lobby);
        const { gameState } = this;
        gameState.currentTurn = first;

        // potential function play domino

        // remove domino from current group
        const currentPlayer = this.lobby[first];

        currentPlayer.hand.remove(highestDouble);
        // add tween to move domino to chain
        this.tweens.add({
          targets: highestDouble,
          x: 400,
          y: 300,
          duration: 500,
        });

        gameState.isActive = true;

        gameState.currentTurn = Object.keys(this.lobby).filter(
          (name) => name !== this.gameState.currentTurn
        )[0];

        gameState.startDomino = highestDouble;
        // changes current turn
      },
      callbackScope: this,
    });
  }
  update(time, deltaTime) {
    if (time > 7000) {
      const { gameState } = this;
      if (gameState.isActive) {
        // check if its bots turn
        if (gameState.currentTurn) {
          const currentPlayer = this.lobby[gameState.currentTurn];

          if (currentPlayer.isBot) {
            // look through bots hand and find first matching domino
            const playableDomino = currentPlayer.hand
              .getChildren()
              .find((child) => {
                const { left, right } = child.data.list;
                if (!gameState.left && !gameState.right) {
                  const startDomino = gameState.startDomino;
                  if (
                    startDomino.data.list.left === left ||
                    startDomino.data.list.right === right
                  ) {
                    return child;
                  } else {
                    const leftDomino = this.gameState.left;
                    const rightDomino = this.gameState.right;
                    if (
                      l.data.list.left === left ||
                      startDomino.data.list.right === right
                    ) {
                      return child;
                    }
                  }
                }
              });
            // grab
            const position = gameState.startDomino.getBottomCenter();

            this.tweens.add({
              targets: playableDomino,
              x: position.x,
              y: position.y,

              onUpdate: function () {
                playableDomino.setAngle(180 * this.progress);
              },
            });

            gameState.currentTurn = Object.keys(this.lobby).filter(
              (player) => player.name !== gameState.currentTurn
            )[0];
            // peform bots play
            // check left and right values of gamestate
            // find a sprite in bot hand matching
            // left or right values
            // remove it from group
          } else {
            // can I play if not we pluck dominoes
            // I want to check left and right values in gamestate
            // iterate through current hand
            // if domino.left or domino.right  values don't match left and right values
            // make sprite transparent
            // make dominoes slightly bigger
            // if it does match add input event listener
            // once clicked on [matching domino] then we want to show a transparent sprite on a potential play
            // create domino matching selected sprite
            // set domino near Left or right value
          }
        }
        // if (currentPlayer.isBot) console.log('010101');
      }
    }
  }
}
