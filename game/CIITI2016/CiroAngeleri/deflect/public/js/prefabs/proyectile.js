var Deflect = Deflect || {};

Deflect.Proyectile = function(game, vidas) {
  var randomPositionX = game.rnd.integerInRange(5,game.width - 5)
  Phaser.Sprite.call(this, game, randomPositionX,5, "proyectile")
  game.physics.p2.enable(this);
  this.body.setCollisionGroup(Deflect.proyectileCollisionGroup)
  this.body.collides(Deflect.lineCollisionGroup)
  this.body.collides(Deflect.proyectileCollisionGroup, this.die.bind(this));
  this.checkWorldBounds = true;
  this.body.collideWorldBounds = false;


}

Deflect.Proyectile.prototype = Object.create(Phaser.Sprite.prototype);
Deflect.Proyectile.prototype.constructor = Deflect.Proyectile;

Deflect.Proyectile.prototype.update = function () {

  //kill if off world in the bottom and top
  if(this.position.y <= 0) {
    this.kill();
  }

}

Deflect.Proyectile.prototype.die = function () {
    var emitter = this.game.add.emitter(this.x, this.y, 5);
    emitter.makeParticles('particle')
    emitter.minParticleSpeed.setTo(-100, -100);
    emitter.maxParticleSpeed.setTo(100, 100);
    emitter.gravity = 100;
    emitter.start(true, 0, null, 100);
    this.kill();

}


Deflect.Proyectile.prototype.dieFloor = function () {
    this.kill();

}
