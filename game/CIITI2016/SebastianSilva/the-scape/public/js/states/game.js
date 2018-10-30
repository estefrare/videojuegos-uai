var GameState = {
  init: function() {

   this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   this.scale.pageAlignHorizontally = true;
   this.scale.pageAlignVertically = true;

   this.game.physics.startSystem(Phaser.Physics.ARCADE);
   this.game.physics.arcade.gravity.y = 1000;

   this.game.world.setBounds(0, 0, 7000, 700);

   this.cursors = this.game.input.keyboard.createCursorKeys();
    
  },

  preload: function() {
    //                      Para dar color al Fondo sin cargar una imagen
    //this.game.stage.backgroundColor = 0x111133;t
    //--------------------------------------------------------------------------

   //                            Cargar Fondo
   this.load.image('gem','assets/images/gem.png');
   this.load.image('fondo','assets/images/imagen.png');
   this.load.image('actionButton', 'assets/images/actionButton.png');
   this.load.image('ground', 'assets/images/ground.png');
   this.load.image('platform', 'assets/images/platform.png');
   this.load.image('arrowButton', 'assets/images/arrowButton.png');
   this.load.image('actionButton', 'assets/images/actionButton.png');
   this.load.image('barrel', 'assets/images/barrel.png');
   this.load.spritesheet('coin', 'assets/images/coin.png',32,30,6,1 ,1);
   this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
   this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
   //----------------------------------------------------------------------------
   this.load.json('level', 'assets/data/level.json');

  },

  create: function() {
 
    //                              Variables
    this.score = 0;
    this.scoreBuffer = 0;
   //-----------------------------------------------------------------------------

   //Imagen de Fondo 
      for (var posX = 0; posX < this.game.world.width; posX+=1024) {
        var fondo = this.game.add.sprite(posX,120,'fondo');
      }
   //--------------------------------------------------------------------------

   //                                Suelo
   this.grounds = this.add.group();
   this.grounds.enableBody=true;
   for (var i = 0 ; i < this.game.world.width ; i+=360) {
    var ground = this.grounds.create(i,628,'ground');
   }
   this.levelData = this. game.cache.getJSON('level');
   this.grounds.setAll('body.allowGravity', false);
   this.grounds.setAll('body.immovable', true);
   //-----------------------------------------------------------------------------

   //                                PlataFormas
   var platformsData = this.levelData.platformData;
   this.platforms = this.add.group();
   this.platforms.enableBody = true;
   for (var i = 0; i < platformsData.length; i++) {
    this.platforms.create(platformsData[i].x, platformsData[i].y, 'platform')  
   }
   this.platforms.setAll('body.allowGravity', false);
   this.platforms.setAll('body.immovable', true);
   //-----------------------------------------------------------------------------

   //                                 coin
   var coinData = this.levelData.coinData;
   this.coins = this.add.group();
   this.coins.enableBody = true;
  for (var i = 0; i < coinData.length; i++) {
    var coin = this.coins.create(coinData[i].x, coinData[i].y, 'coin');
    coin.animations.add('shiny', [0,1,2,3,4,5,6,0], 4, true);
    coin.play('shiny');
  }
   this.coins.setAll('body.allowGravity', false);
   this.coins.setAll('body.immovable', true);
   //----------------------------------------------------------------------------

   //                                Fuego
   var fireData = this.levelData.fireData;
   this.fires = this.add.group();
   this.fires.enableBody = true;
  for (var i = 0; i < fireData.length; i++) {
    var fire = this.fires.create(fireData[i].x, fireData[i].y, 'fire');
    fire.animations.add('burning', [0,1], 4, true);
    fire.play('burning');
  }
   this.fires.setAll('body.allowGravity', true);
   //----------------------------------------------------------------------------

   //                      El jugador y su configuración
   this.player = this.add.sprite(10, 545, 'player', 3);
   this.game.physics.arcade.enable(this.player);
   this.player.anchor.setTo(0.5);
   this.player.scale.setTo(-1,1);
   this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
   this.player.body.collideWorldBounds = true;

   this.player.autoWalk=false;
   this.player.colliding=false;
   //----------------------------------------------------------------------------

   //                              Barriles
   this.barrels = this.add.group();
   this.barrels.enableBody = true;
   setInterval(this.createBarrel.bind(this), 4500);
   //                              Barriles2
   this.barrel2 = this.add.group();
   this.barrel2.enableBody = true;
   setInterval(this.createBarrel2.bind(this), 5500);
   //                              Barriles3
   this.barrel3 = this.add.group();
   this.barrel3.enableBody = true;
   setInterval(this.createBarrel3.bind(this), 5000);
   //                              Barriles4
   this.barrel4 = this.add.group();
   this.barrel4.enableBody = true;
   setInterval(this.createBarrel4.bind(this), 6000);
   //----------------------------------------------------------------------------

   //                          Touch    
   this.addTouchControls();
   //----------------------------------------------------------------------------

   //                          Score
   this.createScore();
   //----------------------------------------------------------------------------

  this.gem = this.add.sprite(this.levelData.Winner.x, this.levelData.Winner.y, 'gem');
  this.game.physics.arcade.enable(this.gem);
  this.gem.body.allowGravity = true;


   //                          Camara
   this.game.camera.follow(this.player);
   //----------------------------------------------------------------------------

  },

  update: function() {

    //                        Collide
    this.game.physics.arcade.collide(this.player, this.grounds);
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.coins,  this.grounds);
    this.game.physics.arcade.collide(this.coins, this.platforms);
    this.game.physics.arcade.collide(this.fires,  this.grounds);
    this.game.physics.arcade.collide(this.fires, this.platforms);
    this.game.physics.arcade.collide(this.gem, this.grounds);
    
    //----------------------------------------------------------------------------
    
    //                        Overlap
    this.game.physics.arcade.overlap(this.fires, this.player, this.kill.bind(this));
    this.game.physics.arcade.overlap(this.barrels, this.player, this.kill.bind(this));
    this.game.physics.arcade.overlap(this.barrel2, this.player, this.kill.bind(this));
    this.game.physics.arcade.overlap(this.barrel3, this.player, this.kill.bind(this));
    this.game.physics.arcade.overlap(this.coins, this.player, this.incrementScore.bind(this));
    this.game.physics.arcade.overlap(this.gem, this.player, this.win.bind(this));
    //----------------------------------------------------------------------------

    //                        Controles
    if (this.cursors.right.isDown || this.player.isright)
    //                        Movimiento
    {
     this.player.animations.play('walking');
     this.player.autoWalk=true;
    }
    
    if(this.player.autoWalk===true)
    {
      this.player.body.velocity.x = 170;
    }
    //----------------------------------------------------------------------------

    //                          Salto
    if((this.cursors.up.isDown || this.player.isJumping) && this.player.body.touching.down) {
     this.player.body.velocity.y = -490;
    }
    //----------------------------------------------------------------------------

    //                          Score
    if(this.scoreBuffer > 0){
       this.incrementScore();
       this.scoreBuffer--;
     }
    //----------------------------------------------------------------------------

  },
   //----------------------------------------------------------------------------

   addTouchControls: function(){
    this.actionButton = this.add.button(100, 545, 'actionButton');
    this.arrowButton = this.add.button(200, 545, 'arrowButton');

    this.actionButton.alpha = 0.5;
    this.arrowButton.alpha = 0.5;

    this.actionButton.fixedToCamera = true;
    this.arrowButton.fixedToCamera = true;

    this.actionButton.events.onInputDown.add(this.jump.bind(this));
    this.actionButton.events.onInputUp.add(this.dontJump.bind(this));
    this.arrowButton.events.onInputDown.add(this.right.bind(this));
    this.arrowButton.events.onInputUp.add(this.dontright.bind(this));

   },
   right: function() {
    this.player.isright = true;
   },
   //----------------------------------------------------------------------------
   
   dontright: function() {
    this.player.isright = false;
   },
   //----------------------------------------------------------------------------

   jump: function() {
    this.player.isJumping = true;
   },
   //----------------------------------------------------------------------------
   dontJump: function() {
    this.player.isJumping = false;
   },
   //----------------------------------------------------------------------------
   kill: function() {
    alert('Game Over');
    this.game.state.start('GameState');
   },
   //----------------------------------------------------------------------------
   win: function() {
    alert('Win');
    this.game.state.start('GameState');
   },
   //----------------------------------------------------------------------------

   createBarrel: function() {
    var barrel = this.barrels.getFirstExists(false);
    if(!barrel) {
      barrel = this.barrels.create(0,0,'barrel');
    }
    barrel.body.allowGravity = false;
    barrel.body.immovable = true;
    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1,0.1);
   //----------------------------------------------------------------------------

   //                    Punto de salida
    barrel.reset(this.levelData.punto.x, this.levelData.punto.y);
    barrel.body.velocity.x = this.levelData.barrelSpeed;
    },
    //----------------------------------------------------------------------------

    createBarrel2: function() {
    var barrel = this.barrel2.getFirstExists(false);
    if(!barrel) {
      barrel = this.barrel2.create(0,0,'barrel');
    }
    barrel.body.allowGravity = false;
    barrel.body.immovable = true;
    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1,0.1);
   //----------------------------------------------------------------------------

   //                    Punto de salida
    barrel.reset(this.levelData.punto2.x, this.levelData.punto2.y);
    barrel.body.velocity.x = this.levelData.barrelSpeed;
    },
   //----------------------------------------------------------------------------

   createBarrel3: function() {
    var barrel = this.barrel3.getFirstExists(false);
    if(!barrel) {
      barrel = this.barrel3.create(0,0,'barrel');
    }
    barrel.body.allowGravity = false;
    barrel.body.immovable = true;
    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1,0.1);
   //----------------------------------------------------------------------------

   //                    Punto de salida
    barrel.reset(this.levelData.punto3.x, this.levelData.punto3.y);
    barrel.body.velocity.x = this.levelData.barrelSpeed;
    },

    createBarrel4: function() {
    var barrel = this.barrel4.getFirstExists(false);
    if(!barrel) {
      barrel = this.barrel4.create(0,0,'barrel');
    }
    barrel.body.allowGravity = false;
    barrel.body.immovable = true;
    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1,0.1);
   //----------------------------------------------------------------------------

   //                    Punto de salida
    barrel.reset(this.levelData.punto4.x, this.levelData.punto4.y);
    barrel.body.velocity.x = this.levelData.barrelSpeed;
    },

    createScore: function(){
     var scoreFont = "50px Arial";
     this.scoreLabel = this.game.add.text(200, 100, "0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 15}); 
     this.scoreLabel.anchor.setTo(0.5);
     this.scoreLabel.align = 'center';
     this.scoreLabel.fixedToCamera = true;

     },
    //----------------------------------------------------------------------------

    incrementScore: function(player, coins ,time){  
     this.score += 20;
     this.scoreLabel.text = this.score;
     coins.kill();
    }
    
};
