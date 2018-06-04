var Chaos = Chaos || {};

Chaos.EnemyBullet = function(game, x, y, power) {
  Phaser.Sprite.call(this, game, x, y, 'bullet');
  
  //some default values
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.hit_power = power;
};

Chaos.EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
Chaos.EnemyBullet.prototype.constructor = Chaos.EnemyBullet;