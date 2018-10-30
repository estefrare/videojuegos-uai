var endScreen= {
	init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
	},
	preload: function() {
	this.load.image('background', 'assets/images/background.png');

	},
	create: function() {
    this.add.image(this.world.centerX, this.world.centerY, 'background').anchor.set(0.5);
   	this.add.text(
        this.game.width / 2 - 60, this.game.height / 2 - 100, 
        'Eagle Eye', 
        { font: '30px sans-serif', fill: '#000'}
    );
   	this.add.text(
        this.game.width / 2 -190, this.game.height / 2 -50, 
        'CONGRATULATIONS!', 
        { font: '40px sans-serif', fill: '#000'}
    );

    this.add.text(this.game.width / 2 - 95, this.game.height / 2 +10, 
        'Press Z or Enter to start again', 
        { font: '16px sans-serif', fill: '#000'}
    );
    
	},
	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            this.game.state.start('Game1');
		};
	}
};
