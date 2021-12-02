export default class Player {
  constructor(playerName, scene, isBot = true) {
    this.name = playerName;
    this.hand = scene.add.group();
    this.points = 0;
    this.isBot = isBot;
  }
}
