var PoligonosDeLaMuerte = PoligonosDeLaMuerte || {};
 
PoligonosDeLaMuerte.Boot = function (game){};

PoligonosDeLaMuerte.Boot.prototype ={
	init:function(){
		
	},
	preload : function(){
		this.load.image('preloaderBar','assets/images/preloader.png');

	},
	create:function(){
	//loading screen will have a white background
    this.game.stage.backgroundColor = '#FFFFFF';
    this.input.maxPointers =1;
    this.stage.disableVisibilityChange = true;
    //scaling options
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    //this.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;

    //screen size will be set automatically
    //this.scale.setScreenSize(true);
    //No funciona...

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
        
    this.state.start('Preloader');
	}
}