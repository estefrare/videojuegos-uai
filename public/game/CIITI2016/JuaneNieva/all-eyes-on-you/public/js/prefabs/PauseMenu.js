var PoligonosDeLaMuerte = PoligonosDeLaMuerte || {};

PoligonosDeLaMuerte.PauseMenu= function(game) {
	Phaser.Sprite.call(this, game, 500 , 500,'options');
    this.game.physics.arcade.enable(this);
    this.game=game;
    this.anchor.setTo(0.5);
    this.scale.setTo(0.3);
}

PoligonosDeLaMuerte.PauseMenu.prototype = Object.create(Phaser.Sprite.prototype);
PoligonosDeLaMuerte.PauseMenu.prototype.constructor = PoligonosDeLaMuerte.PauseMenu;

PoligonosDeLaMuerte.PauseMenu.prototype.update = function() {
    
    this.game.world.bringToTop(this);
    console.log('PauseMenu')
    
};