var GameState2 = {
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.game.world.setBounds(0, 0, 640,360);

    this.cursors = this.game.input.keyboard.createCursorKeys();
      },
  preload: function() {
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('arrow', 'assets/images/projectile.png');
    this.load.image('target', 'assets/images/chompy.png');
    this.load.image('arrow', 'assets/images/projectile.png');
    this.load.image('background', 'assets/images/background.png');


    this.load.spritesheet('player', 'assets/images/ranger_spritesheet_ calciumtrice.png', 31, 31, 100, 1, 1);
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1); // nombre,path,ancho,alto,numero de sprites ,paddingx, paddingy 

    this.load.audio('playerFireSFX', 'assets/audio/shoot.ogg');
    this.load.audio('music', 'assets/audio/caravan.ogg');


    this.load.json('level2','assets/data/level2.json')
  },
  create: function() {

    this.add.image(this.world.centerX, this.world.centerY, 'background').anchor.set(0.5);
    this.music = this.add.audio('music');
    this.music.play();

    this.ground = this.add.sprite(0, 320, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.ground2 = this.add.sprite(360, 320, 'ground');
    this.game.physics.arcade.enable(this.ground2);
    this.ground2.body.allowGravity = false;
    this.ground2.body.immovable = true;
    this.ground2.enableBody = true;

    this.level2Data = this.game.cache.getJSON('level2');
    var platformData = this.level2Data.platformData;
    var targetData = this.level2Data.targetData;
    var target2Data = this.level2Data.target2Data;

    this.platforms = this.add.group();
    this.platforms.enableBody = true;

    for (var i = 0; i < platformData.length; i++) {
      this.platforms.create(platformData[i].x,platformData[i].y, 'platform');
    };
    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);



    var fireData = this.level2Data.fireData;
    this.fires = this.add.group();
    this.fires.enableBody = true;
    for (var i = 0; i < fireData.length; i++) {
      var fire = this.fires.create(fireData[i].x,fireData[i].y, 'fire');
      fire.animations.add('burning', [0,1], 4, true);
      fire.play('burning');
    };
    this.fires.setAll('body.allowGravity', false);

    this.targets = this.add.group();
    for (var i = 0; i < targetData.length; i++) {
      var target = this.targets.create(targetData[i].x,targetData[i].y, 'target');
      target.scale.setTo(-1,1);
      this.game.physics.arcade.enable(this.targets);
      target.body.allowGravity = false;
    };
    this.targets.setAll('reward', 1, false, false, 0, true);



    this.targets2 = this.add.group();

    for (var i = 0; i < target2Data.length; i++) {
      var target2 = this.targets2.create(target2Data[i].x,target2Data[i].y, 'target');
      target2.scale.setTo(1,1);
      this.game.physics.arcade.enable(target2);
      target2.body.allowGravity = false;
    };
    this.targets2.setAll('reward', 1, false, false, 0, true);


    this.player = this.add.sprite(10, 300, 'player', 3);
    this.game.physics.arcade.enable(this.player);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 12, true); // loop = true
    this.player.animations.add('shooting', [35,36,37,38], 4, true); 
    this.player.animations.add('idle', [11,12,13,14,15,16,17,18,19,20], 3, false); 

    this.player.body.collideWorldBounds = true;
    this.playerFireSFX = this.add.audio('playerFireSFX');


    this.arrows = this.add.group();
    this.arrows.enableBody = true;
    this.arrows.physicsBodyType = Phaser.Physics.ARCADE;
    this.arrows.createMultiple(1, 'arrow');

    this.arrows.setAll('anchor.x', 0.5);
    this.arrows.setAll('anchor.y', 0.5);

    this.arrows.setAll('outOfBoundsKill', true);
    this.arrows.setAll('checkWorldBounds', true);
    this.arrows.setAll('body.allowGravity', false);

    this.nextShotAt = 0;
    this.shotDelay = 500;

    this.setupText();

},
  update: function() {
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.ground2);
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.physics.arcade.overlap(this.player, this.fires, this.playerHit, null, this);
    this.game.physics.arcade.overlap(this.arrows, this.platforms, this.wallHit, null, this);
    this.game.physics.arcade.overlap(this.arrows, this.targets, this.targetHit, null, this);
    this.game.physics.arcade.overlap(this.arrows, this.targets2, this.target2Hit, null, this);
    this.game.physics.arcade.overlap(this.arrows, this.fires, this.fireHit, null, this);

    if(this.cursors.right.isDown || this.player.isMovingRight) {
      this.player.body.velocity.x = 150;
      this.player.scale.setTo(1,1);
      this.player.play('walking');
    } else if (this.player.body.velocity.x < 0){
      this.player.body.velocity.x += 3
    };

    if(this.cursors.left.isDown || this.player.isMovingLeft) {
      this.player.body.velocity.x = -150;
      this.player.scale.setTo(-1,1);
      this.player.play('walking');
    } else if (this.player.body.velocity.x > 0){
      this.player.body.velocity.x -= 3
    };

    if(this.player.body.velocity.x ===0){

      this.player.play('idle');
    };

    if((this.cursors.up.isDown || this.player.isJumping) && (this.player.body.touching.down|| this.player.isJumping)) {
      this.player.body.velocity.y = -400;
    };

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z)){
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fireLeft();
      }      
      this.player.play('shooting');
      this.playerFireSFX.play();


    };

    if (this.input.keyboard.isDown(Phaser.Keyboard.X)){
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fireRight();
      }      
      this.player.play('shooting');
    };

    this.processDelayedEffects();


  },

  processDelayedEffects: function () {
      /*if (this.instructions.exists && this.time.now > this.instExpire) {
       this.instructions.destroy();
      }*/
      if (this.showReturn && this.time.now > this.showReturn) {
        this.returnText = this.add.text(
        this.game.width / 2, this.game.height / 2 + 20, 
        'Press Z or Tap Game to go back to Main Menu', 
        { font: '16px sans-serif', fill: '#fff'}
      );
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;
    }
  },

  moveLeft:function () {
    this.player.isMovingLeft = true;
  },
  dontMoveLeft:function () {
    this.player.isMovingLeft = false;
  },
  moveRight:function () {
    this.player.isMovingRight = true;
  },
  dontMoveRight:function () {
    this.player.isMovingRight = false;
  },
  jump:function () {
    this.player.isJumping = true;
  },
  dontJump:function () {
    this.player.isJumping = false;
  },

  fireLeft: function() {
    if (this.nextShotAt > this.time.now) {
      return;
    }

    if (this.arrows.countDead() === 0) {
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;
    var arrow = this.arrows.getFirstExists(false);

    arrow.reset(this.player.x-20, this.player.y);

    arrow.body.setSize(20, 20, 0, 20);
    arrow.body.velocity.x = -500;
    arrow.scale.setTo(1,1);
    this.playerFireSFX.play();
  },
    fireRight: function() {
    if (this.nextShotAt > this.time.now) {
      return;
    }

    if (this.arrows.countDead() === 0) {
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;
    var arrow = this.arrows.getFirstExists(false);

    arrow.reset(this.player.x +20, this.player.y);

    arrow.body.setSize(20, 20, 0, 20);
    arrow.body.velocity.x = +500;
    arrow.scale.setTo(-1,1);
    this.playerFireSFX.play();
  },
  playerHit: function(player,fires){
    player.kill();
    this.dead();
  },

  wallHit: function (arrows, platforms) {
    arrows.kill();
  },

  targetHit: function (arrows, targets) {

    arrows.kill();
    targets.kill();
    
    this.addToScore(1);

  },
  
  target2Hit: function (arrows, targets2) {

    arrows.kill();
    targets2.kill();
    
    this.addToScore(1);

  },
  fireHit: function (arrows, fires) {
    arrows.kill();
  },

  quitGame: function () {

    this.music.destroy();

    this.state.start('Game2') 
  },

  addToScore: function (score) {
     this.score += score;
    if (this.score >= 5) {
      this.displayEnd(true);
    }
  },
  setupText: function () {
    /*this.instructions = this.add.text( 315, 50, 'Use Arrow Keys to Move,\n Press Z to Fire Left and X to Fire Right\n', 
      { font: '25px monospace', fill: '#000', align: 'center' });
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + 10000;*/
    
    this.score = 0;

  },
  dead:function () {
    this.game.time.events.add(Phaser.Timer.SECOND * 5, this.quitGame(), this); 
  },
   displayEnd: function (win) {
     if (this.endText && this.endText.exists) {
       return;
     }
 
     /*var msg = win ? 'You Win!!!' : 'Game Over!';
     this.endText = this.add.text( 
       this.game.width / 2, this.game.height / 2 - 60, msg, 
       { font: '72px serif', fill: '#fff' }
     );
     this.endText.anchor.setTo(0.5, 0);*/
     this.music.destroy();
     this.game.state.start('Game3');
    },

}
/*    this.player.destroy();
    this.targets.destroy();
    this.targets2.destroy();
    this.fires.destroy();
    this.platforms.destroy();
*/