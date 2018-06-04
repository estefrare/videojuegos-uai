var Chaos = Chaos || {};

Chaos.Asteroid = function(game, x, y, key, target) {
  Phaser.Sprite.call(this, game, x, y, key);

  this.game = game;
  this.target = target;
  //enable physics
  this.health = 2;
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

Chaos.Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Chaos.Asteroid.prototype.constructor = Chaos.Asteroid;

Chaos.Asteroid.prototype.update = function() {
  this.game.physics.arcade.moveToXY(this, this.target.x + 20, this.target.y + 20, 100);
  // var destination = this.game.world.bounds.bottomRight;
  // this.game.physics.arcade.moveToXY(this, destination.x + 20, destination.y + 20, 100);
};