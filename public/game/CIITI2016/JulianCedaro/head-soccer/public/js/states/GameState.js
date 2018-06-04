var SpaceHipster = SpaceHipster || {};

SpaceHipster.GameState = {

  //initiate game settings
  init: function() {
    //use all the area, don't distort scale
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //initiate physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.physics.arcade.gravity.y = 1000;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.keyM = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.keyR = this.game.input.keyboard.addKey(Phaser.Keyboard.R);

  },

  //load the game assets before the game starts
  preload: function() {


     this.load.image('fondo','assets/images/fondo.jpg');
     this.load.image('player', 'assets/images/messi.png');
     this.load.image('player2','assets/images/cristiano.png');
     this.load.image('ground', 'assets/images/ground.png');
     this.load.image('arco','assets/images/arco.PNG');
     this.load.image('arco2','assets/images/arco2.PNG');
     this.load.image('ball','assets/images/ball.png');
     this.load.image('travesano','assets/images/travesano.png');
     this.load.image('travesano2','assets/images/travesano2.png');
     this.load.image('parante','assets/images/parante.png');
     this.load.image('parante2','assets/images/parante2.png');
     this.load.audio('ambiente',['assets/audio/SonidoAmbiente.ogg']);
     this.load.audio('gol',['assets/audio/Gol.ogg']);

  },
  create: function() {

    //textoWin
    this.style1 = {
      font: "bold 50px Arial",
      fill: "#FFF",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    };
    this.winText = this.game.add.text(this.game.world.centerX-120, this.game.world.centerY-50,'Ganaste',this.style1);
    this.winText.visible = false;

    //sonido ambiente
    this.ambiente = this.game.add.audio('ambiente');
    this.ambiente.play();

    //gol
    this.gol = this.game.add.audio('gol');

    //fondo
    this.fondo = this.add.sprite(this.game.world.centerX, this.game.world.centerY,'fondo');
    this.fondo.anchor.setTo(0.5);

    //ground
     this.ground = this.add.tileSprite(this.game.world.X, this.game.world.height -72, this.game.world.width * 2, 72,'ground');
     this.game.physics.arcade.enable(this.ground);
     this.ground.body.immovable = true;
     this.ground.body.allowGravity = false;


    // player
     this.player = this.add.sprite(this.game.world.width - 250, this.game.world.height-144, 'player');
     this.player.anchor.setTo(0.5);
     this.player.scale.setTo(-1,1);
     this.game.physics.arcade.enable(this.player);
     this.player.body.collideWorldBounds = true;

     //player2
     this.player2 = this.add.sprite(250, this.game.world.height-144,'player2');
     this.player2.anchor.setTo(0.5);
     this.player2.scale.setTo(-1,1);
     this.game.physics.arcade.enable(this.player2);
     this.player2.body.collideWorldBounds = true;


     //ball
     this.ball = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'ball');
     this.ball.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this.ball);
     this.ball.body.collideWorldBounds = true;
     this.ball.allowGravity = true;
     this.ball.body.checkCollision.up = true;
     this.ball.body.checkCollision.down = true;
     this.ball.body.velocity.setTo(200,200);
     this.ball.body.gravity.set(0,100);
     this.ball.body.bounce.set(0.7);


    //arco
    this.arco = this.add.sprite(120,this.game.world.height-220,'arco');
    this.arco.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.arco);
    this.arco.body.collideWorldBounds = false;
    this.arco.body.immovable = true;
    this.arco.body.allowGravity = false;
    this.arco.body.setSize(30,58,20,33);

    //travesano
     this.travesano = this.add.sprite(120,this.game.world.height-220,'travesano');
     this.travesano.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this.travesano);
     this.travesano.body.collideWorldBounds = false;
     this.travesano.body.immovable = true;
     this.travesano.body.allowGravity = false;
     this.travesano.body.setSize(100, 20, 50, -113);


    //Parante
     this.parante = this.add.sprite(120,this.game.world.height-220,'parante');
     this.parante.anchor.setTo(0.5);
     this.game.physics.arcade.enable(this.parante);
     this.parante.body.collideWorldBounds = false;
     this.parante.body.immovable = true;
     this.parante.body.allowGravity = false;

    //Arco2
    this.arco2 = this.add.sprite(this.game.world.width - 120, this.game.world.height-220,'arco2');
    this.arco2.anchor.setTo(0.5);
    this.arco2.scale.setTo(-1,1);
    this.game.physics.arcade.enable(this.arco2);
    this.arco2.body.collideWorldBounds = false;
    this.arco2.body.immovable = true;
    this.arco2.body.allowGravity = false;

    //travesano2
     this.travesano2 = this.add.sprite(this.game.world.width - 120,this.game.world.height-220,'travesano2');
     this.travesano2.anchor.setTo(0.5);
     this.travesano2.scale.setTo(-1,1);
     this.game.physics.arcade.enable(this.travesano2);
     this.travesano2.body.collideWorldBounds = false;
     this.travesano2.body.immovable = true;
     this.travesano2.body.allowGravity = false;
     this.travesano2.body.setSize(100, 20, -50, -113);

     //Parante2
     this.parante2 = this.add.sprite(this.game.world.width - 120,this.game.world.height-220,'parante2');
     this.parante2.anchor.setTo(0.5);
     this.parante2.scale.setTo(-1,1);
     this.game.physics.arcade.enable(this.parante2);
     this.parante2.body.collideWorldBounds = false;
     this.parante2.body.immovable = true;
     this.parante2.body.allowGravity = false;

  },
  update: function() {


    this.game.physics.arcade.collide(this.ball, this.ground);
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player2,this.ground);
    this.game.physics.arcade.overlap(this.ball,this.arco);
    this.game.physics.arcade.overlap(this.ball,this.arco2);
    this.game.physics.arcade.overlap(this.ball,this.player,this.rebound.bind(this),this.kick.bind(this),this.collidedown.bind(this));
    this.game.physics.arcade.overlap(this.ball,this.player2,this.rebound2.bind(this),this.kick2.bind(this),this.collidedown2.bind(this));
    this.game.physics.arcade.collide(this.player,this.arco);
    this.game.physics.arcade.collide(this.player2,this.arco);
    this.game.physics.arcade.collide(this.player,this.arco2);
    this.game.physics.arcade.collide(this.player2,this.arco2);
    this.game.physics.arcade.collide(this.ball,this.travesano);
    this.game.physics.arcade.collide(this.ball,this.travesano2);
    this.game.physics.arcade.collide(this.ball,this.parante,this.win.bind(this));
    this.game.physics.arcade.collide(this.ball,this.parante2,this.win.bind(this));




    if(this.cursors.left.isDown) {
      this.player.body.velocity.x = -180;
      this.player.scale.setTo(-1,1);
      this.player.play('walking');
    }else if(this.player.body.velocity.x < 0){
      this.player.body.velocity.x += 8;
    }

    if(this.cursors.right.isDown) {
      this.player.body.velocity.x = 180;
      this.player.scale.setTo(1,1);
      this.player.play('walking');
    }else if(this.player.body.velocity.x > 0){
      this.player.body.velocity.x -= 8;
    }

    if((this.cursors.up.isDown)  && this.player.body.touching.down) {
      this.player.body.velocity.y = -450;
    }

    if(this.keyA.isDown) {
      this.player2.body.velocity.x = -180;
      this.player2.scale.setTo(1,1);
      this.player2.play('walking');
    }else if(this.player2.body.velocity.x < 0){
      this.player2.body.velocity.x += 8;
    }

    if(this.keyD.isDown) {
      this.player2.body.velocity.x = 180;
      this.player2.scale.setTo(-1,1);
      this.player2.play('walking');
    }else if(this.player2.body.velocity.x > 0){
      this.player2.body.velocity.x -= 8;
    }

    if((this.keyW.isDown)  && this.player2.body.touching.down) {
      this.player2.body.velocity.y = -450;
    }
  },
  render: function(){
    //this.game.debug.body(this.travesano2);
  },
  jump: function(){
    this.player.isjumping = true;
  },
  dontJump: function(){
    this.player.isjumping = false;
  },
  win: function(){
    this.ambiente.stop();
    this.gol.play();
    this.winText.visible = true;
    this.ball.kill();
    //this.game.state.start('GameState');
  },
  rebound: function(player,ball){
      this.ball.body.velocity.x = -200;
  },
   rebound2: function(player,ball){
      this.ball.body.velocity.x = 200;
  },
  kick: function(ball,player){
    if(this.keyM.isDown){
      this.ball.body.velocity.x = -300;
      this.ball.body.velocity.y = -600;
    }
  },
  kick2: function(ball,player){
    if(this.keyR.isDown){
      this.ball.body.velocity.x = 300;
      this.ball.body.velocity.y = 800;
    }
  },
  collidedown: function(player,ball){
    if(player.body.touching.down){
      this.ball.body.velocity.y = -100;
      this.ball.body.velocity.x = -50;
    }
  },
  collidedown2: function(player,ball){
    if(player.body.touching.down){
      this.ball.body.velocity.y = 100;
      this.ball.body.velocity.x = 50;
    }
  }
}
