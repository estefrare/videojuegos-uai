var MyGame = MyGame || {};
//var GameState = {

//**********************************
//**********************************
//*********************************
//VARIABLE PARA EL ESTADO DEL JUEGO:
////////////////////////////////////
/*
MyGame.GameState = function () {
        this.background = null;
        this.foreground = null;
        this.player = null;
        this.cursors = null;
        this.speed = 300;
        this.weapons = [];
        this.currentWeapon = 1;
        this.weaponName = null;
    };
*/
//GameState.prototype = {

    

MyGame.Level1 = function(MyGame){
    var map;
    var layer;
    var playerPoints=0;
};


MyGame.Level1.prototype = {

  init: function () {

    //AQUÍ INICIAMOS VARIABLES ANTES DE CREAR EL JUEGO:
    this.score=0;
    this.scoreText='';
    this.playerScale=0.5;
    this.background = null;
    this.foreground = null;
    this.player = null;
    this.cursors = null;
    //this.speed = 300;
    this.weapons = [];
    this.currentWeapon = 0;
    this.weaponName = null;
    this.lastJumpTime=null;

    //this.stairNow=null;

    this.game.renderer.renderSession.roundPixels = false;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //Physics con P maýuscula!!!:
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //this.game.physics.ARCADE.allowGravity=true;
    this.game.physics.arcade.gravity.y = 1000;

    //SETEO LOS LÍMITES DEL MUNDO DEL JUEGO (WORLD):
    //this.game.world.setBounds(inicioX,inicioY,ancho,alto)
    this.game.world.setBounds(0,0,2000,1000);

    //HABILITO EL TECLADO (PC):
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  },


  preload: function() {
    //                      PRECARGA DE ARCHIVOS PARA EL JUEGO:
    //*********************************************************

    //          FONDO DEL NIVEL:
    this.game.load.image('backdrop1', 'assets/images/backdrop1.jpg');

    //"image" se usa para imagenes no animables
    //this.load.image('background', 'assets/images/background.png');
    //this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform', 'assets/images/platform.png');
    //this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('arrowButton', 'assets/images/arrowButton_Seba.png');
    this.load.image('attackButton', 'assets/images/actionButton_Seba.png');
    this.load.image('jumpButton', 'assets/images/jumpButton_Seba.png');
    //this.load.image('barrel', 'assets/images/Barrel.png');
    //this.load.image('platformStairsLong', 'assets/images/platformStairsLong.png');

    this.load.image('snow', 'assets/images/BolaNieve-Helado-chico.png');

    //this.load.spritesheet('bullet', 'assets/images/fire_spritesheet.png', 20, 21,5, 1, 1);
    this.load.image('bullet', 'assets/images/ROUND-BALL-BULLET-SMALL.png');


    //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
    //game.load.spritesheet('ms', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    this.load.spritesheet('zombie1', 'assets/images/Zombie1.png', 64, 64);

    //"sprite": imagen que tiene varias imágenes contenidas en una sola (cada una es un frame)
    //"spritesheet" se usa para imagenes animables
    //this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png',131,200,3);
    //('nombre para identificar el sprite', 'ubicación del archivo', ancho, alto, )

    //this.load.spritesheet('player', 'assets/images/player_spritesheet.png',28,30,5,1,1);
    //this.load.spritesheet('player', 'assets/images/PERSONAJE-bat.png',98,150,6,2,2);
    //this.load.spritesheet('player', 'assets/images/PERSONAJE-bat.png',100,150,36,0,0);
    //this.load.spritesheet('player-BAT', 'assets/images/PERSONAJE-ARMA-bat.png',100,150,36,0,0);
    this.load.spritesheet('player', 'assets/images/PERSONAJE-COMPLETO.png',100,150,48,0,0);
    //this.load.spritesheet('player', 'assets/images/PERSONAJE-COMPLETO-half-size.png',50,75,36,0,0);
    //this.load.spritesheet('player', 'assets/images/PERSONAJE_chico.png',48,75,6,2,2);

    //3er parámetro: cantidad de imágenes distintas (frames) que contiene el spritesheet
    //4to parámetro: cuanto tiene de padding horizontal
    //5to parámetro: cuanto tiene de padding vertical
    //this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21,5, 1, 1);

    //this.load.text('level','assets/data/level.json')
    this.load.json('level','assets/data/level.json');

    
  },





  create: function() {

    
    this.playerWon=false;

    //SONIDOS Y MÚSICAS:

    this.playerFoot1 = this.add.audio('playerFoot1');
    this.playerFoot1.volume=0.2;

    this.playerFoot2 = this.add.audio('playerFoot2');
    this.playerFoot2.volume=0.2;

    this.playerJump = this.add.audio('playerJump');
    this.playerJump.volume=0.3;

    this.batSwish = this.add.audio('batSwish');
    this.rangeWeaponSound = this.add.audio('rangeWeaponSound');

    this.batHit = this.add.audio('batHit');
    this.batHit.volume=0.9;
    
    this.coinTake = this.add.audio('coinTake');
    this.powerUpTake = this.add.audio('powerUpTake');
    this.weaponTake = this.add.audio('weaponTake');

    this.playerYahoo = this.add.audio('playerYahoo');
    this.playerYahoo.volume=2;
    this.playerWin = this.add.audio('playerWin');
    this.playerWin.volume=0.4;

    this.newHighScore = this.add.audio('newHighScore');
    this.newHighScore.volume=0.9;

    this.zombieWalk = this.add.audio('zombieWalk');
    this.zombieWalk.volume=0.5;

    this.zombieAttack1 = this.add.audio('zombieAttack1');
    this.zombieAttack1.volume=0.5;

    this.zombieAttack2 = this.add.audio('zombieAttack2');
    this.zombieAttack2.volume=0.5;

    //this.zombieDie = this.add.audio('zombieDie');
    //this.zombieDie.volume=0.5;

    //this.zombiePain = this.add.audio('zombiePain');
    //this.zombiePain.volume=0.5;

    //RISA ENEMIGA (MUERE EL JUGADOR):
    this.enemyLaugh = this.add.audio('enemyLaugh');
    this.enemyLaugh.volume=1;

    //GAME OVER SOUND:
    this.gameOverSound = this.add.audio('gameOverSound');
    this.gameOverSound.volume=0.5;


    this.backMusic = this.add.audio('backMusic1');
    this.backMusic.loop=true;
    this.backMusic.volume=0.7;
    this.backMusic.play();
        


    
    //          CAMBIO EL COLOR DE FONDO DEL WORLD:
    this.game.stage.backgroundColor = 0x111133;
    

    //IMAGENES DE FONDO DEL NIVEL (REPETIDA DE PRINCIPIO A FIN DEL NIVEL)
    //for (var posX = 0; posX < this.game.world.width; posX+=400)
    for (var posX = 0; posX < 500 * 32 ; posX+=400)
    {
      for (var posY = 0; posY < this.game.world.height; posY+=642)
      {
        //var backpic = game.add.sprite(game.rnd.between(800, 1100), game.world.randomY, 'baddie' + game.rnd.between(1, 3));
        var backpic = this.game.add.sprite(posX, posY, 'backdrop1');
      }
    }







        //ARMO EL MAPA:
        /*********************
        */
        //this.map2 = this.add.tilemap('mapJumping',30,30);
        this.map = this.add.tilemap('map',32,32);
        this.map2 = this.add.tilemap('map-CALLBACKS',32,32);
        

        this.map.addTilesetImage('tileset');
        this.map2.addTilesetImage('tileset');

        //this.map.setCollisionBetween(1, 900); 
        //this.map.setCollisionBetween(32,32); 
        //this.map.setCollisionBetween(92,92); 
        //this.map.setCollisionBetween(723,725); 

        this.layer = this.map.createLayer(0);
        this.layer2 = this.map2.createLayer(0);

        this.map.setCollisionBetween(0,29);  
        this.map2.setCollisionBetween(0,0);  
        //this.map2.setCollisionBetween(1, 900);

        this.map2.setTileIndexCallback(10,this.stuckPlayer, this);
        this.map2.setTileIndexCallback(11,this.stuckPlayer, this);

        this.map2.setTileIndexCallback(12,this.getCoin, this);
        this.map2.setTileIndexCallback(13,this.getCoin, this);
        this.map2.setTileIndexCallback(28,this.getCoin, this);
        this.map2.setTileIndexCallback(29,this.getCoin, this);
        //this.map2.setTileIndexCallback(30,this.win, this);
        this.map2.setTileIndexCallback(31,this.win, this);
        this.map2.setTileIndexCallback(44,this.getWeaponRanged, this);

        
        this.layer.resizeWorld();
        //this.layer2.resizeWorld();

        /************************************


        //this.layer2 = this.map2.createLayer(0);
        //this.layer.alpha=0.3;
        //this.layer2.alpha=0.3;

        //coins = this.game.add.group();
        //coins.enableBody = true;

        //  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
        
        //this.map2.currentLayer.y-=200;
        //this.layer2.y-=200;
        //this.layer2.position=(this.layer2.position.x,this.layer2.position.y-200);

        //this.map2.y-=200;
        //this.map2.setTileIndexCallback(723, this.landed, this);
        //this.map2.setTileIndexCallback(724, this.landed, this);
        //this.map2.setTileIndexCallback(725, this.landed, this);
        //this.map2.setTileIndexCallback(229, this.landed, this);

        //this.layer = this.map.createLayer('Layer 1');

        //this.game.physics.arcade.enable(this.layer); //??


        //this.layer.resizeWorld();

    /*

    


    



    this.game.load.tilemap('map', 'assets/images/Mapa01.json', null, Phaser.Tilemap.TILED_JSON);


    this.map = this.game.add.tilemap('map');

    this.map.addTilesetImage('barrel');
    this.map.addTilesetImage('fire');
    this.map.addTilesetImage('Goal');

    this.map.setCollisionBetween(1, 12);

    this.layer = this.map.createLayer('Tile Layer 1');

    */




    //CARGAR ARCHIVO JSON CON DATOS DEL JUEGO (levelData):
    // JSON  JSON  JSON  JSON  JSON  JSON  JSON  JSON  JSON:
    //******************************************************
    this.levelData=this.game.cache.getJSON('level');
    //console.log(this.levelData);

    
    //  Here we create our coins group
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
    this.coins.reward=this.levelData.coinsReward;

    this.powerUpPool = this.game.add.group();
    this.powerUpPool.enableBody = true;
    this.powerUpPool.physicsBodyType = Phaser.Physics.ARCADE;
    //this.powerUpPool.createMultiple(5, 'powerUpIceCream01');
    this.powerUpPool.setAll('anchor.x', 0.5);
    this.powerUpPool.setAll('anchor.y', 0.5);
    this.powerUpPool.setAll('scale.x', 0.5);
    this.powerUpPool.setAll('scale.y', 0.5);
    //this.powerUpPool.body.setAll('anchor.x', 0.5);
    //this.powerUpPool.body.setAll('anchor.y', 0.5);
    //this.powerUpPool.body.setAll('scale.x', 0.3);
    //this.powerUpPool.body.setAll('scale.y', 0.3);
    //this.powerUpPool.setAll('outOfBoundsKill', true);
    //this.powerUpPool.setAll('checkWorldBounds', true);
    //this.powerUpPool.reward=this.levelData.coinsReward;
    this.powerUpPool.setAll('reward',this.levelData.powerUpReward, false, false, 0, true);
    this.powerUpPool.setAll('fat',this.levelData.powerUpFat, false, false, 0, true);

    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
    //map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);
    //map.createFromObjects('Object Layer Name', gid (global ID in the map), 'sprite', frame, exists, autocull camera, group);
    //this.map.createFromObjects('LayerObject', 3, 'barrel', 0, true, true, this.coins);
    
    

    



    //                      CREAMOS EL SUELO:
    //***************************************
    //this.ground = this.game.add.sprite(0, 638, 'ground');
    //this.game.physics.arcade.enable(this.ground);
    //this.ground.body.allowGravity = false;
    //this.ground.body.immovable=true;


    /*
    this.grounds = this.add.group();
    this.grounds.enableBody=true;
    //                      CREO UN GROUND DEL LARGO TOTAL DEL NIVEL:
    for (var i =0 ; i < this.game.world.width; i+=360) {

      var ground = this.grounds.create(i,950  ,'ground');
      //this.ground = this.game.add.sprite(i, 800, 'ground');
      this.game.physics.arcade.enable(ground);
      //this.ground.body.allowGravity = false;
      //this.ground.body.immovable=true;
    }      
    //this.game.physics.arcade.enable(this.grounds);
    this.grounds.setAll('body.allowGravity',false);
    this.grounds.setAll('body.immovable',true);
    */

    //array para almacenar datos de las plataformas:
    /*var platformData = [
      {x:0 , y: 430},
      {x:45 , y: 560},
      {x:90 , y: 290},
      {x:0 , y: 140}
    ];
    */

    




    //PRUEBA ESCALERA:
    //this.platform01=this.add.sprite(this.levelData.platform01.x,this.levelData.platform01.y,'platform01');
    /*
    this.stair=this.add.sprite(0,0,'platformStairsLong');
    this.game.physics.arcade.enable(this.platform01);
    this.platform01.body.allowGravity=false;
    this.platform01.anchor.setTo(0.5,1);
    this.platform01.x+=300;
    this.platform01.y+=500;
    this.platform01.scale.setTo(0.5,0.5);
    */
    /*
    var stairsData = this.levelData.stairsData;
    this.stairs = this.add.group();
    this.stairs.enableBody=true;

    for (var i =0 ; i < stairsData.length; i++) {

      //"create" es similar al "this.add.sprite":
      //recibe 2 parámetros si es un sprite normal
      //recibe 4 parámetros si es un sprite dinámico

      //la función "create" devuelve el objeto creado
      //por lo que puedo almacenarlo en una variable:
      var stair = this.stairs.create(stairsData[i].x,stairsData[i].y,'platformStairsLong');
      //stair.animations.add('burning',[0,1],4,true);
      //stair.play('burning');
    };

    this.stairs.setAll('body.allowGravity',false);

    */

    /*
     //creo un grupo de nombre 'platforms':
    this.platforms = this.add.group();
    this.platforms.enableBody=true;

    
    var platformsData = this.levelData.platformData;

    for (var i =0 ; i < platformsData.length; i++) {

      //"create" es similar al "this.add.sprite":
      //recibe 2 parámetros si es un sprite normal
      //recibe 4 parámetros si es un sprite dinámico

      this.platforms.create(platformsData[i].x,platformsData[i].y,'platform');
    };
    //habilita el cuerpo a todos los elementos del grupo "platforms":
    this.platforms.setAll('body.allowGravity',false);
    this.platforms.setAll('body.immovable',true);

    */


//                      CREAR JUGADOR / CREAR PLAYER:
//***************************************************
//(posicion x, posicion y, nombre del sprite a usar, fotograma por defecto)
//this.player = this.add.sprite(10,545,'player', 3);

    //this.playerStartX = this.levelData.playerStartX;
    //this.playerStartY = this.levelData.playerStartY;

    this.player = this.add.sprite(this.levelData.playerStartX,this.levelData.playerStartY,'player', 1);
    
    this.game.physics.arcade.enable(this.player);
    this.player.anchor.setTo(0.5);
    //          CUERPO / BODY DEL JUGADOR (BOUNDING BOX)
    //this.player.body.setSize(30, 52, 8,7); //TAMAÑO CHICO
    this.player.body.setSize(30*(1/this.playerScale), 52*(1/this.playerScale), 8*(1/this.playerScale),7*(1/this.playerScale)); //TAMAÑO GRANDE
    

    //                  AGREGO ANIMACIONES DEL PERSONAJE:
    //***************************************************
    //animacions con el BaseballBat (this.currentWeapon = 0)
    this.player.animations.add('walking0',[0,1,2,3,4,5], 10, false);
    this.player.animations.add('jumping0',[2], 10, false);
    //this.player.animations.add('meleeAttacking',[30,31,32], 12, false);
    this.player.animations.add('hit0',[6,7,8,9,10,11], 8, false);
    this.player.animations.add('die0',[12,13,14,15,16,17], 8, false);
    this.player.animations.add('attacking0',[18,19,20,21,22,23], 8, false);
    
    

    this.player.frameStand = [];
    this.player.frameStand[0]=3;
    this.player.frameStand[1]=27;

    this.player.frameEndWalk = [];
    this.player.frameEndWalk[0]=5;
    this.player.frameEndWalk[1]=29;

    this.player.frameEndAttack = [];
    this.player.frameEndAttack[0]=21;
    this.player.frameEndAttack[1]=47;



    this.player.frameEndDamage = [];
    this.player.frameEndDamage[0]=11;
    this.player.frameEndDamage[1]=34;

    //animacions con la Resortera / Gomera (this.currentWeapon = 1)
    this.player.animations.add('walking1',[24,25,26,27,28,29], 10, false);
    this.player.animations.add('jumping1',[26], 10, false);
    //this.player.animations.add('meleeAttacking',[30,31,32], 12, false);
    this.player.animations.add('hit1',[30,31,32,33,34], 8, false);
    this.player.animations.add('die1',[36,37,38,39,40,40], 8, false);
    this.player.animations.add('attacking1',[42,43,44,45,46,47], 8, false);
    //this.player.animations.add('attacking1',[42,43,44,45], 8, false);


    //para que el personaje choque con los límites del nivel:
    this.player.body.collideWorldBounds=true;
    this.player.isMovingRight=false;
    this.player.isMovingLeft=false;
    this.player.footNow=1;
    this.player.isJumping=true;
    this.player.canWalk=false;

    this.player.jumpSpeed=this.levelData.playerJumpSpeed;//400;
    this.player.jumpSpeedMax=this.player.jumpSpeed;

    this.player.walkSpeed=this.levelData.playerWalkSpeed;//180;
    this.player.walkSpeedMax=this.player.walkSpeed;

    this.player.fatSpeed=0;

    this.player.scaleConstX=this.playerScale;
    this.player.scaleConstY=this.playerScale;
    //this.player.scale.setTo(0.5,0.5);
    this.player.scale.setTo(this.player.scaleConstX,this.player.scaleConstY);

    this.player.body.bounce.set(0,0.2);
    this.player.canWalk=true;
    this.player.attacking=false;
    this.player.direction=1;

    this.player.health=100;
    this.player.deadBool=false;
    this.player.fat=0;


    /*
    //                      CREAR ARMA BAT DEL JUGADOR / CREAR ARMA BAT DEL PLAYER:
    //***************************************************
    this.playerWeaponBat = this.add.sprite(this.levelData.playerStartX,this.levelData.playerStartY,'player-BAT', 1);
    this.playerWeaponBat.enableBody=true;
    this.game.physics.arcade.enable(this.playerWeaponBat);
    this.playerWeaponBat.anchor.setTo(0.5);
    //          CUERPO / BODY DEL JUGADOR (BOUNDING BOX)
    //this.player.body.setSize(30, 52, 8,7); //TAMAÑO CHICO
    this.playerWeaponBat.body.setSize(30*(1/this.player.playerScale), 52*(1/this.player.playerScale),
         8*(1/this.player.playerScale),7*(1/this.player.playerScale)); //TAMAÑO GRANDE

    //                  AGREGO ANIMACIONES DEL ARMA BAT DEL PERSONAJE:
    //***************************************************
    this.playerWeaponBat.animations.add('walking',[0,1,2,3,4,5], 10, false);
    this.playerWeaponBat.animations.add('jumping',[2], 10, false);
    //this.player.animations.add('meleeAttacking',[30,31,32], 12, false);
    this.playerWeaponBat.animations.add('meleeAttacking',[30,31,32,32], 8, false);
    //para que el personaje choque con los límites del nivel:
    /*
    this.player.body.collideWorldBounds=true;
    this.player.isMovingRight=false;
    this.player.isMovingLeft=false;
    this.player.footNow=1;
    this.player.isJumping=true;
    this.player.canWalk=false;

    this.player.jumpSpeed=this.levelData.playerJumpSpeed;//400;
    this.player.jumpSpeedMax=this.player.jumpSpeed;

    this.player.walkSpeed=this.levelData.playerWalkSpeed;//180;
    this.player.walkSpeedMax=this.player.walkSpeed;

    this.player.fatSpeed=0;

    this.player.scaleConstX=this.playerScale;
    this.player.scaleConstY=this.playerScale;
    //this.player.scale.setTo(0.5,0.5);
    */
    /*
    this.playerWeaponBat.scale.setTo(this.player.scaleConstX,this.player.scaleConstY);
    */
    /*
    this.player.body.bounce.set(0,0.2);
    this.player.canWalk=true;
    this.player.attacking=false;
    this.player.direction=1;

    this.player.health=100;
    this.player.fat=0;
    */
    /*
    this.playerWeaponBat.enableBody=false;
    //this.playerWeaponBat.physicsBodyType = Phaser.Physics.ARCADE;
    this.playerWeaponBat.allowGravity=false;
    this.playerWeaponBat.gravity=-1000;
    */

    //

   
    //this.player.currentStair=-1;

    //ARMAS:
    //ARMA 1: meeleeAtack (BaseballBat)
    this.weapons.push(new MyGame.Weapon.BaseballBat(this.game));
    //ARMA 2: rangeAtack (SlingShot)
    this.weapons.push(new MyGame.Weapon.SingleBullet(this.game));
    /*
            this.weapons.push(new Weapon.FrontAndBack(this.game));
            this.weapons.push(new Weapon.ThreeWay(this.game));
            this.weapons.push(new Weapon.EightWay(this.game));
            this.weapons.push(new Weapon.ScatterShot(this.game));
            this.weapons.push(new Weapon.Beam(this.game));
            this.weapons.push(new Weapon.SplitShot(this.game));
            this.weapons.push(new Weapon.Pattern(this.game));
            this.weapons.push(new Weapon.Rockets(this.game));
            this.weapons.push(new Weapon.ScaleBullet(this.game));
            this.weapons.push(new Weapon.Combo1(this.game));
            this.weapons.push(new Weapon.Combo2(this.game));
            */
            //this.currentWeapon = 0;
            for (var i = 0; i < this.weapons.length; i++)
            {
                this.weapons[i].visible = false;

            }
            this.weapons[this.currentWeapon].visible = true;

//                      CREAR ARMA (FUNCIÓN DE PHASER):
//****************************************************
//  Creates 30 bullets, using the 'bullet' graphic
/*
    this.weapon = this.game.add.weapon(15, 'barrel');

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon.bulletAngleOffset = 0//90;
    this.weapon.fireAngle = -15

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 1000;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 250;

    //  Add a variance to the bullet angle by +- this value
    this.weapon.bulletAngleVariance = 0;
    this.weapon.bulletGravity=0;
    this.weapon.bulletGravity = new Phaser.Point(0, 0);
    this.weapon.bulletInheritSpriteSpeed =true;
    this.weapon.bulletRotateToVelocity=false;
    //this.weapon.fireAtXY(this.player.x+500, this.player.y) 

    //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
    //this.weapon.trackSprite(this.player, 25, 25);
    
    this.weapon.trackSprite(this.player, 15, -5, true);
    */
    //------------------------
    //FIN CREAR ARMA PHASER





    //                      CREO GRUPO DE LOS FUEGOS ('fire'):
    //this.levelData=this.game.cache.getJSON('level');
    //console.log(this.levelData);
    /*
    var fireData = this.levelData.fireData;
    this.fires = this.add.group();
    this.fires.enableBody=true;

    for (var i =0 ; i < fireData.length; i++) {

      //"create" es similar al "this.add.sprite":
      //recibe 2 parámetros si es un sprite normal
      //recibe 4 parámetros si es un sprite dinámico

      //la función "create" devuelve el objeto creado
      //por lo que puedo almacenarlo en una variable:
      var fire = this.fires.create(fireData[i].x,fireData[i].y,'fire');
      fire.animations.add('burning',[0,1],4,true);
      fire.play('burning');
    };

    this.fires.setAll('body.allowGravity',false);
    //this.fires.setAll('body.immovable',true);
    */
    /*
    this.platform = this.add.sprite(0,300,'platform');
    this.game.physics.arcade.enable(this.platform);
    this.platform.body.allowGravity = false;
    this.platform.body.immovable=true;
    */

    /*
    this.goal=this.add.sprite(this.levelData.goal.x,this.levelData.goal.y,'goal');
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.allowGravity=false;
    //cambio el centro del gorila para poder girarlo por el centro (también cambio la ubicación):
    //**********************************************************
    this.goal.anchor.setTo(0.5,1);
    this.goal.x+=10;
    this.goal.y+=50;
    */



    //**********************************************************

    

    //                      CREO GRUPO DE ENEMIGOS ('zombie1'):
    //*********************************************************
    //this.levelData=this.game.cache.getJSON('level');
    //console.log(this.levelData);
    var enemyData = this.levelData.enemyData;
    this.enemies = this.add.group();
    this.enemies.enableBody=true;
    //this.enemyBullets=this.game.add.group();
    
    //var enemy;

    for (var i =0 ; i < enemyData.length; i++) {

      //"create" es similar al "this.add.sprite":
      //recibe 2 parámetros si es un sprite normal
      //recibe 4 parámetros si es un sprite dinámico

      //la función "create" devuelve el objeto creado
      //por lo que puedo almacenarlo en una variable:

      //var enemy = this.enemies.create(enemyData[i].x,enemyData[i].y,'zombie1');
       

        //var enemy= new MyGame.EnemyZombieNormal(this.game,enemyData[i].x,enemyData[i].y,'zombie1',10,[]);
       
        //var enemy= new MyGame.EnemyZombieNormal(this.game,enemyData[i].x,enemyData[i].y,'zombie1',10,this.enemyBullets,this.levelData.enemySpeed);
        var enemy= new MyGame.EnemyZombieNormal(this.game,enemyData[i].x,enemyData[i].y,'zombie1',this.levelData.enemyZombie1HP,[],this.levelData.enemyZombie1Speed,1, 0.8, 3);
        //this.game.add.existing(enemy);
        this.enemies.add(enemy);
        enemy.enemyBullets.enableBody=true;
        enemy.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        //enemy.enemyBullets.body.allowGravity=false;
        //enemy.enemyBullets.setAll('body.allowGravity',false);
        //enemy.enemyBullets.body.velocity.x=300;
        //this.game.physics.enable(enemy.enemyBullets.body);
        //enemy.body.velocity.x=300;
        //enemy.body.velocity.y=0;

      
    };

    this.enemies.setAll('body.allowGravity',true);
    //this.fires.setAll('body.immovable',true);









    //                      BARRILES:
    //*******************************
    /*
    this.barrels=this.add.group();
    this.barrels.enableBody=true;

    //EL GORILA "LANZA" LOS BARRILES:
    //"setInverval" ejecuta una función cada cierto tiempo:
    var intervalo = setInterval(this.createBarrel.bind(this),2000);
    */

    //                      CREAR CONTROLES PARA CELULAR: 
    this.addTouchControls();










    //                      HAGO QUE LA CÁMARA SIGA AL PERSONAJE:
    //this.game.camera.follow(this.player);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    //style = 'STYLE_PLATFORMER';
    this.game.camera.deadzone = new Phaser.Rectangle(this.game.width/2,210,1,1);












    //                      DESTRUCTOR DE BARRILES (EN LA PARTE INFERIOR DEL NIVEL):
    //******************************************************************************
    /*
    this.barrelRIP= this.game.add.sprite(3, 620, 'barrel');
    this.barrelRIP.scale.setTo(1.3,1.3);
    this.game.physics.arcade.enable(this.barrelRIP);
    this.barrelRIP.body.allowGravity = false;
    this.barrelRIP.body.immovable=true;
    this.barrelRIP.tint =0xff7777;
    */

    /*
    this.fireRIP= this.game.add.sprite(0, 593, 'fire');
    this.fireRIP.scale.setTo(1.3,1.3);
    this.game.physics.arcade.enable(this.fireRIP);
    this.fireRIP.body.allowGravity = false;
    this.fireRIP.body.immovable=true;
    this.fireRIP.animations.add('burning',[0,1],4,true);
    this.fireRIP.play('burning');
    this.fires.add(this.fireRIP);
    */
    //this.setupText.bind(this);
    this.setupText();
    //this.playerPoints=0;

     //GUARDAR Y CARGAR DATOS LOCALES:
    /*
    this.localStorage.setItem('myItemKey', 'myContent');
    this.localStorage.getItem('myItemKey');

    Only thing to keep in mind: localstorage can only store strings.

    So in order to store whole objects, do this:

    localStorage.setItem('myObject', JSON.stringify(myObject));
    and in reverse:

    myObject = JSON.parse(localStorage.getItem('myObject'));
    */

    //this.score = JSON.parse(localStorage.getItem('highScore0'));
    //localStorage.getItem("highScore0");

    //localStorage.highScore=0;
    //this.score = localStorage.highScore;

    //window.localStorage.setItem( 'playerName', '2300' );
    //window.localStorage.getItem( 'playerName' );

    
    this.highScore = window.localStorage.getItem( 'highScore0' );
    //this.coso = parseInt(this.highScore);
    this.highScore = parseInt(this.highScore);

    //this.highScore =this.coso;
    if(!this.highScore || this.highScore===NaN || this.highScore===null || this.highScore===undefined)
    {
        this.highScore = 0;
    }

    this.score = 0;
    this.scoreText.text=this.score;

    this.playerHighScoreText.text = 'HIGHSCORE \n'+ this.highScore;
    
    this.playerHealthText.text = 'HP '+ this.player.health;
    this.playerFatText.text = 'FAT '+ this.player.fat;
    //this.highScore=0;
  },

  update: function() {
        //console.log('higscore:'+this.highScore);
        //console.log('coso:'+this.coso);
        //console.log('score:'+this.score);
        //console.log('canWalk: '+this.player.canWalk);
        //console.log('attacking: '+this.player.attacking);
        //console.log('isJumping: '+this.player.isJumping);
        //console.log('isDamaged: '+this.player.isDamaged);

    //genero nro aleatorio:
    //var randomize = Math.floor(Math.random(100)*100);
    //randomize = this.game.rnd.integer();
    //this.rndPic = (Math.random(10)*10);
    this.rndPic = this.game.rnd.integerInRange(0, 2);

    //HAGO QUE LAS ARMAS COINCIDAN CON EL PERSONAJE:
    /*
    this.playerWeaponBat.currentAnim= this.player.currentAnim;
    this.playerWeaponBat.frame=this.player.frame;
    this.playerWeaponBat.x=this.player.x;
    this.playerWeaponBat.y=this.player.y;
    this.playerWeaponBat.scale.setTo(-this.player.scale.x,this.player.scale.y);
    this.playerWeaponBat.reset(this.player.x,this.player.y);
    //this.game.physics.moveToObject(this.playerWeaponBat, this.player, 999, 0)
    this.game.physics.arcade.moveToObject(this.playerWeaponBat, this.player, 999, 0);
    */

    //              ROTO EL PUNTAJE (SCORE) EN PANTALLA:
    //*************************************************
    /*
    if(this.scoreText.angle<15)
    {
        this.scoreText.direction='right';
        this.scoreText.angle += 1;
    }
    else if(this.scoreText.angle>-15)
    {
        this.scoreText.direction='right';
        this.scoreText.angle -= 1;
    }
    */
    if(this.scoreText.direction==='right'){
        if(this.scoreText.angle<7)
        {
            this.scoreText.angle += 0.3;
        }
        else{
            this.scoreText.direction='left';
        }
    }
    if(this.scoreText.direction==='left'){
        if(this.scoreText.angle>-7)
        {
            this.scoreText.angle -= 0.3;
        }
        else{
            this.scoreText.direction='right';
        }
    }
    //this.score += 0;
    //this.addToScore(0);
    

    this.player.walkSpeed=this.player.walkSpeedMax-this.player.fat;
    this.player.jumpSpeed=this.player.jumpSpeedMax-this.player.fat;

    this.player.jumpSpeed=this.player.jumpSpeedMax-this.player.fat;


    //                      chequear si colisiona:
    //                      COLISIONES!!!!:
    //*************************************
    this.game.physics.arcade.collide(this.player,this.grounds);
    this.game.physics.arcade.collide(this.player,this.platforms);
    this.game.physics.arcade.collide(this.player,this.layer,this.onGround.bind(this));
    //this.game.physics.arcade.collide(this.player,this.layer,this.landed.bind(this));
    this.game.physics.arcade.collide(this.player,this.layer2);
    this.game.physics.arcade.collide(this.enemies,this.layer);
    
        /*
        this.layer.children.forEach(function(groundObject) {
            groundObject.canCollide=true;
          if(this.game.physics.arcade.overlap(this.player, groundObject, null, null, this)){
                groundObject.kill();   
                console.log(groundObject);
                //if(enemy.health<=0)
                //{
                  //enemy.kill();
                //}
            
          }
        }, this);//le hago el bind pasandole el this acá al final
        */
        
//this.game.physics.arcade.overlap(this.player,this.layer.children,this.landed,null,this);
/*
this.game.physics.arcade.overlap(this.player, this.layer.children, this.collisionHandler, null, this);
var collisionHandler = function(_player, _enemy) 
{  
    console.log(_player);
    _player.isJumping=true;
}
*/

//this.map.collideSpriteVsTilemapLayer(this.player, this.layer, this.landed, null, this, false)
/*
    for(var y = 0; y < this.map.height; ++y)
        {   for(var x = 0; x < this.map.width; ++x)
            {      
                var tile = this.map.getTile(x, y);    
                
                //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
                 //map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);

                //console.log(tile);
                if(tile!=null && tile!=undefined)
                {
                    this.game.physics.arcade.enable(tile);
                    //this.layer.children.enableBody=true;  
                    //tile.body.allowGravity=true;
                    //console.log(tile);


                    var tileIndex = tile.index;
                    //var objetoTile = this.layer.getChildAt(tileIndex);
                    //  Here we create our coins group
                    
                    //this.map.createFromObjects(name,gid,key,frame,exists,autoCull,group,CustomClass,adjustY)
                    //this.map.createFromObjects('Object Layer 1', tileIndex, 'barrel', 0, true, false, coins);
                    this.map.createFromObjects('Layer1', tileIndex, 'barrel', 0, true, true, coins);
                    //console.log(tileIndex);
                    this.game.physics.arcade.collide(this.player,this.layer,this.landed.bind(this));
                    tile.canCollide=true;
                    if(this.game.physics.arcade.collide(this.player, tile, null, null, this)||this.game.physics.arcade.collide(this.player, this.layer.children[tileIndex], null, null, this))
                    {
                        console.log(tile);
                        tile.kill();
                        this.player.landing=true;
                        this.player.isJumping=true;
                    }     
                    if(this.game.physics.arcade.collide(this.player, this.layer, null, null, this))
                    {
                        this.player.landing=true;
                        this.player.isJumping=true;
                    }
                }
                
            }
        }
*/







    //this.game.physics.arcade.overlap(this.player,this.stairs,this.climb.bind(this));

    //this.game.physics.arcade.overlap(this.player,this.fires,this.damagePlayer.bind(this));
    //this.game.physics.arcade.collide(this.fires,this.platforms);

    //this.game.physics.arcade.collide(sprite, sprite2, function, null, { this: this, var1: "Var1", var2: "Var2" }); 
    //this.game.physics.arcade.collide(player.sprite, this.enemies, function(obj1, obj2){    player.killEnemy(obj1, obj2, score);}, null, player);
    //this.game.physics.arcade.overlap(this.player, this.enemies, function(){    this.attackPlayer(this.player, enemy);}, null);
    //this.game.physics.arcade.overlap(this.player,this.enemies,this.attackPlayer.bind(this), null, {this: this, player, enemy});
    this.game.physics.arcade.overlap(this.player,this.enemies,this.attackPlayer.bind(this), null, {this: this, player: this.player, enemy: this.enemies});
    
    //this.game.physics.arcade.collide(this.player,this.enemies);

    //this.game.physics.arcade.overlap(this.player,this.goal,this.win.bind(this));

    //this.game.physics.arcade.collide(this.barrels,this.platforms);
    //this.game.physics.arcade.collide(this.barrels,this.grounds);
    //this.game.physics.arcade.collide(this.player,this.barrelRIP);

    //this.game.physics.arcade.collide(this.enemies,this.platforms);
    //this.game.physics.arcade.collide(this.enemies,this.grounds);
    
    //this.game.physics.arcade.collide(this.enemies,this.enemies);

    //var barrelCol = this.game.physics.arcade.collidey+(this.player,this.barrels,this.barrelHit.bind(this));

    //VER SI EL JUGADOR AGARRA LOS HELADOS U OTROS OBJETOS AGARRABLES:
    this.game.physics.arcade.overlap(this.player, this.powerUpPool, this.playerPowerUp, null, this);
    this.game.physics.arcade.collide(this.powerUpPool, this.layer, null, null, this);


//                      ARMAS:
//****************************
//TOMO CADA ITEM DEL GRUPO ARMA (ARMA ACTUAL) PARA VER SI COLISIONA CON EL GOAL:
    this.weapons[this.currentWeapon].forEach(function(bullet) {
        /*
        if(this.game.physics.arcade.collide(this.goal, bullet, null, null, this)){
            this.goal.kill();   
            bullet.kill();
            // item.revive();     
        }
        */
        
        //          AHORA TOMO CADA ENEMIGO PARA VER SI COLISIONA CON LAS ARMAS:
        this.enemies.forEach(function(enemy) {
          if(this.game.physics.arcade.overlap(enemy, bullet, this.damageEnemy.bind(this), null, this)){
            //if(this.game.physics.arcade.overlap(enemy, bullet, null, null, this)){
            //this.game.physics.arcade.overlap(this.playerBullets,this.enemies,this.damageEnemy.bind(this));

                bullet.kill();   
                //  LE PEGO ENTONCES DISMINUYE LA VIDA DEL ENEMIGO // daño al enemigo

                /*
                enemy.health-=1;
                if(enemy.health<=0)
                {
                  enemy.kill();
                }
                */
                
            
          }
        }, this);//le hago el bind pasandole el this acá al final
    }, this);//le hago el bind pasandole el this acá al final




    /*
    //          TOMO CADA ESCALERA (stair) DEL GRUPO ESCALERAS (stairs):
    this.stairs.forEach(function(stair)
    {
    //
    //var stairNow=this.stairs.getIndex(stair);
    //this.stairNow=this.stairs.getIndex(stair);

        if(this.game.physics.arcade.overlap(stair, this.player, null, null, this))
        {
            this.stairNow=this.stairs.getIndex(stair);
            //this.player.currentStair=this.stairNow;
            if(!this.player.isClimbing)
            {
                this.player.currentStair=this.stairNow;
                this.climb();

                //this.player.currentStair=this.stairs.getIndex(stair);
                
                //this.climb  
            };
        }
        else{
            if(this.player.isClimbing)
            {
                this.stairNow=this.stairs.getIndex(stair);
                if(this.player.currentStair=this.stairNow)
                {
                    this.dontClimb();
                    this.player.currentStair=-1;
                    this.player.isClimbing=false;
                };

            };
        };
    }, this);//le hago el bind pasandole el this acá al final
    */



    /*
    //          TOMO CADA BARRIL DEL GRUPO BARRILES:
    this.barrels.forEach(function(barrel) {

      /* if(this.game.physics.arcade.overlap(this.weapons[this.currentWeapon].bullets, barrel, null, null, this)){
            barrel.kill();   
            this.kill();
            // item.revive();     


        }
      */

      /*
      //            AHORA TOMO CADA ITEM DEL GRUPO ARMA (ARMA ACTUAL) PARA VER SI COLISIONA CON CADA BARRIL:
      this.weapons[this.currentWeapon].forEach(function(item) {

      if(this.game.physics.arcade.overlap(item, barrel, null, null, this)){
            barrel.kill();   
            item.kill();
            //this.win();
            //item.revive();     
        }
      }, this);//le hago el bind pasandole el this acá al final


        if(this.game.physics.arcade.overlap(this.player, barrel, null, null, this)){
            barrel.kill();   
            this.damagePlayer();
            // item.revive();     
        }
        if(this.game.physics.arcade.overlap(this.barrelRIP, barrel, null, null, this)){

            barrel.kill();
            // item.revive();     
        }

        
        //giro el barril:
        if(barrel.body.velocity.x>0){
          barrel.rotation += 0.1;
        }
        if(barrel.body.velocity.x<0){
          barrel.rotation -= 0.1;
        }
        
    }, this);//le hago el bind pasandole el this acá al final
    */
    /*
      this.enemies.forEach(function(enemy) {

      if(enemy.body.velocity.x>0){
        enemy.animations.play('walkingRight');   
      }
      else
      {
          enemy.animations.play('walkingLeft');   
      }
      }, this);//le hago el bind pasandole el this acá al final
    */





    //                      SE PRESIONAN LAS TECLAS O BOTONES DE MOVIMIENTO O ACCIÓN:
    //*******************************************************************************
    
    //reseteo la velocidad del personaje:
    this.player.body.velocity.x=0;

    

    //                      SI EL PERSONAJE SE MUEVE, ATACA, O SALTA, ENTONCES IR DISMINUYENDO LA "FAT":
    //**************************************************************************************************
    if(this.player.movingBool || this.player.attacking || (this.player.isJumping || !this.player.canWalk))
    {
        //this.addToScore(-1);
        //setInverval" ejecuta una función cada cierto tiempo:
                //  BAJO LA FAT DEL PLAYER CADA CIERTO TIEMPO AUTOMÁTICAMENTE:
                //if(this.player.body.velocity.x<-10)
                //{
                    if(!this.player.fatLossInterval)
                    {
                        if((this.player.fat>0) && (this.player.fat<=100))
                        {
                            //this.player.fatLossInterval = setInterval(function(){
                                //this.player.fat-=1;
                                //this.playerFatGain(-1);
                                //this.playerFatRefresh();
                                //this.player.fatLossInterval.kill;

                            //}.bind(this), 1000);
                            //this.player.fatLossInterval = setInterval(this.playerFatLoss.bind(this), 1000);
                            this.player.fatLossInterval = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.playerFatLoss.bind(this), this);
                        };
                    } 
                //}
    };




    //                      SE MUEVE HACIA LA IZQUIERDA:
    //**************************************************

    if(this.player.health>0 && !this.playerWon)
    {
        if(this.cursors.left.isDown || this.player.isMovingLeft){
          this.player.body.velocity.x= -this.player.walkSpeed;
          this.player.scale.setTo(this.player.scaleConstX*-1,this.player.scaleConstY*1);
          //if(!this.player.isJumping || this.player.canWalk)
          if(this.player.canWalk)
          {
            if(!this.player.attacking && !this.fireButton.isDown){
                if(!this.player.isDamaged || (this.player.frame<this.player.frameEndDamage-5 ||
                    this.player.frame>this.player.frameEndDamage)){
                    this.player.play('walking'+this.currentWeapon);
                }                    
                this.player.movingBool=true;

                if(!this.playerFoot1.isPlaying&&!this.playerFoot2.isPlaying)
                {
                    if(this.player.footNow===1)
                    {
                        this.playerFoot1.play();
                        this.player.footNow=2;
                    }
                    else if(this.player.footNow===2)
                    {
                        this.playerFoot2.play();
                        this.player.footNow=1;
                    }
                }

            }
            else{
                /*
                if(this.currentWeapon===0){
                //arma de melee
                    this.player.play('meleeAttacking');
                }
                else if(this.currentWeapon===1){
                //arma de rango
                    this.player.play('rangeAttacking');
                }
                */
            }
          }
          this.player.direction=-1;
        }else if(this.player.body.velocity.x<0){                
            this.player.body.velocity.x+=15;
        }
        else{
          this.player.isMovingLeft=false;
        };


        //                  SE MUEVE HACIA LA DERECHA:
        //********************************************
        if (this.cursors.right.isDown|| this.player.isMovingRight){
          this.player.body.velocity.x= this.player.walkSpeed;
          //this.player.scale.setTo(1,1);
          this.player.scale.setTo(this.player.scaleConstX*1,this.player.scaleConstY*1);

          //if(!this.player.isJumping || this.player.canWalk)
          if(this.player.canWalk)
          {
            if(!this.player.attacking && !this.fireButton.isDown){
                if(!this.player.isDamaged || (this.player.frame<this.player.frameEndDamage-5 &&
                    this.player.frame>this.player.frameEndDamage)){
                    this.player.play('walking'+this.currentWeapon);
                }
                this.player.movingBool=true;

                if(!this.playerFoot1.isPlaying&&!this.playerFoot2.isPlaying)
                {
                    if(this.player.footNow===1)
                    {
                        this.playerFoot1.play();
                        this.player.footNow=2;
                    }
                    else if(this.player.footNow===2)
                    {
                        this.playerFoot2.play();
                        this.player.footNow=1;
                    }
                }

                //setInverval" ejecuta una función cada cierto tiempo:
                //  BAJO LA FAT DEL PLAYER CADA CIERTO TIEMPO AUTOMÁTICAMENTE:
                /*
                if(this.player.body.velocity.x>10)
                {
                    if(!this.player.fatLossInterval)
                    {
                        if((this.player.fat>0) && (this.player.fat<=100))
                        {
                            this.player.fatLossInterval = setInterval(this.playerFatLoss.bind(this), 1000);
                        };
                    } 
                }
                */

            }
            else{
                /*
                if(this.currentWeapon===0){
                //arma de melee
                    this.player.play('meleeAttacking');
                }
                else if(this.currentWeapon===1){
                //arma de rango
                    this.player.play('rangeAttacking');
                }
                */
            }
          }
          this.player.direction=1;
        }else if(this.player.body.velocity.x>0){
            this.player.body.velocity.x-=15;

        }
        else{
          this.player.isMovingRight=false;
        };


        //                      EL JUGADOR SALTA:
        //***************************************
        if(((this.cursors.up.isDown || this.player.isJumping)&&
         //(this.player.body.touching.down||this.player.landing))
         (this.player.body.touching.down||this.player.landing)) && this.player.health>0)

        {

            

            if (this.game.time.now>this.lastJumpTime+700){

                //SIN LA SIGUIENTE LÍNEA EL PERSONAJE SE PUEDE "PEGAR AL TECHO Y LAS PAREDES":
                this.lastJumpTime=this.game.time.now;

                this.player.landing=false;        
                this.player.body.velocity.y= -(this.player.jumpSpeed);
                if(!this.player.isDamaged){
                    this.player.play('jumping'+this.currentWeapon);
                }
                this.player.movingBool=true;
                //this.player.isJumping=true;
                this.player.canWalk=false;
                this.playerJump.play();
                //this.player.frame=5; 
                this.player.frame=(this.player.frameStand[this.currentWeapon])+2; 
                this.player.attacking=false;
                /*
                if(this.player.isClimbing)
                {
                    this.player.position.y-=5;
                }    
                */
            }
            this.player.landing=false;  
          
        }
        /*
        else if((this.cursors.up.isDown || this.player.isJumping) && this.player.isClimbing)
        {
            this.player.position.y-=5;
        }
        */
        else
        {
            this.player.landing=false;
            this.player.isJumping=false;
            //this.player.canWalk=true;
            if(this.player.body.touching.down){
                if(!this.player.attacking){
                    this.player.canWalk=true;
                }
                
            };
            /*
            if(this.player.isClimbing)
            {
                this.dontJump.bind(this);
                //this.player.position.y-=5;

            }
            */
        };

        /*
        if((this.cursors.down.isDown)){// || this.player.isJumping) && this.player.body.touching.down){
          ///
          this.player.body.velocity.y= +(this.player.jumpSpeed);
          this.player.play('jumping');
          //this.player.isJumping=true;
          this.player.canWalk=false;
          //
          if(this.player.isClimbing)
          {
            this.player.position.y+=5;
          }
        }
        else
        {
            ///*
            this.player.isJumping=false;
            //this.player.canWalk=true;
            if(this.player.body.touching.down){
                if(!this.player.attacking){
                    this.player.canWalk=true;
                }
                
            };
            //
        };
        */
        if(this.player.isDamaged)
        {
            if(this.player.frame>this.player.frameEndDamage[this.currentWeapon] &&
                (this.player.frame<this.player.frameEndDamage[this.currentWeapon])-5)
                {
                    //detengo todas las animaciones:
                    //this.player.animations.stop();
                    //this.player.frame=3;
                    this.player.frame=this.player.frameStand[this.currentWeapon];
                    this.player.movingBool=false;
                    this.player.isDamaged=false;
                }
        }


        //                      SI EL PERSONAJE NO SE MUEVE:
        //**************************************************
        if(this.player.body.velocity.x===0 || (this.player.body.velocity.x>-5 && this.player.body.velocity.x<5)){
            if(!this.player.attacking){

                if(this.player.isJumping)
                {
                    //this.player.frame=5; 
                    this.player.frame=(this.player.frameStand[this.currentWeapon])+2; 
                }
                if(this.player.isDamaged)
                {
                    if(this.player.frame>this.player.frameEndDamage[this.currentWeapon] &&
                        (this.player.frame<this.player.frameEndDamage[this.currentWeapon])-5){
                        //detengo todas las animaciones:
                        //this.player.animations.stop();
                        //this.player.frame=3;
                        this.player.frame=this.player.frameStand[this.currentWeapon];
                        this.player.movingBool=false;
                        this.player.isDamaged=false;
                    }
                }
                else
                {
                    //detengo todas las animaciones:
                    this.player.animations.stop();
                    //this.player.frame=3;
                    this.player.frame=this.player.frameStand[this.currentWeapon];
                    this.player.movingBool=false;
                }
                //this.player.direction=0;
            }
            else{
                //this.playerScale.animations.play();
                
                //ACAULTIMOMODIFICADO
                if(this.player.frame>this.player.frameEndAttack[this.currentWeapon] || 
                    this.player.frame<(this.player.frameEndAttack[this.currentWeapon])-5 ){
                //this.player.attacking;
                //if(this.player.animations.currentAnim.isFinished){  
                   //this.player.frame=32; 

                   //this.player.frame=this.player.frameStand[this.currentWeapon]; 
                   //this.player.attacking=false;
                   this.player.movingBool=false;
                }

                if(this.player.isDamaged)
                {
                    if(this.player.frame>this.player.frameEndDamage[this.currentWeapon] &&
                        (this.player.frame<this.player.frameEndDamage[this.currentWeapon])-5){
                        //detengo todas las animaciones:
                        //this.player.animations.stop();
                        //this.player.frame=3;
                        this.player.frame=this.player.frameStand[this.currentWeapon];
                        this.player.movingBool=false;
                    }
                }

                
            }
          
        };

        /*
        //this.barrels.forEach(checkBarrels, this, true);
        this.barrels.forEachAlive(function(barrel){
          //barrel.rotation.y+=5;
          //barrel.kill();
        }, this);
        */


        //                      SI SE APRETA EL BOTÓN DE DISPARO / ATAQUE:
        //****************************************************************
        //if ((this.fireButton.isDown || this.player.attacking) && !this.player.attacking && this.player.body.velocity.x<500
        if ((this.fireButton.isDown || this.player.attacking) && this.player.body.velocity.x<500
            && this.player.body.velocity.x>-500)
        {
            
              //if (this.player.direction!=0)
              if(this.player.health>0)
              {
                    if(this.weapons[this.currentWeapon].getFirstExists(false))
                    {
                      //                DISPARO / ATACO CON EL ARMA ACTUAL:
                      this.player.attacking=true;

                        this.player.play('attacking'+this.currentWeapon);
                        this.player.animations.currentAnim.onComplete.add(function () {  this.player.attacking=false;}, this);


                      //this.weapons[this.currentWeapon].fire(this.player,this.player.direction);
                      this.weapons[this.currentWeapon].fire(this.player,this.player.direction,this.currentWeapon);

                      //arma de melee
                      if(this.currentWeapon===0){
                        //this.player.play('attacking'+this.currentWeapon);
                        //this.player.animations.currentAnim.onComplete.add(function () {  this.player.attacking=false;}, this);

                        if(!this.batSwish.isPlaying)
                        {
                            this.batSwish.play();
                        }
                        if(this.batSwish.currentTime>this.batSwish.durationMS/1.1)
                        {
                            //this.batSwish.stop();
                            //this.batSwish.play();
                        }    

                      }
                      //arma de rango
                      else if(this.currentWeapon>0){
                        //this.player.play('attacking'+this.currentWeapon);
                        //this.player.play('a'+this.currentWeapon);
                        //this.player.animations.currentAnim.onComplete.add(function () {  this.player.attacking=false;}, this);

                        if(!this.rangeWeaponSound.isPlaying)
                        {
                            this.rangeWeaponSound.play();
                        }
                      }
                        
                    }
               }


            /*if (this.player.direction=1){
              this.weapons[this.currentWeapon].fire(this.player,this.player.direction);
            }
            else{
              this.weapons[this.currentWeapon].fire(this.player);
            };
            */

            //this.weapon.fire();
            //this.weapons1.fire(this.player);
            if(this.player.attacking)
            {
                if(this.player.frame>=this.player.frameEndAttack[this.currentWeapon])
                {
                    //if(this.player.animations.currentAnim.isFinished)
                    //{
                        this.player.attacking=false;
                        this.player.play('walking'+this.currentWeapon);
                        //this.player.frame=3;
                        //this.dontAttack;//.bind(this);
                    //}
                }
            }
            /*
            if(!this.player.attacking)
            {
                if(this.player.frame>=this.player.frameEndWalk[this.currentWeapon])
                {
                        this.player.attacking=false;
                        this.player.play('walking'+this.currentWeapon);
                }
            }
            */
        }
        else
        {
            if(this.player.frame>=this.player.frameEndAttack[this.currentWeapon])
            {
            //if(this.player.frame>=this.player.frameEndAttack[this.currentWeapon] ||
            //    this.player.frame>=this.player.frameEndWalk[this.currentWeapon])
            //{
                //OJO REVISAR:
                //****
                this.player.attacking=false;
                //this.player.play('walking'+this.currentWeapon);
                //this.player.frame=3;
                //***

                //this.dontAttack;//.bind(this);
            }
        };
    };

    /*
    if(this.player.isClimbing)
    {
        this.dontJump;
    }
    */
},



