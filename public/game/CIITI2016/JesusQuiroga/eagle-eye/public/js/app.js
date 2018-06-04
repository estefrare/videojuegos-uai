window.onload = function() {
	var game = new Phaser.Game(640, 360, Phaser.AUTO, 'game-canvas');

	game.state.add('Game1', GameState1);
	game.state.add('Game2', GameState2);
	game.state.add('Game3', GameState3);
	game.state.add('endScreen', endScreen);
	game.state.add('mainMenu', mainMenu);

	game.state.start('mainMenu');
};
