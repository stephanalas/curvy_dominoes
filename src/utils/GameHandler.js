export default class GameHandler {
  constructor(scene) {
    this.startGame = (lobby, gameState) => {
      // decide first should change game state
      const { first, highestDouble } = this.decideFirst(lobby);
      gameState.currentTurn = first;

      // potential function play domino

      // remove domino from current group
      const currentPlayer = lobby[first];

      currentPlayer.hand.remove(highestDouble);
      // add tween to move domino to chain
      scene.tweens.add({
        targets: highestDouble,
        x: 400,
        y: 300,
        duration: 500,
        onComplete: function () {
          gameState.isActive = true;
          gameState.leftDomino = {
            value: highestDouble.left.value,
            domino: highestDouble,
          };
          gameState.rightDomino = {
            value: highestDouble.right.value,
            domino: highestDouble,
          };
          gameState.leftDomino.domino.setInteractive();
          scene.input.enableDebug(gameState.leftDomino);
        },
      });

      gameState.currentTurn = Object.keys(lobby).filter(
        (name) => name !== gameState.currentTurn
      )[0];
    };

    this.decideFirst = (lobby) => {
      // function does not return player name [eventually i would want function to return player id/socketid]

      let first = null,
        highestDouble = null;

      for (let player in lobby) {
        // grab current player
        const curPlayer = lobby[player];
        // checks for highest double, returns null if none is found
        const double = this.getHighestDouble(curPlayer.hand);
        if (!double) continue;
        else {
          if (
            !highestDouble ||
            highestDouble.data.points < double.data.points
          ) {
            first = curPlayer.name;
            highestDouble = double;
          }
        }
      }

      return {
        first,
        highestDouble,
      };
    };
  }
  getHighestDouble(dominoGroup) {
    let highestDouble = null;
    dominoGroup.getChildren().forEach((domino) => {
      const { isDouble, points } = domino.data;
      if (!isDouble) return;
      if (!highestDouble) highestDouble = domino;
      else highestDouble.data.points > points ? null : (highestDouble = domino);
    });
    return highestDouble;
  }
}
