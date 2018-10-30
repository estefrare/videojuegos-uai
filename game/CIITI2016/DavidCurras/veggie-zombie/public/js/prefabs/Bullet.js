var Veggies = Veggies || {};

Veggies.Bullet = function(state, x, y) {
  Phaser.Sprite.call(this, state.game, x, y, 'bullet');

  this.state = state;
  this.game = state.game;

  //init physics body
  this.game.physics.arcade.enable(this);
  this.body.velocity.x = 100;
};

Veggies.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Veggies.Bullet.prototype.constructor = Veggies.Bullet;

Veggies.Bullet.prototype.update = function(){
  //kill bullets that leave the screen
  if(this.x >= this.game.width) {
    this.kill();
  }
};