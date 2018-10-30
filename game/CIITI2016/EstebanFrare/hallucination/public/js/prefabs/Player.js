var Hallucination = Hallucination || {};

Hallucination.Player = function(game, x, y, key) {
	Phaser.Sprite.call(this, game, x, y, 'player');

	//this.game = game;
	game.physics.arcade.enable(this);
	this.anchor.setTo(0.5); 
	this.isJumping = false; 
	//reduce colliion area
	this.body.setSize(30, 78, 20, 13);
	this.body.collideWorldBounds = true;
	this.animations.add('runing', [0, 1, 2, 3, 4, 5], 14, false);  
	this.animations.add('jump', [13, 12, 12, 6, 0], 5, false);  
	this.health = 3;
	this.score = 0;
	this.ax = 100;
	this.ay = 100;
	this.win = false;
};

Hallucination.Player.prototype = Object.create(Phaser.Sprite.prototype);
Hallucination.Player.prototype.constructor = Hallucination.Player;

Hallucination.Player.prototype.update = function() {
	if(Hallucination.GameState.modePlayer == 'super'){
		if(this.angle <= 120 && this.angle >= 0){
			this.angle += 2;	
		}
	}
}

Hallucination.Player.prototype.damage = function() {
  this.health--;
  this.body.x = this.ax;
  this.body.y = this.ay;
  if(this.health <= 0){
  	this.kill();
  }
};


