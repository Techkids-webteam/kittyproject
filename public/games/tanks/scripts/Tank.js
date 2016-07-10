class Tank{
  constructor(id, x, y, group, name){
    this.sprite = group.create(x, y, 'tankDown');
    this.name = name;
    var text = new Phaser.Text(this.sprite.game, 0, -25, name, {
      font: 'bold 11pt Arial',
      fill : 'white',
      stroke : 'black',
      strokeThickness : 3
    });
    text.anchor.set(0.5,0.5);
    this.sprite.addChild(text);
    this.id = id;
    TankOnline.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.set(0.5,0.5);
    this.direction = new Phaser.Point(0,1);
    this.lastShotTime = TankOnline.game.time.now;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.health = 1;
    this.sprite.events.onKilled.add(this.explode, this);
  }

  update(direction){
    if(direction.x < 0){
      this.sprite.body.velocity.x = -250;
      this.sprite.loadTexture('tankLeft');
      this.direction = new Phaser.Point(-1,0);
    }
    else if (direction.x > 0){
      this.sprite.body.velocity.x = 250;
      this.sprite.loadTexture('tankRight');
      this.direction = new Phaser.Point(1,0);
    }
    else{
      this.sprite.body.velocity.x = 0;
    }

    if(direction.y < 0){
      this.sprite.body.velocity.y = -250;
      this.sprite.loadTexture('tankUp');
      this.direction = new Phaser.Point(0,-1);
    }
    else if (direction.y > 0){
      this.sprite.body.velocity.y = 250;
      this.sprite.loadTexture('tankDown');
      this.direction = new Phaser.Point(0,1);
    }
    else{
      this.sprite.body.velocity.y = 0;
    }
  }

  explode(){
    TankOnline.onTankExploded(this.sprite.position);
  }
}
