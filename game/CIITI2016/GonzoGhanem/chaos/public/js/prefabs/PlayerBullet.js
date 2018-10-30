var Chaos = Chaos || {};

Chaos.PlayerBullet = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullet');
  
  //some default values
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

Chaos.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
Chaos.PlayerBullet.prototype.constructor = Chaos.PlayerBullet;