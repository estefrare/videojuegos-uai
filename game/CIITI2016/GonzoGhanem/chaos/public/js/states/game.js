var Chaos = Chaos || {};

Chaos.Game = {

  //initiate game settings
  init: function() {
    //use all the area, don't distort scale
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.device = 'desktop';
    if (!this.game.device.desktop) { 
      this.is_mobile = true;
      this.device = 'mobile';
      // this.game.stage.scale.startFullScreen();
    }
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    //initiate physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.bounds.bottomLeft = {x: 0, y: this.game.world.bounds.bottom};
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.controls = {
      start: this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER),
      shoot: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      basic: this.game.input.keyboard.addKey(Phaser.Keyboard.Q),
      machine_gun: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      bomb: this.game.input.keyboard.addKey(Phaser.Keyboard.E),
      turbo: this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
      pause: this.game.input.keyboard.addKey(Phaser.Keyboard.P)
    }
    this.next_shoot = this.time.now;
  },

  //load the game assets before the game starts
  preload: function() {
    this.load.image('space', 'assets/images/space.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('enemyParticle', 'assets/images/enemyParticle.png');    
    this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);
    this.load.spritesheet('redEnemy', 'assets/images/red_enemy_big.png', 98, 90, 3, 1, 1);
    this.load.image('asteroid', 'assets/images/asteroid.png');
    this.load.json('constants', 'assets/data/level.json');
    this.load.audio('blaster', 'assets/audio/blaster.mp3');
    this.load.audio('explode', 'assets/audio/explosion.mp3');
    this.load.audio('death', 'assets/audio/death.mp3');

    if(this.is_mobile){
      this.load.image('arrow_up', 'assets/images/flecha_arriba.png');
      this.load.image('arrow_down', 'assets/images/flecha_abajo.png');
      this.load.image('arrow_left', 'assets/images/flecha_izq.png');
      this.load.image('arrow_right', 'assets/images/flecha_derecha.png');
      this.load.image('bomb_image', 'assets/images/boton_bomba.png');
    }

  },
  //executed after everything is loaded
  create: function() {
    //Sounds first, need to decode
    this.blaster = this.game.add.audio('blaster');
    this.explode = this.game.add.audio('explode');
    this.bomb_explosion = this.game.add.audio('death');
    // this.game.sound.setDecodedCallback([ blaster ], start, this);

    this.game.paused = false;
    this.game_constants = this.game.cache.getJSON('constants');
    this.background = this.add.tileSprite(0, 50, this.game.world.width, this.game.world.height - 50, 'space');    

    this.background.autoScroll(30, 0);
    //Player WORKING
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height-50, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.angle = -90;
    this.player.health = 100;
    this.game.physics.arcade.enable(this.player);
    this.player.enableBody = true;
    this.player.body.collideWorldBounds = true;
    this.player.selected_weapon = 'basic';
    this.player.is_turbo = false;
    this.player.score = 0;
    this.player.bomb_readiness = 0;
    ////////////////
    this.basic_weapon_text = this.game.add.text(this.game.world.bounds.left + 10, this.game.world.bounds.top + 10, "Cañón (Q)", this.getTextStyle(this.game_constants.weapons.selected_color));

    this.machine_gun_weapon_text = this.game.add.text(this.game.world.bounds.left + 200, this.game.world.bounds.top + 10, "Ametralladora (W)", this.getTextStyle(this.game_constants.weapons.unselected_color));

    this.bomb_weapon_text = this.game.add.text(this.game.world.bounds.left + 500, this.game.world.bounds.top + 10, "Bomba (E)", this.getTextStyle(this.game_constants.weapons.unavailable_color));

    this.turbo_text = this.game.add.text(this.game.world.bounds.left + 700, this.game.world.bounds.top + 10, "Turbo (SHIFT)", this.getTextStyle(this.game_constants.weapons.unselected_color));

    this.player_score_text = this.game.add.text(this.game.world.bounds.left + 1000, this.game.world.bounds.top + 10, "Puntaje: 0", this.getTextStyle(this.game_constants.weapons.unselected_color));
    
    this.player_life_text = this.game.add.text(this.game.world.bounds.left + 1200, this.game.world.bounds.top + 10, "Vida: 100", this.getTextStyle(this.game_constants.weapons.unselected_color));

    this.pause_text = this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, 'PAUSA', {
      font: "40px Arial",
      boundsAlignH: "center",
      align: "center",
      fill: this.game_constants.weapons.unselected_color
    });
    this.pause_text.visible = false;

    this.bomb_ready_text = this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, 'BOMBA DISPONIBLE!! (E)', {
      font: "40px Arial",
      boundsAlignH: "center",
      align: "center",
      fill: this.game_constants.weapons.unselected_color
    });
    this.bomb_ready_text.visible = false;
    //Bullets
    this.initBullets();

    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
  
    //ENEMIES
    this.enemies = this.add.group();
    this.game.physics.arcade.enable(this.enemies);
    this.enemies.enableBody = true;
    this.enemies.setAll('checkWorldBounds', true);
    this.enemies.setAll('outOfBoundsKill', true);
    this.enemies.setAll('body.allowCollision', true);
    this.game.time.events.repeat(Phaser.Timer.SECOND * this.game_constants.device[this.device].enemy_generation, 100, this.createEnemy.bind(this), this.game);
    this.game.time.events.repeat(Phaser.Timer.SECOND * this.game_constants.device[this.device].big_enemy_generation, 100, this.createBigEnemy.bind(this), this.game);

    //ASTEROIDES
    this.asteroids = this.add.group();
    this.game.physics.arcade.enable(this.asteroids);
    this.asteroids.enableBody = true;
    this.asteroids.setAll('checkWorldBounds', true);
    this.asteroids.setAll('outOfBoundsKill', true);
    this.asteroids.setAll('body.allowCollision', true);
    this.game.time.events.repeat(Phaser.Timer.SECOND * this.game_constants.device[this.device].asteroid_generation, 100, this.createAsteroid.bind(this), this.game);
  },
  update: function() {
    this.player.body.angularVelocity = 0;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.listenToControls();
    if(this.is_mobile) {
      this.setMobileEvents();
    }
    this.listenToMoveControls();


    this.game.physics.arcade.overlap(this.enemies, this.player, this.playerDead.bind(this));
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.overlap(this.player, this.asteroids, this.playerDead.bind(this));
    this.game.physics.arcade.overlap(this.enemies, this.asteroids, this.killTheFucker.bind(this));
    this.game.physics.arcade.overlap(this.player, this.enemyBullets, this.playerGetDamaged.bind(this));
    this.game.physics.arcade.overlap(this.enemies, this.playerBullets, this.enemyGetDamaged.bind(this));
  },
  render: function() {
    // this.enemies.forEachAlive(function(enemy) {
    //   this.game.debug.body(enemy);
    // }, this);
    // this.asteroids.forEachAlive(function(asteroid) {
    //   this.game.debug.body(asteroid);
    // }, this);
    // this.game.debug.body(this.player);
  },
  initBullets: function() {
    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
    this.playerBullets.setAll('checkWorldBounds', true);
    this.playerBullets.setAll('outOfBoundsKill', true);
  },
  setMobileEvents: function() {
    this.up_arrow_button = this.add.button(50, this.game.world.height-250, 'arrow_up');
    this.up_arrow_button.events.onInputOver.add(function(){this.moving_forward = true;}.bind(this));
    this.up_arrow_button.events.onInputUp.add(function(){this.moving_forward = false;}.bind(this));

    this.down_arrow_button = this.add.button(50, this.game.world.height-150, 'arrow_down');
    this.down_arrow_button.events.onInputOver.add(function(){this.moving_back = true;}.bind(this));
    this.down_arrow_button.events.onInputUp.add(function(){this.moving_back = false;}.bind(this));

    this.left_arrow_button = this.add.button(1050, this.game.world.height-150, 'arrow_left');
    this.left_arrow_button.events.onInputOver.add(function(){this.moving_left = true;}.bind(this));
    this.left_arrow_button.events.onInputUp.add(function(){this.moving_left = false;}.bind(this));

    this.right_arrow_button = this.add.button(1200, this.game.world.height-150, 'arrow_right');
    this.right_arrow_button.events.onInputOver.add(function(){this.moving_right = true;}.bind(this));
    this.right_arrow_button.events.onInputUp.add(function(){this.moving_right = false;}.bind(this));

    this.bomb_button = this.add.button(1200, this.game.world.height-300, 'bomb_image');
    this.bomb_button.visible = false;
    this.bomb_button.events.onInputOver.add(function(){this.bombing = true;}.bind(this));
    this.bomb_button.events.onInputUp.add(function(){this.bombing = false;}.bind(this));

  },
  moveForward: function(turbo) {
    this.player.is_turbo = turbo;
    if(turbo){
      this.turbo_text.setStyle(this.getTextStyle(this.game_constants.weapons.selected_color));
      this.game.physics.arcade.velocityFromAngle(this.player.angle, this.game_constants.player.turbo_speed, this.player.body.velocity);
    } else {
      this.game.physics.arcade.velocityFromAngle(this.player.angle, this.game_constants.player.speed, this.player.body.velocity);
    }
  },
  listenToMoveControls: function() {
    if (this.cursors.left.isDown || this.moving_left)
    {
      this.player.body.angularVelocity = -200;
    }
    else if (this.cursors.right.isDown || this.moving_right)
    {
      this.player.body.angularVelocity = 200;
    }
    if ((this.cursors.up.isDown || this.moving_forward) && this.controls.turbo.isDown)
    {
      this.player.is_turbo = true;
      // this.moveForward(true);
      this.turbo_text.setStyle(this.getTextStyle(this.game_constants.weapons.selected_color));
      this.game.physics.arcade.velocityFromAngle(this.player.angle, this.game_constants.player.turbo_speed, this.player.body.velocity);
    } else if (this.cursors.up.isDown || this.moving_forward) {
      // this.moveForward(false);
      this.player.is_turbo = false;
      this.game.physics.arcade.velocityFromAngle(this.player.angle, this.game_constants.player.speed, this.player.body.velocity);
    }
    if (this.cursors.down.isDown || this.moving_back) {
      this.player.is_turbo = false;
      this.game.physics.arcade.velocityFromAngle(this.player.angle, - this.game_constants.player.speed, this.player.body.velocity);
    }
    if(!this.player.is_turbo){
      this.turbo_text.setStyle(this.getTextStyle(this.game_constants.weapons.unselected_color));
    }
  },
  listenToControls: function() {
    if(this.controls.shoot.isDown || this.is_mobile) {
      this.shoot();
    }
    if(this.controls.basic.isDown) {
      this.player.selected_weapon = 'basic';
      this.basic_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.selected_color));
      this.machine_gun_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.unselected_color));
    }
    if(this.controls.bomb.isDown || this.bombing) {
      this.fire_bomb();
    }
    if(this.controls.machine_gun.isDown) {
      this.player.selected_weapon = 'machine_gun';
      this.machine_gun_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.selected_color));
      this.basic_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.unselected_color));
    }
    this.controls.pause.onDown.add(this.togglePause.bind(this));      
  },
  restartGame: function(){
    this.game.paused = false;
    Chaos.game.state.start('Game');
  },
  togglePause: function(){
    this.game.paused = !this.game.paused;
    this.pause_text.setText('PAUSA');
    this.pause_text.visible = !this.pause_text.visible;
  },
  shoot: function() {
    if (this.next_shoot > this.time.now) return;
    var bullet = this.playerBullets.getFirstExists(false);
    if(!bullet) {
      bullet = new Chaos.PlayerBullet(this.game, this.player.x, this.player.y);
      this.playerBullets.add(bullet);
    } else {
      bullet.reset(this.player.x, this.player.y);
    }
    this.blaster.play();
    this.game.physics.arcade.velocityFromAngle(this.player.angle, this.game_constants.player.bullet_speed, bullet.body.velocity);
    this.next_shoot = this.time.now + this.game_constants.weapons[this.player.selected_weapon].fire_rate;
  },
  getTextStyle: function (color) {
    return { 
      font: "30px Arial",
      fill: color,
      align: "center"
    }
  },
  playerGetDamaged: function(player, bullet) {
    player.damage(bullet.hit_power);
    bullet.kill();
    this.player_life_text.setText("Vida: " + player.health);
    if(player.health <= 0){
      this.playerDead();
    }
  },
  playerDead: function(){ 
    // setTimeout(function(){this.game.state.start('Game')}, 10000);
    this.pause_text.setText("GAME OVER\nPuntaje total: " + this.player.score+"\nENTER para volver a jugar");
    this.pause_text.visible = true;
    // this.bomb_explosion.play();
    this.controls.start.onDown.add(this.restartGame.bind(this));
    this.game.paused = true;
  },
  enemyGetDamaged: function(enemy, bullet) {
    bullet.kill();
    enemy.damage(this.game_constants.weapons[this.player.selected_weapon].damage);
    if(enemy.health > 0) {
      this.player.score += 5;
    } else {
      this.explode.play();
      this.player.score += 50;
      this.player.bomb_readiness += 1;
    }
    this.player_score_text.setText("Puntaje: " + this.player.score);
    if(this.player.bomb_readiness == this.game_constants.player.bomb_ready){
      this.bombReady();
    }
  },
  createEnemy: function() {
    var random_position_y = Math.floor(Math.random()*(1-0+1)+0);
    var verticals = ['top', 'bottom'];
    var enemy_info = this.game_constants.enemies['small']
    var enemy = new Chaos.Enemy(this.game, this.game.world.randomX, this.game.world.bounds[verticals[random_position_y]], enemy_info.sprite, enemy_info.health, this.enemyBullets, this.player, enemy_info.damage, !this.is_mobile);
    this.enemies.add(enemy);
  },
  createBigEnemy: function() {
    var random_position_y = Math.floor(Math.random()*(1-0+1)+0);
    var verticals = ['top', 'bottom'];
    var enemy_info = this.game_constants.enemies['big']
    var enemy = new Chaos.Enemy(this.game, this.game.world.randomX, this.game.world.bounds[verticals[random_position_y]], enemy_info.sprite, enemy_info.health, this.enemyBullets, this.player, enemy_info.damage, !this.is_mobile);
    this.enemies.add(enemy);
  },
  createAsteroid: function() {
    var options = [
      {start: 'topLeft', stop: 'bottomRight'},
      {start: 'topRight', stop: 'bottomLeft'}
    ];
    var random_initial_position = Math.floor(Math.random()*(1-0+1)+0);
    var selected_pos = options[random_initial_position];
    var asteroid = new Chaos.Asteroid(this.game, this.game.world.bounds[selected_pos.start].x, this.game.world.bounds[selected_pos.start].y, 'asteroid', this.game.world.bounds[selected_pos.stop]);
    this.asteroids.add(asteroid);
  },
  killTheFucker: function(fucker, killer) {
    fucker.damage(1000);
    killer.damage(1);
    this.explode.play();
  },
  bombReady: function(){
    if(this.is_mobile){
      this.bomb_button.visible = true;
    }
    this.game_constants.player.bomb_ready += 5;
    this.bomb_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.ready_color));
    this.bomb_ready_text.visible = true;
    setTimeout(function(){this.bomb_ready_text.visible = false}.bind(this), 3000 );
  },
  fire_bomb: function(){
    if(this.is_mobile){
      this.bomb_button.visible = false;
    }
    this.player.bomb_readiness = 0;
    this.player.score += this.enemies.countLiving() * 50;
    this.pause_text.setText('KABOOOOOMMMMM!!!!');
    this.bomb_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.unavailable_color));
    this.bomb_explosion.play();
    this.pause_text.visible = true;
    this.enemies.forEachAlive(function(enemy){
      enemy.damage(1000);
    });
    this.player_score_text.setText("Puntaje: " + this.player.score);
    setTimeout(function(){this.pause_text.visible = false}.bind(this), 3000);
  }
};