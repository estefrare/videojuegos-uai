var MyGame = MyGame || {};

MyGame.EnemyBulletZombieNormal = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'barrel');
  //this.body.velocity.x=10;
  //some default values
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  //this.body.velocity.x=100;
  this.exists = true;
  //this.game.physics.enable(this.body);
  //this.game.physics.arcade.velocityFromAngle(0, 10, this.body.velocity);
};

MyGame.EnemyBulletZombieNormal.prototype = Object.create(Phaser.Sprite.prototype);
MyGame.EnemyBulletZombieNormal.prototype.constructor = MyGame.EnemyBulletZombieNormal;

MyGame.EnemyBulletZombieNormal.prototype.update = function() {
  
  
    //this.body.velocity.x+= 10;


  //kill if off world in the bottom
  if(this.position.x > this.game.world.width) {
    this.kill();
  }
  if(this.position.y > this.game.world.height) {
    this.kill();
  }
};