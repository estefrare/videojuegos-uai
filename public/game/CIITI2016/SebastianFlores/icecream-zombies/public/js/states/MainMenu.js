MyGame.MainMenu = function(game){

};

MyGame.MainMenu.prototype = {
	create: function(MyGame){

		this.titleScreen = this.add.sprite(this.world.centerX,this.world.centerY -
				20,'titleScreen');
		this.titleScreen.scale.setTo(0.5,0.5);
		this.titleScreen.anchor.setTo(0.5,0.5);
		/*
		this.createButton(this,"Play",this.world.centerX,this.world.centerY + 32, 50, 30,
			function(){ 
			this.mainMenuMusic.stop();
			this.state.start('Level1');
		});
		*/
		this.createButton(this,"Play",this.world.centerX,this.world.centerY + 70, 200,80,
			function(){ 
			this.mainMenuMusic.stop();
			this.state.start('Level1');
		});

		/*
		this.createButton(this,"About",this.world.centerX,this.world.centerY + 82, 50, 30,
			function(){ 
			//this.state.start('Level1');
			console.log('About');
		});
		*/
			
		this.mainMenuMusic = this.game.add.audio('mainMenuMusic');
      	this.mainMenuMusic.volume=1;
      	this.mainMenuMusic.play();
		


	},

	update: function(MyGame){

	},

	createButton: function(MyGame,string,x,y,w,h,callback){
		var button1 = this.game.add.button(x,y, 'startButton',callback,this,2,1,0);

		button1.anchor.setTo(0.5,0.5);
		button1.width = w;
		button1.heigth = h;
		button1.scale.setTo(0.7,0.7);
		/*
		var txt = this.game.add.text(button1.x, button1.y, string, {
			font: "14px Arial",
			fill: "#fff",
			align: "center"

		});
		txt.anchor.setTo(0.5,0.5);
		*/

	},
};