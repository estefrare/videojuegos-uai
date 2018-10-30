window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-canvas');
	game.state.add('GameState', GameState);
	game.state.start('GameState');
};
