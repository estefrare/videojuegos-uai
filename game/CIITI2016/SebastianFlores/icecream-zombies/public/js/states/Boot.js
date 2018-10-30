var MyGame = MyGame || {};

MyGame.Boot = function(MyGame){

};

MyGame.Boot.prototype={
	init:function(){

		//cantidad máxima de punteros para pantalla táctil:
		this.input.maxPointers =3;

		//this.stage.disableVisibilityChange=true;
		this.game.renderer.renderSession.roundPixels = false;
	    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;
	},

	preload:function(){

		//          CAMBIO EL COLOR DE FONDO DEL WORLD:
		//background: #7ca;
    	this.game.stage.backgroundColor = 0x77ccaa;

		//this.load.image('preloaderBar','assets/images/ICECREAM-ZOMBIES-LOADING-BAR-05.png');
		this.load.image('preloaderBar','assets/images/PRELOADING-BAR-LINE.png');
		this.load.spritesheet('preloaderBack','assets/images/LOADING-BAR-SMALL-SPRITESHEET.png', 200, 80, 6, 0, 0);
	},

	create:function(){

		this.state.start('Preloader');
	},

}