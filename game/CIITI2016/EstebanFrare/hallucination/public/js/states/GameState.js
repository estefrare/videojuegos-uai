var Hallucination = Hallucination || {};

Hallucination.GameState = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        
        //keys
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //this is for to move the camera on movil version
        this.moveCamera = 0;
    },
    preload: function() {
        if(navigator.platform == 'Win32' || navigator.platform == 'MacIntel'){
            //this is only for the pc version
            //map
            this.load.tilemap('map', 'assets/tilemaps/maps/map.csv', null, Phaser.Tilemap.TILED_JSON);
            //images
            this.load.image('sky', 'assets/images/sky.png');
        }else{
            //this is only for the movil version
            //map
            this.load.tilemap('map', 'assets/tilemaps/maps/mapMovil.csv', null, Phaser.Tilemap.TILED_JSON);
            //controls
            this.load.image('leftButton', 'assets/images/leftButton.png');
            this.load.image('rightButton', 'assets/images/rightButton.png');
            this.load.image('upButton', 'assets/images/upButton.png');
            this.load.image('downButton', 'assets/images/downButton.png');
        }
        //this is for both versions     
        //audios
        this.load.audio('pikedCoin', ['assets/audios/coin.ogg']);
        this.load.audio('music', ['assets/audios/music.ogg']);
        this.load.audio('fly', ['assets/audios/01.ogg']);
        //image
        this.game.load.image('tiles1', 'assets/tilemaps/tiles/tiles1.png');
        this.load.image('live', 'assets/sprites/live.png');
        this.load.image('gameOver', 'assets/images/gameover.png');
        this.load.image('win', 'assets/images/win.png');
        //spritesheet
        this.load.spritesheet('enemi', 'assets/sprites/enemis.png', 32, 32);
        this.load.spritesheet('enemi2', 'assets/sprites/enemis2.png', 32, 32);
        this.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
        this.load.spritesheet('sun', 'assets/sprites/sun.png', 32, 32);
        this.load.spritesheet('player', 'assets/sprites/player2.png', 66, 92, 16);

        //Game mode
        this.modePlayer = 'normal';
    },
    create: function() {
        if(navigator.platform == 'Win32' || navigator.platform == 'MacIntel'){
            //if this only for the pc version
            this.sky = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');
            this.sky.autoScroll(-10, 0);
            this.sky.fixedToCamera = true;
        }
        //map
        this.map = this.game.add.tilemap('map');
        //tiles
        this.map.addTilesetImage('tiles1');
        //Set collision
        this.map.setCollisionBetween(1, 500);
        //player
        this.initPlayer();
        //layers
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer2 = this.map.createLayer('Tile Layer 2');
        this.layer.resizeWorld();
        //coins
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        // //suns
        this.suns = this.game.add.group();
        this.suns.enableBody = true;
        //enemis
        this.enemis = this.game.add.group();
        this.enemis.enableBody = true;
        //lives
        this.lives = this.game.add.group();
        this.lives.enableBody = true;

        //create objets
        this.map.createFromObjects('Object Layer 1', 1, 'coin', 0, true, false, this.coins, Hallucination.Coin);
        this.map.createFromObjects('Object Layer 1', 21, 'sun', 0, true, false, this.suns);
        this.map.createFromObjects('Object Layer 1', 52, 'enemi', 0, true, false, this.enemis, Hallucination.Enemy);
        this.map.createFromObjects('Object Layer 1', 70, 'enemi2', 0, true, false, this.enemis, Hallucination.Enemy);
        this.map.createFromObjects('Object Layer 1', 88, 'live', 0, true, false, this.lives);        
        //set groups
        this.coins.setAll('body.allowGravity', false);
        this.lives.setAll('body.allowGravity', false);
        this.suns.setAll('body.allowGravity', false);
        this.suns.setAll('body.setSize', 5, 5, 5, 5);

        if(navigator.platform == 'Win32' || navigator.platform == 'MacIntel'){
            this.game.camera.follow(this.player);
            this.suns.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1], 8, true);
            this.suns.callAll('animations.play', 'animations', 'spin');  
        }else{
            this.addTouchControls();
        }
        //music
        this.music = this.game.add.audio('music');
        this.flyMusic = this.game.add.audio('fly');
        this.music.play();
        this.pikedCoinMusic = this.game.add.audio('pikedCoin');
        //this is because the player start jumping 
        this.player.play('jump');   
        //text on screen -------------------------------//
        this.style1 = { 
            font: "bold 32px Arial", 
            fill: "#fff", 
            boundsAlignH: "center", 
            boundsAlignV: "middle",
        };
        this.scoreText = this.game.add.text(60, 18, this.player.score.toString(), this.style1);
        this.scoreText.fixedToCamera = true;
        this.liveText = this.game.add.text(190, 18, this.player.health.toString(), this.style1);
        this.liveText.fixedToCamera = true;
        this.live = this.game.add.image(150, 23, 'live');
        this.live.fixedToCamera = true;
        this.score = this.game.add.image(20, 20, 'coin', 0);
        this.score.fixedToCamera = true;
        //--------------------------------------------//
    },
    update: function() {
        //collides
        this.game.physics.arcade.collide(this.player, this.layer, this.collidePlayerLayer, null, this);
        this.game.physics.arcade.collide(this.enemis, this.layer, this.collideEnemiLayer, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemis, this.collidePlayerEnemi, null, this);
        this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.game.physics.arcade.overlap(this.player, this.suns, this.collectSun, null, this);
        this.game.physics.arcade.overlap(this.player, this.lives, this.collidePlayerLives, null, this);

        //camera comportment
        if(navigator.platform != 'Win32'){
            if(this.player.body.x > this.moveCamera - 200){
            this.game.camera.x = this.player.body.x; 
            this.moveCamera = this.player.body.x + 1400;
            }
        }       

        console.log(this.pepe)  

        if(this.player.health <= 0){
            this.gameEnd = this.game.add.image(531, 226.5 , 'gameOver');
        }

        if(this.modePlayer =='super'){
            //move up
            this.player.body.setSize(20, 48, 20, 33);
            if(this.upKey.isDown || this.player.isJumping){
                this.player.scale.setTo(1, 1);
                this.player.frame = 0;
                this.player.body.velocity.y = -200;
                this.player.angle = 10;
            }
            this.player.body.velocity.x = 250; 
            this.stage.backgroundColor = "#cf747e";
        }else if(this.modePlayer == 'normal'){
            this.stage.backgroundColor = "#a3cff0";
            //down
            if(this.downKey.isDown || this.player.isBending){
                this.player.frame = 12;
                this.player.body.setSize(30, 58, 20, 33);
                if(this.player.body.velocity.x != 0){
                    if(this.player.body.velocity.x > 0){
                        this.player.body.velocity.x -= 2;
                    }else if(this.player.body.velocity.x < 0){
                        this.player.body.velocity.x += 2;
                    }
                }
            }else{
                this.player.body.setSize(25, 78, 20, 13);
                //move left
                if(this.leftKey.isDown || this.player.isMovingLeft) {
                    this.player.scale.setTo(-1, 1);
                    this.player.body.velocity.x = -180;                
                    if(this.player.animations.currentAnim.isFinished){
                       this.player.play('runing');
                    }
                //move right    
                }else if(this.rightKey.isDown || this.player.isMovingRight) {
                    this.player.scale.setTo(1, 1);
                    this.player.body.velocity.x = +180;
                    if(this.player.animations.currentAnim.isFinished){
                       this.player.play('runing');
                    }
                }else{
                    this.player.body.velocity.x = 0;
                    this.player.animations.stop();
                }
                //up
                if((this.upKey.isDown || this.player.isJumping) && this.player.body.velocity.y == 0){
                    this.player.body.velocity.y = -550;
                    this.player.play('jump');
                }
                if(this.upKey.isDown){
                    this.upKey.isDown = false;
                }
            }
            //return normal frame
            if(this.downKey.isUp && this.player.animations.currentAnim.isFinished){
                this.player.frame = 0;
            }  
            if(navigator.platform == 'Win32' || navigator.platform == 'MacIntel'){
                if(this.player.body.x >= 7367){
                    this.player.ax = 7367;
                    this.player.ay = 531;
                }  
            }
        }
    },
    render: function() {

        // this.game.debug.body(this.player);
        // call renderGroup on each of the alive members    
        // this.enemis.forEachAlive(renderGroup, this);
        // function renderGroup(member) {
        //     this.game.debug.body(member);
        // }
    },
    addTouchControls: function() {
        this.leftArrow = this.add.button(50, 530, 'leftButton');
        this.rightArrow = this.add.button(250, 530, 'rightButton');
        this.upArrow = this.add.button(1200, 350, 'upButton');
        this.downArrow = this.add.button(1200, 530, 'downButton');

        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.upArrow.fixedToCamera = true;
        this.downArrow.fixedToCamera = true;

        this.leftArrow.events.onInputDown.add(this.moveLeft.bind(this));
        this.leftArrow.events.onInputUp.add(this.dontMoveLeft.bind(this));
        this.leftArrow.events.onInputOver.add(this.moveLeft.bind(this));
        this.leftArrow.events.onInputOut.add(this.dontMoveLeft.bind(this));

        this.rightArrow.events.onInputDown.add(this.moveRight.bind(this));
        this.rightArrow.events.onInputUp.add(this.dontMoveRight.bind(this));
        this.rightArrow.events.onInputOver.add(this.moveRight.bind(this));
        this.rightArrow.events.onInputOut.add(this.dontMoveRight.bind(this));

        this.upArrow.events.onInputDown.add(this.jump.bind(this));
        this.upArrow.events.onInputUp.add(this.dontJump.bind(this));
        this.upArrow.events.onInputOver.add(this.jump.bind(this));
        this.upArrow.events.onInputOut.add(this.dontJump.bind(this));

        this.downArrow.events.onInputDown.add(this.bend.bind(this));
        this.downArrow.events.onInputUp.add(this.dontBend.bind(this));
        this.downArrow.events.onInputOver.add(this.bend.bind(this));
        this.downArrow.events.onInputOut.add(this.dontBend.bind(this));
    },
    moveLeft: function() {
        this.player.isMovingLeft = true;
    },
    dontMoveLeft: function() {
        this.player.isMovingLeft = false;
    },
    moveRight: function() {
        this.player.isMovingRight = true;
    },
    dontMoveRight: function() {
        this.player.isMovingRight = false;
    },
    jump: function() {
        this.player.isJumping = true;
    },
    dontJump: function() {
        this.player.isJumping = false;
    },
    bend: function() {
        this.player.isBending = true;
    },
    dontBend: function() {
        this.player.isBending = false;
    },
    initPlayer: function(){
        this.players = this.add.group();
        this.players.enableBody = true;
        
        var player = new Hallucination.Player(this.game, 100, 100, 'player', 100);
        this.players.add(player); 
        this.player = this.players.getFirstExists(true);
    },
    collidePlayerLives: function(player, lives){
        player.health++;
        this.liveText.text = player.health.toString();
        lives.kill();
    },
    collidePlayerLayer: function(player, layer){
        if(layer.index == 41 || layer.index == 50){ //38 is water, 50 is spike
            player.damage();
            this.game.camera.x = 0;
            this.moveCamera = 0;
            this.liveText.text = player.health.toString();
        }       
        if(layer.index == 49){//49 is flag
            this.gameEnd = this.game.add.image(531, 226.5 , 'win');
            this.gameEnd.fixedToCamera = true;
        } 
    },
    collidePlayerEnemi: function(player, enemi){
        if(player.body.touching.down){
            enemi.frame = 2;
            enemi.animations.stop();
            enemi.body.velocity.x = 0;
            enemi.health = 0;
        }else{
            if(enemi.health > 0){
                this.game.camera.x = 0;
                this.moveCamera = 0;
                player.damage();
                this.liveText.text = player.health.toString();
            } 
        }   
    },
    collideEnemiLayer: function(enemi, layer){
        if(layer.index == 31 || layer.index == 33 || layer.index == 45 || layer.index == 44){
            enemi.body.velocity.x = 0;
        }
    },
    collectCoin: function(player, coin) {
        coin.kill();
        player.score += 1;
        this.scoreText.text = player.score.toString();
        this.pikedCoinMusic.play();
    }, 
    collectSun: function(player, sun){
        sun.kill();
        this.modePlayer = 'super';
        this.flyMusic.play();
        this.music.pause();
        setTimeout(this.changeMode.bind(this), 6000);
    },
    changeMode: function(){
        if(this.modePlayer == 'super'){
            this.modePlayer = 'normal';
            this.player.angle = 0;
            this.flyMusic.stop();
            this.music.play();
        }else if(this.modePlayer == 'normal'){
            this.modePlayer = 'super';
        }
    }
}

