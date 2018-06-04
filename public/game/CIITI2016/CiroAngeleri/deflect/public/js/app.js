var Deflect = Deflect || {};


window.onload = function() {
	Deflect.game = new Phaser.Game(360, 650, Phaser.AUTO, 'game-canvas');
	Deflect.game.state.add('GameState', Deflect.GameState);
	Deflect.game.state.start('GameState');
};
