var PoligonosDeLaMuerte = PoligonosDeLaMuerte || {};

PoligonosDeLaMuerte.Normal = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'bullet');
    this.game=game;
    //this.anchor.setTo(0.5);
    //this.scale.setTo(0.4);
    this.game.physics.arcade.enable(this);
    this.outOfBoundsKill=true;
    this.checkWorldBounds=true;
    this.body.setCircle(5);
}

PoligonosDeLaMuerte.Normal.prototype = Object.create(Phaser.Sprite.prototype);
PoligonosDeLaMuerte.Normal.prototype.constructor = PoligonosDeLaMuerte.Normal;

PoligonosDeLaMuerte.Normal.prototype.update = function() {    
    
};

