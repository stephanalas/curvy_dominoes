export default class Domino {
  constructor(scene, dominoConfig) {
    this.name = 'domino';
    this.left = dominoConfig.left;
    this.right = dominoConfig.right;
    this.points = dominoConfig.left + dominoConfig.right;
    this.inverseLeft = this.right;
    this.inverseRight = this.left;
    this.sprite = dominoConfig.sprite;
    this.frame = dominoConfig.frame;
    this.inverseFrame = dominoConfig.inverseFrame;
    this.next = null;
    this.previous = null;
    this.isDouble = dominoConfig.isDouble;
    this.render = (x, y, type = 'player', inverse = false) => {
      // render dominos in game as player dominos
      if (type === 'player' || (this.left && this.right && type === 'player')) {
        this.sprite = 'white_dominoes';
      } else {
        this.sprite = 'blanks';
      }
      // .sprite you can set frame from spritesheet
      let domino = scene.add
        .sprite(x, y, this.sprite, this.frame)
        .setScale(2, 2)
        .setInteractive()
        .setData({
          left: this.left,
          right: this.right,
          frame: this.frame,
          name: this.name,
          inverseLeft: this.inverseLeft,
          inverseRight: this.inverseRight,
          type: type,
          sprite: this.sprite,
          totalPoints: this.points,
        });
      if (type === 'player' || (!this.points && type)) {
        scene.input.setDraggable(domino);
      }
      return domino;
    };
  }
}
