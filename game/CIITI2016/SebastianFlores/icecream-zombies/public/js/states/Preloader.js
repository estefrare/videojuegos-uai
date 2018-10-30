MyGame.Preloader = function(game){

	this.preloadBar = null;
}

MyGame.Preloader.prototype={
	preload:function(){

		this.stage.disableVisibilityChange=true;
		this.game.renderer.renderSession.roundPixels = false;
	    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');
		this.preloadBar.scale.setTo(1,0.5);
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.preloadBar.x=this.world.centerX;
		this.preloadBar.y=this.world.centerY+100;
		//this.preloadBar.x=0;
		//this.preloadBar.y=0;

		this.preloadBack = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBack');
		this.preloadBack.animations.add('loading', [0, 1, 2, 3, 4, 5], 12, true);
		this.preloadBack.play('loading');
		this.preloadBack.scale.setTo(1.5,1.5);
		this.preloadBack.anchor.setTo(0.5,0.5);
		this.preloadBack.x=this.world.centerX;
		this.preloadBack.y=this.world.centerY;

		this.time.advancedTiming = true;

		//this.load.setPreloadSprite(this.preloadBar);

		//CARGAR TODOS LOS ASSETS:

		//this.load.tilemap('map','assets/images/Mapa01.csv')
		this.load.tilemap('map','assets/images/Level1_MAPA.csv')
		this.load.tilemap('map-CALLBACKS','assets/images/Level1_CALLBACKS.csv')
		//this.load.tilemap('mapGround','assets/images/Mapa01_B_Ground.csv')
		//this.load.tilemap('mapJumping','assets/images/Mapa01_B_Jumping.csv')
		//this.load.image('tileset','assets/images/Platformer-pixel-690.png')
		//this.load.image('tileset','assets/images/spritesheet_MAP.png')
		//this.load.image('tileset','assets/images/tileground.png')
		this.load.image('tileset','assets/images/TILESET-SEBA.png')
		

		//PRELOAD DE SONIDOS:
		//  Firefox doesn't support mp3 files, so use ogg

		//JUGADOR:
		//*******

		//CAMINA EL JUGADOR:
		this.load.audio('playerFoot1', 'assets/audio/SoundEffects/footstep01.ogg');
		this.load.audio('playerFoot2', 'assets/audio/SoundEffects/footstep02.ogg');

		//SALTO DEL JUGADOR:
		this.load.audio('playerJump', 'assets/audio/SoundEffects/NFF-kid-move.wav');

		//ATAQUE CON BAT DE BASEBALL / SWING AL AIRE:
		this.load.audio('batSwish', 'assets/audio/SoundEffects/swish_2.wav');
    	this.load.audio('rangeWeaponSound', 'assets/audio/SoundEffects/swish_3.wav');
   	 	//this.load.audio('swish4', 'assets/audio/SoundEffects/swish_4.wav');


   	 	//ATAQUE CON BAT DE BASEBALL (GOLPE):
		this.load.audio('batHit', 'assets/audio/SoundEffects/hit-6.ogg');

   	 	//AGARRAR OBJETOS QUE DEN PUNTOS (EJ. MONEDAS...):
   	 	this.load.audio('coinTake', 'assets/audio/SoundEffects/sfx_coin_double2.wav');
   	 	this.load.audio('powerUpTake', 'assets/audio/SoundEffects/NFF-fruit-collected.wav');
   	 	this.load.audio('weaponTake', 'assets/audio/SoundEffects/NFF-glocken-good.wav');
   	 	
   	 	//LOGRO DEL JUGADOR:
   	 	this.load.audio('playerYahoo', 'assets/audio/SoundEffects/NFF-yahoo.wav');

   	 	//GANA EL NIVEL:
   	 	this.load.audio('playerWin', 'assets/audio/SoundEffects/NFF-success.wav');

   	 	//NEW HIGSCORE:
   	 	this.load.audio('newHighScore', 'assets/audio/SoundEffects/new_highscore.ogg');

   	 	//ENEMIGOS:
   	 	//********
   	 	this.load.audio('zombieWalk', 'assets/audio/SoundEffects/enemy/zombie20.wav');
   	 	this.load.audio('zombieAttack1', 'assets/audio/SoundEffects/enemy/zombie10.wav');
   	 	this.load.audio('zombieAttack2', 'assets/audio/SoundEffects/enemy/zombie11.wav');
   	 	this.load.audio('zombieDie', 'assets/audio/SoundEffects/enemy/monster1_die.wav');
   	 	this.load.audio('zombiePain', 'assets/audio/SoundEffects/enemy/monster1_pain.wav');

   	 	//RISA ENEMIGA (MUERE EL JUGADOR):
   	 	this.load.audio('enemyLaugh', 'assets/audio/SoundEffects/NFF-man-silly-laugh.wav');



		//MÚSICAS:  
		//******* 	 	
		//BACKMUSIC1:
    	//this.load.audio('backMusic1', ['assets/audio/Music/170458__darkozl__spacetime-loop.mp3', 'assets/audio/Music/277325__shadydave__time-break.wav'],0.5,true);
    	this.load.audio('backMusic1', ['assets/audio/Music/277325__shadydave__time-break.wav'],1.5,true);
    	//this.load.audio('backMusic2', ['assets/audio/Music/LOOP 365639__zagi2__colourful-trash-loop.wav', 'assets/audio/Music/LOOP 365639__zagi2__colourful-trash-loop.wav'],0.5,true);

    	//MAINMENU:
    	//this.load.audio('mainMenuMusic', ['assets/audio/Music/bensound-cute.mp3'],0.5,true);
    	this.load.audio('mainMenuMusic', ['assets/audio/Music/365513__noedell__noedell-shady-scheme-03.wav'],0.5,true);

    	//GAME OVER:
    	this.load.audio('gameOverSound', ['assets/audio/SoundEffects/NFF-zomboid.wav', 'assets/audio/SoundEffects/NFF-zomboid.mp3'],1,true);

   	 	//this.batSwish = this.add.audio('batSwish');
	    //this.sword = this.add.audio('sword');
	    //this.blaster = this.add.audio('blaster');

	    //  Being mp3 files these take time to decode, so we can't play them instantly
	    //  Using setDecodedCallback we can be notified when they're ALL ready for use.
	    //  The audio files could decode in ANY order, we can never be sure which it'll be.

	    //this.sound.setDecodedCallback([ this.batSwish, this.sword, this.blaster ], this.start, this);

	    //IMÁGENES PARA LOS MENÚES:
	    //*************************
	    this.load.image('titleScreen','assets/images/ICECREAM-ZOMBIES-MAIN-SCREEN.png');
		
		this.load.image('startButton','assets/images/PLAY-BUTTON.png');

		//POWERUPS E ITEMS AGARRABLES:
		this.load.image('powerUpIceCream01', 'assets/images/HELADO-01.png');
		this.load.image('powerUpIceCream02', 'assets/images/HELADO-02.png');
		this.load.image('powerUpIceCream03', 'assets/images/HELADO-03.png');
	},

	create:function(){

		//this.state.start('Level1');
		this.start();
	},

	start: function() {
		this.state.start('MainMenu');
		//this.state.start('Level1');
	}
}