//landed: function(){
//para ver si esta tocando el suelo (si está colisionando)
    //console.log('landed');
//}




render: function() {

    /*
    var puede = this.player.isMovingRight;
    this.game.debug.text(puede);
    //this.game.debug.text(this.player.isMovingRight)
    //this.game.debug.text(this.player.isMovingRight, 15,15, (255,255,255,1), 'Arial')
    //this.game.debug.text(this.player.canWalk, 15,15, #ff0000, 'Arial')

    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
    //this.game.debug.spriteCoords(this.player, 32, 500);
    //this.game.debug.body(this.player);

    this.stairs.forEach(function(stair)
    {
    //
    //var stairNow=this.stairs.getIndex(stair);
    //this.stairNow=this.stairs.getIndex(stair);
        this.game.debug.body(stair);
    },this);
    //this.game.debug();
    this.game.debug.line(`Vel Y: ${this.player.body.velocity.y}`);
    this.game.debug.line(`Vel Y: ${this.player.body.velocity.y}`);
    this.game.debug.line(`Pos Y: ${this.player.body.position.y}`);
    this.game.debug.line(`Gravity: ${this.player.body.gravity.y}`);
    this.game.debug.line(`Pos Y: ${this.player.lastPositionY}`);
    this.game.debug.line(`PlayerCurrentStair: ${this.player.currentStair}`);
    this.game.debug.line(`StairNow: ${this.stairNow}`);
    this.game.debug.line(`DIRECTION(PLAYER): ${this.player.direction}`);

    //game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    //game.debug.spriteInfo(sprite, 32, 450);
    //this.game.debug.text('Points: ' + this.playerPoints , this.game.width -300, this.game.top+ 150);
    //this.game.debug.line('Points: ${this.playerPoints}`);// , this.game.width -300, this.game.top+ 150);
    this.game.debug.line(`Points: ${this.score}`);


    */

    /*
    this.game.debug.line(`attacking: ${this.player.attacking}`);
    console.log(`attacking: ${this.player.attacking}`);
    this.game.debug.line(`isDamaged: ${this.player.isDamaged}`);
    console.log(`isDamaged: ${this.player.isDamaged}`);
    this.game.debug.line(`canWalk: ${this.player.canWalk}`);
    console.log(`canWalk: ${this.player.canWalk}`);
    */
    //this.game.debug.line(`StairNow: ${this.stairNow}`);
},

  addTouchControls: function(){
    //creo botones para mover el personaje hacia los lados y para saltar:
    //this.leftArrow=this.add.button(20,190,'arrowButton');

    var screenW = (this.game.width/16);
    var screenH = (this.game.height)-70;
    var buttonOffSet = this.levelData.buttonOffSet;
    var buttonScale = this.levelData.buttonScale;

    this.leftArrow=this.add.button(screenW+buttonOffSet*1.2,screenH,'arrowButton');
    this.leftArrow.scale.setTo(-buttonScale,buttonScale);

    this.rightArrow=this.add.button(screenW*4+buttonOffSet*0.2,screenH,'arrowButton');
    this.rightArrow.scale.setTo(buttonScale,buttonScale);

    this.actionButton2=this.add.button(screenW*8,screenH,'attackButton');
    this.actionButton2.scale.setTo(buttonScale,buttonScale);

    this.actionButton=this.add.button(screenW*12,screenH,'jumpButton');
    this.actionButton.scale.setTo(buttonScale,buttonScale);
    /*
    this.leftArrow=this.add.button(((this.world.width/4)*1)-0,this.world.height-0,'arrowButton');
    this.rightArrow=this.add.button((this.world.width/4)*2-20,this.world.height-50,'arrowButton');
    this.actionButton2=this.add.button((this.world.width/4)*3-20,this.world.height-50,'actionButton');
    this.actionButton=this.add.button((this.world.width/4)*4-20,this.world.height-50,'actionButton');
    */
    //cambio el alpha (transparencia) de los botones 
    this.leftArrow.alpha=0.5;
    this.rightArrow.alpha=0.5;
    this.actionButton.alpha=0.5;
    this.actionButton2.alpha=0.5;

    //hago que los botones no se muevan al mover la cámara:
    this.leftArrow.fixedToCamera=true;
    this.rightArrow.fixedToCamera=true;
    this.actionButton.fixedToCamera=true;
    this.actionButton2.fixedToCamera=true;

    //agrego manejadores de evento:
    //onInputDown=cuando se apreta el botón (sería como clickearlo)
    //MOVER HACIA LA IZQUIERDA:
    this.leftArrow.events.onInputDown.add(this.moveLeft.bind(this));
    this.leftArrow.events.onInputUp.add(this.dontMoveLeft.bind(this));
    //onInputOver=cuando se pasa el mouse por encima del botón (o cuando se apreta en celular)
    this.leftArrow.events.onInputOver.add(this.moveLeft.bind(this));
    //onInputOut=cuando se saca el mouse de encima del botón
    this.leftArrow.events.onInputOut.add(this.dontMoveLeft.bind(this));

    //MOVER HACIA LA DERECHA:
    this.rightArrow.events.onInputDown.add(this.moveRight.bind(this));
    this.rightArrow.events.onInputUp.add(this.dontMoveRight.bind(this));
    this.rightArrow.events.onInputOver.add(this.moveRight.bind(this));
    //onInputOut=cuando se saca el mouse de encima del botón
    this.rightArrow.events.onInputOut.add(this.dontMoveRight.bind(this));

    //BOTÓN DE ACCIÓN 1 : SALTO
    this.actionButton.events.onInputDown.add(this.jump.bind(this));
    this.actionButton.events.onInputUp.add(this.dontJump.bind(this));
    this.actionButton.events.onInputOver.add(this.jump.bind(this));
    //onInputOut=cuando se saca el mouse de encima del botón
    this.actionButton.events.onInputOut.add(this.dontJump.bind(this));

    //BOTÓN DE ACCIÓN 2 : ATAQUE
    this.actionButton2.events.onInputDown.add(this.attack.bind(this));
    this.actionButton2.events.onInputUp.add(this.dontAttack.bind(this));
    //this.actionButton2.events.onInputOver.add(this.attack.bind(this));
    //onInputOut=cuando se saca el mouse de encima del botón
    this.actionButton2.events.onInputOut.add(this.dontAttack.bind(this));
  },

  moveLeft: function(){
    this.player.isMovingLeft=true;

  },
  dontMoveLeft: function(){
    this.player.isMovingLeft=false;
  },

  moveRight: function(){
    this.player.isMovingRight=true;
  },
  dontMoveRight: function(){
    this.player.isMovingRight=false;
  },

  jump: function(){
    this.player.isJumping=true;

  },
  dontJump: function(){
    this.player.landing=false;  
    this.player.isJumping=false;
    this.player.canWalk=true;
  },

  attack: function(){
    //this.player.isAttacking=true;
    this.player.attacking=true;

  },
  dontAttack: function(){
    //this.player.isAttacking=false;

    //if(this.player.frame>=32)
    if(this.player.attacking && (this.player.animations.currentAnim.isFinished || 
        this.player.frame>=this.player.frameEndAttack[this.currentWeapon]))
        {
            this.player.attacking=false;
            this.player.canWalk=true;
        }
  },

