class Wall {
  constructor(x, y, group) {
    this.sprite = group.create(x, y, 'wall');
    this.sprite.body.immovable = true;
  }
}
