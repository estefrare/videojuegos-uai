var PoligonosDeLaMuerte = PoligonosDeLaMuerte || {};

PoligonosDeLaMuerte.Hamburgers= function(game, x, y ) {
	Phaser.Sprite.call(this, game, x, y, 'hamburger');
    this.game.physics.arcade.enable(this);
    this.game=game;
    this.anchor.setTo(0.5);
    this.scale.setTo(0.3);
    this.isAttached=false;
    this.isFollowed=false;
}

PoligonosDeLaMuerte.Hamburgers.prototype = Object.create(Phaser.Sprite.prototype);
PoligonosDeLaMuerte.Hamburgers.prototype.constructor = PoligonosDeLaMuerte.Hamburgers;

