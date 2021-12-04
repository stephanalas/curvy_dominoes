export default class Player {
  constructor(playerConfig, scene) {
    this.id = playerConfig.id;
    this.name = playerConfig.name;
    this.hand = scene.add.group();
    this.points = 0;
    this.isBot = playerConfig.isBot || false;
  }

  // might want to create instance method to play domino
}
