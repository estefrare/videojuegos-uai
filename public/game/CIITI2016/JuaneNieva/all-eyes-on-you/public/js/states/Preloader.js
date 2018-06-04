var PoligonosDeLaMuerte = PoligonosDeLaMuerte || {};

PoligonosDeLaMuerte.Preloader = function (game){
	this.preloadBar=null;
};

PoligonosDeLaMuerte.Preloader.prototype ={
	preload : function(){

		this.preloadBar=this.add.sprite(this.world.centerX,this.world.centerY,'preloaderBar');

		this.game.stage.backgroundColor = '#FFFFFF';
        this.preloadBar.anchor.setTo(0.5);
		
		this.time.advancedTiming = true;

		this.load.setPreloadSprite(this.preloadBar);
		
        this.load.tilemap('map','assets/data/level1.json',null,Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset','assets/images/tiles.png')
        
        //this.load.tilemap('map','assets/data/level2.json',null,Phaser.Tilemap.TILED_JSON);
		//this.load.image('tileset','assets/images/tiles.jpg')
        
		this.load.image('player','assets/images/player.png');
        
        this.load.image('background','assets/images/background4.png');
        
        this.load.image('zombie1','assets/images/zombie1.png');
        this.load.image('zombie2','assets/images/zombie2.png');
        
        this.load.image('hamburger','assets/images/hamburger.png');
        this.load.image('bullet','assets/images/nut.png');
        //this.load.image('bullet','assets/images/nut1.png');
		this.load.image('titlescreen','assets/images/titlescreen.png');
		this.load.image('button','assets/images/button.png');
        this.load.image('gameOver','assets/images/gameover.jpg');
        
        this.load.image('keyBoard','assets/images/wasd.png');
        
        this.load.audio('Darude-Sandstorm', ['assets/audio/Darude-Sandstorm.mp3', 'assets/audio/Darude-Sandstorm.ogg']);
        
        this.load.image('options','assets/images/options.png');
        
    this.game.load.spritesheet('explosion', 'assets/gfx/explosion.png', 128, 128);
        
        
		this.load.image('particulaSangre','assets/images/particulaSangre.png');
	},
	create:function(){
      
		this.state.start('MainMenu');
        //this.state.start('Level1');
	}
}