export default class GameHandler {
  constructor(scene) {
    this.playBotTurn = (gameState, botHand) => {
      console.log('hello');
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
            highestDouble.data.list.points < double.data.list.points
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
      const { isDouble, points } = domino.data.list;
      if (!isDouble) return;
      if (!highestDouble) highestDouble = domino;
      else
        highestDouble.data.list.points > points
          ? null
          : (highestDouble = domino);
    });
    return highestDouble;
  }
}