/*
  climb: function(player,stair){
    if(!this.player.isClimbing)
    {
    this.player.body.bounce.set(0,0);
    this.player.isClimbing=true;
    this.player.canWalk=true;
    this.player.body.allowGravity=false;
    this.player.body.immovable=true;
    this.player.body.velocity.x=0;
    this.player.body.velocity.y=0;
    this.player.body.gravity.x=0;
    this.player.body.gravity.y=-1000;
    //this.player.body.moves = false;
    //this.player.body.enable = false;
    this.player.lastPositionY=this.player.body.position.y;
    }
    
  },

  */

  /*
  dontClimb: function(){
    this.player.body.bounce.set(0,0.2);
    this.player.isClimbing=false;
    //this.player.canWalk=true;
    this.player.body.allowGravity=true;
    this.player.body.immovable=false;
    //this.player.body.velocity.x=0;
    //this.player.body.velocity.y=0;
    this.player.body.gravity.x=0;
    this.player.body.gravity.y=0;
    //this.player.body.moves = true;
    //this.player.body.enable = true;
  },
  */
  /*/
  landed: function(sprite,tile)
  {
    //console.log(tile.position.y);
    console.log(tile.y);
    console.log('HOLA VITEH');
    tile.canCollide=true;
    tile.alpha=0.3;
    this.player.landing=true;
    //*
    if(tile!=null){
       if(tile.y>(this.player.position.y+this.player.height/2)/10)
        {
            this.player.landing=true;
        }
        else{
            this.player.landing=false;
        }
    }
    //*
  },
*/

  onGround: function()
  {
    this.player.body.touching.down=true;
  },

  /*
  createBarrel: function(){
    var barrel = this.barrels.getFirstExists(false);
    if(!barrel){
      barrel=this.barrels.create(0,0,'barrel');
    }
    barrel.body.collideWorldBounds=true;
    //"bounce" (factor de rebote) se basa en el coeficiente de restitución en física:
    barrel.body.bounce.set(1,0.6);

    //barrel.kill()    SI QUIERO QUE NO EXISTA LUEGO DE CREARLO, O SEA, NO SE PROCESA AÚN

    //barrel.reset()   LO VUELVE A PONER EXISTENTE, SOLO FUNCIONA SI EL OBJETO NO EXISTE
    barrel.reset(this.levelData.goal.x+10,this.levelData.goal.y);
    barrel.body.velocity.x=this.levelData.barrelSpeed;
    barrel.scale.setTo(1.3,1.3);
    barrel.anchor.set(0.5,0.5);
  
    this.goal.angle=20;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.restoreGoalRotation.bind(this), this);
    
  },

  restoreGoalRotation: function(){
    this.goal.rotation=0;
  },
  */

  damagePlayer: function(damage){
    //alert('Game Over');
    //CAMBIO DE NIVEL O RECARGO EL NIVEL (SI PONGO EL NOMBRE DEL NIVEL ACTUAL):
    //this.game.state.start('GameState');
    //this.player.scale.setTo(this.player.scale.x+0.01,this.player.scale.y+0.01);
    //this.player.scale.setTo(-(this.player.scale.x),-(this.player.scale.y));

    //LE BAJO LA VIDA AL JUGADOR:
    this.player.health-=damage;
    this.player.isDamaged=true;
    //this.player.isDamaged = this.player.animations.play('hit'+this.currentWeapon)isDamaged.isPlaying;
    this.player.play('hit'+this.currentWeapon);
    //this.player.animations.currentAnim.onComplete.add(function () {  console.log('animation complete');}, this);
    this.player.animations.currentAnim.onComplete.add(function () {  this.player.isDamaged=false;}, this);

    this.playerHealthText.text = 'HP '+ this.player.health;

    //ACTUALIZAR FAT DEL PERSONAJE:
    //this.playerFatGain(5);
    this.playerFatRefresh();



    var emitter = this.game.add.emitter(this.player.x, this.player.y, 5);
    emitter.makeParticles('snow');
    emitter.minParticleSpeed.setTo(-100, -100);
    emitter.maxParticleSpeed.setTo(100, 10);
    emitter.setAlpha(0.1, 1, 1000);
    emitter.setScale(0.01, 0.2, 0.01, 0.2, 500, Phaser.Easing.Quintic.Out);
    emitter.gravity = -800;

    //emitter.tint =0xff7777;
    emitter.forEach(function(particle) {  
    // tint every particle red  
        particle.tint = 0xff0000;
    });

    emitter.start(true, 500, null, 100);
    //1er parámetro: "explode"
    //  si es true, explota a alta velocidad al crearse.
    //2do parámetro: "lifeSpan"
    //  indica cuantos milisegundos va a vivir cada partícula
    //3er parámetro: ""
    //  indica....
    //4to parámetro: ""
    //  indica la cantidad de partículas totales

     if(this.player.health>100)
    {
        this.player.health=100;   
        this.playerHealthText.text = 'HP '+ this.player.health;
    }

    if(this.player.health<=0)
        {
            this.player.health=0;
            this.player.play('die'+this.currentWeapon);
            this.playerHealthText.text = 'HP '+ this.player.health;
            //this.player.health=1000000;
            //this.player.kill();
            this.player.deadBool=true;
            this.backMusic.stop();

            if(!this.enemyLaugh.isPlaying)
            {
              this.enemyLaugh.play();
  
            }  
            if(!this.gameOverSound.isPlaying)
            {
              this.gameOverSound.play();
            }      
            //
            this.win();       
        }
  },

  healPlayer: function(heal){
    //LE SUBO LA VIDA AL JUGADOR:
    this.player.health+=heal;

    this.playerHealthText.text = 'HP '+ this.player.health;
    if(this.player.health>100)
    {
        this.player.health=100;   
        this.playerHealthText.text = 'HP '+ this.player.health;
    }

    //ACTUALIZAR FAT DEL PERSONAJE:
    //this.playerFatGain(5);
    //this.playerFatRefresh();

    var emitter = this.game.add.emitter(this.player.x, this.player.y, 10);
    emitter.makeParticles('snow');
    emitter.minParticleSpeed.setTo(-40, -100);
    emitter.maxParticleSpeed.setTo(40, 10);
    emitter.setAlpha(0.1, 1, 1000);
    emitter.setScale(0.01, 0.2, 0.01, 0.2, 500, Phaser.Easing.Quintic.Out);
    emitter.gravity = -1200;

    //emitter.tint =0xff7777;
    emitter.forEach(function(particle) {  
    // tint every particle  
        particle.tint = 0xffffee;
    });

    emitter.start(true, 500, null, 10);

  },

  attackPlayer: function(player,enemy){
    if(!player.deadBool){
    //if(player.direction===enemy.direction)
    if(player.x<enemy.x)
    {
        if(enemy.direction<0)
        {
            if(!enemy.attacking)
            {  
              enemy.scheduleAttack();
                this.damagePlayer(enemy.attackPower);  
            }
        }
    }

    if(player.x>enemy.x)
    {
        if(enemy.direction>0)
        {
          if(!enemy.attacking)
            {  
              enemy.scheduleAttack();
              this.damagePlayer(enemy.attackPower);  
            }
        }
    }
    //
    }

    /*
     if(enemy.state==="attacking" )
    {

        if(enemy.animations.currentAnim.isFinished)
        {
            this.damagePlayer();
            this.state=;
        }
    }

    if(enemy.state==="attacking" && enemy.animations.currentAnim.isFinished)
    {
        
        
    }
    */
    //if(enemy.attacking="true")
  },



  /*
  barrelHit: function(){
    //alert('Game Over');
    //CAMBIO DE NIVEL O RECARGO EL NIVEL (SI PONGO EL NOMBRE DEL NIVEL ACTUAL):
    //this.game.state.start('GameState');
    barrel.kill();
    //this.player.scale.setTo(this.player.scale.x+100,this.player.scale.y+100);
    this.player.kill();
  },
  */



  damageEnemy: function(enemy, bullet) {
    //dañamos al enemigo y le pasamos la cantidad de daño:
    bullet.kill();
    this.addToScore(1);
    //this.playerPoints+=1;

    this.batHit.play();

    /*
    if(this.player.x+this.player.width>enemy.x+enemy.width)
    {
        enemy.damage(1,this.player.direction);  
    }
    */
    var playerDirection = this.player.direction;
    var lookAT='';

    //if(this.player.x+this.player.width > enemy.x+enemy.width)
    //if(this.player.body.position.x > enemy.body.position.x)
    if(playerDirection<0)
    {
        lookAT='left';
    }
    else
    {
        lookAT='right';
    }

    if(playerDirection===enemy.direction)
    {

        enemy.damage(1,playerDirection,lookAT);  
    }
    else{
        enemy.damage(1,playerDirection,lookAT); 
    }
    
    if(enemy.alive)
    {

    }
    else
    {
        this.addToScore(enemy.reward);
    }

    if(enemy.type==='zombie')
    {        
        //this.zombiePain.play();
    }

    if(enemy.health<=0)
    {
        this.spawnPowerUp(enemy);
    }
    
  },


  setupText: function() {
    this.score=0;



    //                   PLAYER SCORE TEXT:
    ////////////////////////////////////
    this.scoreText = this.add.text(
        //this.game.width / x, 30, '' + this.score,
        //this.game.width / 2, 30, '' + this.score,
        //this.game.width - 60, 40, '' + this.score,
        this.game.width/2, 30, '' + this.score,
            //{ font: '30px monospace', fill: '#fff', align: 'center'}
            { font: '30px verdana', fill: '#ff5', align: 'right'}
        );

    this.scoreText.anchor.set(0.5);
    this.scoreText.align = 'center';

    //  Font style
    this.scoreText.font = 'Arial Black';
    this.scoreText.fontSize = 40;
    this.scoreText.fontWeight = 'bold';

    //  Stroke color and thickness
    this.scoreText.stroke = '#222222';
    //this.scoreText.stroke = '#ffeeee';
    this.scoreText.strokeThickness = 8;
    //this.scoreText.fill = '#43d637';
    this.scoreText.fill = '#dddd37';

    this.scoreText.anchor.setTo(0.5, 0.5);
    //this.scoreText.anchor.scale.setTo(0.5, 0.5);

    //hago que no se mueva al mover la cámara:
    this.scoreText.fixedToCamera=true;

    this.scoreText.direction='right';
    this.scoreText.text = ''+ this.score;


    //                   PLAYER HIGHSCORE TEXT:
    ////////////////////////////////////
    this.playerHighScoreText = this.add.text(
        this.game.width-70, 30, 'HIGHSCORE \n'+ this.highScore,
            //{ font: '30px monospace', fill: '#fff', align: 'center'}
            { font: '30px verdana', fill: '#ff5', align: 'right'}
        );

    this.playerHighScoreText.anchor.set(0.5);
    //this.playerHighScoreText.align = 'center';

    //  Font style
    this.playerHighScoreText.font = 'Arial Black';
    this.playerHighScoreText.fontSize = 15;
    this.playerHighScoreText.fontWeight = 'bold';

    //  Stroke color and thickness
    this.playerHighScoreText.stroke = '#222222';
    //this.playerHighScoreText.stroke = '#ffeeee';
    this.playerHighScoreText.strokeThickness = 8;
    //this.playerHighScoreText.fill = '#43d637';
    //this.playerHighScoreText.fill = '#dddd37';
    this.playerHighScoreText.fill = '#ffffaa';

    this.playerHighScoreText.anchor.setTo(0.5, 0.5);
    //this.playerHealthText.anchor.scale.setTo(0.5, 0.5);

    //hago que no se mueva al mover la cámara:
    this.playerHighScoreText.fixedToCamera=true;

    //this.playerHighScoreText.direction='right';
    this.playerHighScoreText.text = 'HIGHSCORE \n'+ this.highScore;







    //                   PLAYER HP TEXT:
    ////////////////////////////////////
    this.playerHealthText = this.add.text(
        70, 30, 'HP ' + this.player.health,
            //{ font: '30px monospace', fill: '#fff', align: 'center'}
            { font: '30px verdana', fill: '#ff5', align: 'left'}
        );

    this.playerHealthText.anchor.set(0.5);
    //this.playerHealthText.align = 'center';

    //  Font style
    this.playerHealthText.font = 'Arial Black';
    this.playerHealthText.fontSize = 30;
    this.playerHealthText.fontWeight = 'bold';

    //  Stroke color and thickness
    this.playerHealthText.stroke = '#222222';
    //this.playerHealthText.stroke = '#ffeeee';
    this.playerHealthText.strokeThickness = 8;
    //this.playerHealthText.fill = '#43d637';
    //this.playerHealthText.fill = '#dddd37';
    this.playerHealthText.fill = '#37ff37';

    this.playerHealthText.anchor.setTo(0.5, 0.5);
    //this.playerHealthText.anchor.scale.setTo(0.5, 0.5);

    //hago que no se mueva al mover la cámara:
    this.playerHealthText.fixedToCamera=true;

    //this.playerHealthText.direction='right';
    this.playerHealthText.text = 'HP '+ this.player.health;




    //                   PLAYER FAT TEXT:
    ////////////////////////////////////
    this.playerFatText = this.add.text(
        70, 60, 'FAT ' + this.player.fat,
            //{ font: '30px monospace', fill: '#fff', align: 'center'}
            { font: '30px verdana', fill: '#ff5', align: 'left'}
        );

    this.playerFatText.anchor.set(0.5);
    //this.playerHealthText.align = 'center';

    //  Font style
    this.playerFatText.font = 'Arial Black';
    this.playerFatText.fontSize = 25;
    this.playerFatText.fontWeight = 'bold';

    //  Stroke color and thickness
    this.playerFatText.stroke = '#222222';
    //this.playerFatText.stroke = '#ffeeee';
    this.playerFatText.strokeThickness = 8;
    //this.playerFatText.fill = '#43d637';
    //this.playerFatText.fill = '#dddd37';
    //this.playerFatText.fill = '#37ff37';
    //this.playerFatText.fill = '#ff0000';
    this.playerFatText.fill = '#ffeeee';

    this.playerFatText.anchor.setTo(0.5, 0.5);
    //this.playerFatText.anchor.scale.setTo(0.5, 0.5);

    //hago que no se mueva al mover la cámara:
    this.playerFatText.fixedToCamera=true;

    //this.playerFatText.direction='right';
    this.playerFatText.text = 'FAT '+ this.player.fat;
  },

  addToScore: function (score) {
    this.score += score;
    //this.scoreText.text = 'score > '+this.score;
    this.scoreText.text = ''+ this.score;
    
    this.tweenScoreIn();
  },

  tweenScoreIn: function(){
    //this.add.tween(this.scoreText.scale).to({ x: 2, y: 2});
    //this.add.tween(this.scoreText.scale).to({ x: 1, y: 1});
    this.scoreText.tweenIN = this.game.add.tween(this.scoreText.scale);
    this.scoreText.tweenIN.to({x:1.3, y:1.3}, 200, Phaser.Easing.Bounce.Out);
    this.scoreText.tweenIN.onComplete.add(this.tweenScoreOut, this);
    this.scoreText.tweenIN.start();

    //pigArrives.to({x:150}, 1000, Phaser.Easing.Bounce.Out);
    //pigArrives.onComplete.add(firstTween, this);
    //pigArrives.start();
  },
  tweenScoreOut: function(){
    this.scoreText.tweenOUT = this.game.add.tween(this.scoreText.scale);
    this.scoreText.tweenOUT.to({x:1, y:1}, 200, Phaser.Easing.Bounce.Out);
    this.scoreText.tweenOUT.start();
  },

  playerFatRefresh: function(){
    //ACTUALIZAR FAT DEL PERSONAJE:
    //----------------------------
    
    if(this.player.fat>=0 && this.player.fat<100)
    {
        //this.player.fat-=5;
    }
    else if(this.player.fat<0)
    {
        this.player.fat=0;
        //this.player.walkSpeedMax=this.levelData.playerWalkSpeed;
        //this.player.jumpSpeedMax=this.levelData.playerJumpSpeed;
    }
    //else if(this.player.fat>100)
    else
    {
        this.player.fat=100;
        //this.player.walkSpeedMax=this.levelData.playerWalkSpeed;
        //this.player.jumpSpeedMax=this.levelData.playerJumpSpeed;
    }

    if(this.player.fat>=0 && this.player.fat<50)
    {
        //this.playerFatText.fill = '#43d637';
        //this.playerFatText.fill = '#dddd37';
        //this.playerFatText.fill = '#37ff37';
        this.playerFatText.fill = '#ffeeee';
    }
    else if(this.player.fat>=50 && this.player.fat<90)
    {
        this.playerFatText.fill = '#ff5555';

    }
    else if(this.player.fat>=90 && this.player.fat<=100)
    {
        this.playerFatText.fill = '#ff0000';
    }

    //this.player.fatSpeed=this.player.fat;
    //this.player.walkSpeed=this.player.walkSpeedMax-this.player.fat;
    //this.player.jumpSpeed=(this.player.jumpSpeedMax-this.player.fat)/2;
    this.playerFatText.text = 'FAT '+ this.player.fat;
    //----------------------------
  },

  playerFatGain: function(fatGain){
    this.player.fat+=fatGain;
  },

    playerFatLoss: function(fatLoss){
        this.player.fat-=1;
        //this.playerFatGain(-1);
        this.playerFatRefresh();
        this.player.fatLossInterval.kill;
        //clearInterval(this.fatLossInterval);
        this.player.fatLossInterval=null;

        
    },

  stuckPlayer: function(){
    //if()
    //this.player.reset(560,60);
    //this.player.body.reset(560,60);
    //getTiles(x, y, width, height, collides, interestingFace) 
    //var tileCheck= this.layer.getTiles(this.layer.getTileX(this.player.x), this.layer.getTileY(this.player.y), 32, 32, true, null);
    /*
    var tileCheck= this.layer.getTiles(this.player.x+this.player.width/2, this.player.y+this.player.height/2, 32, 32, true);
    if(tileCheck.index=10)
    {
        this.damagePlayer();
    };
    */
    this.player.walkSpeed=(this.player.walkSpeedMax-this.player.fat)/2;
    this.player.jumpSpeed=(this.player.jumpSpeedMax-this.player.fat)/1.5;
    //this.damagePlayer(1);

    if(this.player.recoverWalkSpeed)
    {
        this.player.recoverWalkSpeed.kill;
    }
        //this.player.recoverWalkSpeed = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.restartLevel, this);
        this.player.recoverWalkSpeed = this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            this.player.walkSpeed=this.player.walkSpeedMax-this.player.fat;
            this.player.jumpSpeed=this.player.jumpSpeedMax-this.player.fat;
        }, this);

  },

  getCoin: function(){

    this.map2.putTile(-1, this.layer2.getTileX(this.player.x+(20*this.player.direction)), this.layer.getTileY(this.player.body.y+0));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x+(20*this.player.direction)), this.layer.getTileY(this.player.body.y+50));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x+(10*this.player.direction)), this.layer.getTileY(this.player.body.y+0));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x+(10*this.player.direction)), this.layer.getTileY(this.player.body.y+50));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x-(10*this.player.direction)), this.layer.getTileY(this.player.body.y+0));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x-(10*this.player.direction)), this.layer.getTileY(this.player.body.y+50));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x-(20*this.player.direction)), this.layer.getTileY(this.player.body.y+0));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x-(20*this.player.direction)), this.layer.getTileY(this.player.body.y+50));

    if(!this.coinTake.isPlaying)
    {
        this.coinTake.play();
    }
    this.addToScore(this.coins.reward);
    this.player.fat+=5;
    this.playerFatRefresh();
  },

  newHighScoreF: function(){
    this.newHighScore.play();
  },

  win: function(){
    //CAMBIO DE NIVEL O RECARGO EL NIVEL (SI PONGO EL NOMBRE DEL NIVEL ACTUAL):
    this.lose();
    //clearInterval(this.intervalo);
    //this.intervalo=null;
    //this.game.time.SECOND=0;
  },

  playerPowerUp: function(player, powerUp){
    this.addToScore(powerUp.reward);
    this.powerUpTake.play();
    if(player.fat<=100)
    {
        this.player.fat+=powerUp.fat;
    }
    else
    {
        this.player.fat=100;
    }
    //curar al personaje:
    //this.playerHealthText+=5;
    //this.damagePlayer(-5);
    this.healPlayer(5);

    this.playerFatRefresh();
    powerUp.kill();
  },

  spawnPowerUp: function(enemy)
  {
    var powerUp = this.powerUpPool.getFirstExists(false);
    
    if(!powerUp){

      //this.rndPic = (Math.random(10)*10);
      this.rndPic = this.game.rnd.integerInRange(0, 2);
      if (this.rndPic<1)
      {
        var powerUp = this.powerUpPool.create(enemy.x,enemy.y,'powerUpIceCream01');
        //this.powerUpPool.add(powerUp);
      }
      else if (this.rndPic>=1 && this.rndPic<2)
      {
         var powerUp = this.powerUpPool.create(enemy.x,enemy.y,'powerUpIceCream02');
      }
      else{
          var powerUp = this.powerUpPool.create(enemy.x,enemy.y,'powerUpIceCream03');      
      }

    }
    powerUp.tint=enemy.tint;
    powerUp.scale.setTo(0.5, 0.5);
    powerUp.anchor.setTo(0.5, 0.5);
    powerUp.reward=this.levelData.powerUpReward;
    powerUp.fat=this.levelData.powerUpFat;
    
    powerUp.reset(enemy.x, enemy.y-50);
    powerUp.body.velocity.x = 0;
    powerUp.body.velocity.y = 0;
    powerUp.body.setSize(10, 60, 10, 10); //TAMAÑO CHICO
  },

  getWeaponRanged: function(){
    this.weaponTake.play();

    this.weapons[this.currentWeapon].visible = false;
    this.currentWeapon=1;
    this.weapons[this.currentWeapon].visible = true;

    this.player.play('attacking'+this.currentWeapon);

    this.map2.putTile(-1, this.layer2.getTileX(this.player.x+(20*this.player.direction)), this.layer.getTileY(this.player.body.y+0));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x+(20*this.player.direction)), this.layer.getTileY(this.player.body.y+50));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x+(10*this.player.direction)), this.layer.getTileY(this.player.body.y+0));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x+(10*this.player.direction)), this.layer.getTileY(this.player.body.y+50));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x-(10*this.player.direction)), this.layer.getTileY(this.player.body.y+0));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x-(10*this.player.direction)), this.layer.getTileY(this.player.body.y+50));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x-(20*this.player.direction)), this.layer.getTileY(this.player.body.y+0));
    this.map2.putTile(-1, this.layer2.getTileX(this.player.x-(20*this.player.direction)), this.layer.getTileY(this.player.body.y+50));
  },

  lose: function(){
    if(!this.playerWon)
    {
        this.playerWon=true;

        if(this.player.health>0)
        {
            this.playerYahoo.play();
            this.playerWin.play();
        }
        
        if(this.score>this.highScore)
        {
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.newHighScoreF, this);
        }
        
    }

    //this.newHighScore.play();

    //this.restartLevel();

    /*
    this.timer = this.game.time.create(1000, false);
    this.timer.add(3000);
    this.timer.onEvent.add(this.restartLevel(), this);
    this.timer.start();


    function update() {
    // test for 3 second delay
    if (game.time.now - timeCheck > 3000)
    {
    //3 seconds have elapsed, so safe to do something
    myNextFunction();}
    else
    {//still waiting

    }
    */


    //GUARDAR Y CARGAR DATOS LOCALES:
    /*
    this.localStorage.setItem('myItemKey', 'myContent');
    this.localStorage.getItem('myItemKey');

    Only thing to keep in mind: localstorage can only store strings.

    So in order to store whole objects, do this:

    localStorage.setItem('myObject', JSON.stringify(myObject));
    and in reverse:

    myObject = JSON.parse(localStorage.getItem('myObject'));
    */

    //localStorage.setItem('highScore0', JSON.stringify(this.score));
    //localStorage.setItem('highScore0', JSON.stringify(this.score));

    //localStorage.setItem("highScore0", this.score);

    //localStorage.highScore = this.score;
    //this.score=0;
    //this.highScore=5;
    if(this.score>this.highScore)
    {
        window.localStorage.setItem( 'highScore0', JSON.stringify(this.score));
    }
    //window.localStorage.setItem( 'highScore0', JSON.stringify(this.highScore));

    this.game.time.events.add(Phaser.Timer.SECOND * 3, this.restartLevel, this);

  },

  restartLevel: function(){
    
    //CAMBIO DE NIVEL O RECARGO EL NIVEL (SI PONGO EL NOMBRE DEL NIVEL ACTUAL):
    //this.timer.kill();
    //this.backMusic.stop();
    //this.backMusic=null;
    this.backMusic.destroy();
    this.game.state.start('Level1');
  }

};
