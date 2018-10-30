var MyGame = MyGame || {};
window.onload = function() {



	//MyGame.game = new Phaser.Game(760, 480, Phaser.AUTO, 'game-canvas',null,false,true);
	//MyGame.game = new Phaser.Game(480, 340, Phaser.AUTO, 'game-canvas',null,false,true);
	MyGame.game = new Phaser.Game(460, 320, Phaser.AUTO, 'game-canvas',null,false,true);
	//MyGame.game = new Phaser.Game(380, 240, Phaser.AUTO);
	

	//			ESTADOS DEL JUEGO:
	//****************************
	MyGame.game.state.add('Boot', MyGame.Boot);
	MyGame.game.state.add('Preloader', MyGame.Preloader);
	MyGame.game.state.add('MainMenu', MyGame.MainMenu);
	MyGame.game.state.add('Level1', MyGame.Level1);


	MyGame.game.state.start('Boot');
	MyGame.game.state.smoothed = false;

};
