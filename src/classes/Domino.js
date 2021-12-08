export default class Domino extends Phaser.GameObjects.Sprite {
  constructor(scene, config) {
    if (!config.x && !config.y) {
      config.x = 100;
      config.y = 100;
    }
    // config.sprite = config.points ? 'blanks' : 'white_dominoes';
    if (!(config.leftValue + config.rightValue)) config.texture = 'blanks';
    else config.texture = 'white_dominoes';
    super(scene, config.x, config.y, config.texture, config.frame);
    scene.add.existing(this);
    this.scale = 2;
    this.setActive = true;
    this.data = config;
    this.name = 'domino';
    this.data.points = config.leftValue + config.rightValue;
    let left, right;
    if (this.isDouble) {
      left = this.getBottomCenter();
      right = this.getTopCenter();
    } else {
      left = this.getLeftCenter();
      right = this.getRightCenter();
    }
    this.left = {
      value: config.leftValue,
      x: left.x,
      y: left.y,
      playable: true,
    };
    this.right = {
      value: config.rightValue,
      x: right.x,
      y: right.y,
      playable: true,
    };

    this.updatePosition = () => {
      // position must be updated after tweens
      const leftPosition = this.getLeftCenter();
      const rightPosition = this.getRightCenter();
      this.right.x = rightPosition.x;
      this.right.y = rightPosition.y;
      this.left.x = leftPosition.x;
      this.left.y = leftPosition.y;
    };
  }
  update() {
    this.updatePosition();
  }
}
