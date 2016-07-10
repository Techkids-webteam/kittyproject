class InputController{
  constructor(keyboard, tank){
    this.keyboard = keyboard;
    this.tank = tank;
    this.lastShotTime = TankOnline.game.time.now;
    this.currentMovingDirection = new Phaser.Point(0,0);
  }

  update(){
    if(this.tank.sprite.alive){
      var direction = new Phaser.Point();
      if(this.keyboard.isDown(Phaser.KeyCode.LEFT)) direction.x = -1;
      else if (this.keyboard.isDown(Phaser.KeyCode.RIGHT)) direction.x = 1;
      else direction.x = 0;

      if(this.keyboard.isDown(Phaser.KeyCode.UP)) direction.y = -1;
      else if (this.keyboard.isDown(Phaser.KeyCode.DOWN)) direction.y = 1;
      else direction.y = 0;

      this.tank.update(direction);
      if(!direction.equals(this.currentMovingDirection)){
        this.currentMovingDirection = direction;
        TankOnline.client.move(
          {
            x: this.tank.sprite.x,
            y: this.tank.sprite.y
          }, direction
        );
      }

      if(this.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
        && TankOnline.game.time.now - this.lastShotTime > 200 ){

        this.lastShotTime = TankOnline.game.time.now;
        this.fire();

        TankOnline.client.fire(
          {
            x: this.tank.sprite.x,
            y: this.tank.sprite.y
          }, TankOnline.tank.direction
        );
      }
    }
  }
  
  fire(){
    new Bullet(this.tank);
  }
}
