var Hallucination = Hallucination || {};

Hallucination.Coin = function(game, x, y, key) {
	Phaser.Sprite.call(this, game, x, y, key);

  game.physics.arcade.enable(this);
  if(navigator.platform == 'Win32'){	
  	this.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 13, true);
    this.play('spin');
  }
}

Hallucination.Coin.prototype = Object.create(Phaser.Sprite.prototype);
Hallucination.Coin.prototype.constructor = Hallucination.Coin;

Hallucination.Coin.prototype.update = function() {
  if(this.inCamera){
    this.play('spin');
  }else{
    this.animations.stop();
  }
};