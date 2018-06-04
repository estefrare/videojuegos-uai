var Chaos = Chaos || {};

Chaos.Level01 = {

  //initiate game settings
  init: function() {
    //use all the area, don't distort scale
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //initiate physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },

  //load the game assets before the game starts
  preload: function() {
    this.load.image('space', 'assets/images/space.png');    
    this.load.image('player', 'assets/images/player.png');    
    this.load.image('bullet', 'assets/images/bullet.png');    
    // this.load.image('enemyParticle', 'assets/images/enemyParticle.png');    
    // this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);   
    // this.load.spritesheet('redEnemy', 'assets/images/red_enemy.png', 50, 46, 3, 1, 1);   
    // this.load.spritesheet('greenEnemy', 'assets/images/green_enemy.png', 50, 46, 3, 1, 1);       
    this.load.json('constants', 'js/constants.json');
  },
  //executed after everything is loaded
  create: function() {
    // this.constants = this.game.cache.getJSON('constants');
    //moving stars background
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');    
    
    this.background.autoScroll(30, 0);
    //Player
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height-50, 'player');
    this.player.lifespan = 10000;
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    //Bullets
    this.initBullets();
    this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/5, this.createPlayerBullet, this);
  },
  update: function() {
    this.player.body.velocity.x = 0;

    if(this.game.input.activePointer.isDown) {
      var targetX = this.game.input.activePointer.position.x;
      var direction = (targetX >= this.game.world.centerX) ? 1 : -1;
      this.player.body.velocity.x = this.PLAYER_SPEED * direction;      
    }
  },
  initBullets: function() {
    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
  },
  createPlayerBullet: function() {
    var bullet = this.playerBullets.getFirstExists(false);
    if(!bullet) {
      bullet = new Chaos.PlayerBullet(this.game, this.player.x, this.player.top);
      this.playerBullets.add(bullet);
    } else {
      bullet.reset(this.player.x, this.player.top);
    }
    bullet.body.velocity.y = this.BULLET_SPEED;
  }
};