var GameState = {
	init: function () {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y=1000;

		this.cursos= this.game.input.keyboard.createCursorKeys();
	},
	preload: function() {
		this.load.image('ground', 'assets/images/ground.png');
		this.load.image('platform', 'assets/images/platform.png');
		this.load.image('goal', 'assets/images/gorilla3.png');
		this.load.image('arrowButton', 'assets/images/arrowButton.png');
		this.load.image('actionButton', 'assets/images/actionButton.png');
		this.load.image('barrel', 'assets/images/barrel.png');
		this.load.spritesheet('player', 'assets/images/player_spritesheet.png',28,30,5,1,1);
		this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png',20,21,2,1,1);
	},
	create: function() {
		this.ground = this.add.sprite(0,500,'ground');
		this.game.physics.arcade.enable(this.ground);
		this.ground.body.allowGravity=false;
		this.ground.body.immovable=true;

		this.platform=this.game.add.sprite(0,300,'platform');
		this.game.physics.arcade.enable(this.platform);
		this.platform.body.allowGravity=false;
		this.platform.body.immovable=true;

		this.player = this.add.sprite(100,200, 'player',3);
		this.game.physics.arcade.enable(this.player);
		this.player.anchor.setTo(0.5);
		//this.player.animatios.add('walking',[0,1,2,1],6,true);
	},
	update: function() {
		this.game.physics.arcade.collide(this.player,this.ground,this.landed);
		this.game.physics.arcade.collide(this.player,this.platform,this.landed);
		this.player.body.velocity.x=0;

		if (this.cursos.left.isDown) 
		{
			this.player.body.velocity.x=-180;
		}else if (this.cursos.right.isDown) 
		{
			this.player.body.velocity.x=180;
		}
		if (this.cursos.up.isDown && this.player.body.touching.down) 
		{
			this.player.body.velocity.y=-650;
		}
	},
	landed:function () {
		console.log("landed");
	}
};