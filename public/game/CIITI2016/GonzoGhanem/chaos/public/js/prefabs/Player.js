var Chaos = Chaos || {};

Chaos.Player = function(game, x, y, key, controls) {
  Phaser.Sprite.call(this, game, x, y, key);
  
  this.game = game;
  
  this.anchor.setTo(0.5, 0.5);
  this.angle = -90;
  this.health = 100;
  this.game.physics.arcade.enable(this.player);
  this.enableBody = true;
  this.body.collideWorldBounds = true;
  this.selected_weapon = 'basic';
  this.is_turbo = false;
  this.score = 0;
  this.bomb_readiness = 0;

  this.controls = controls;
  
};

Chaos.Player.prototype = Object.create(Phaser.Sprite.prototype);
Chaos.Player.prototype.constructor = Chaos.Player;

Chaos.Player.prototype.update = function() {
  if(this.controls.shoot.isDown) {
    this.shoot();
  }
  if(this.controls.basic.isDown) {
    this.selected_weapon = 'basic';
    this.basic_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.selected_color));
    this.machine_gun_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.unselected_color));
  }
  if(this.controls.bomb.isDown) {
    this.fire_bomb();
  }
  if(this.controls.machine_gun.isDown) {
    this.selected_weapon = 'machine_gun';
    this.machine_gun_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.selected_color));
    this.basic_weapon_text.setStyle(this.getTextStyle(this.game_constants.weapons.unselected_color));
  }

  this.body.angularVelocity = 0;
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  if (this.cursors.left.isDown)
  {
    this.body.angularVelocity = -200;
  }
  else if (this.cursors.right.isDown)
  {
    this.body.angularVelocity = 200;
  }

  if (this.cursors.up.isDown && this.controls.turbo.isDown)
  {
    this.is_turbo = true;
    this.turbo_text.setStyle(this.getTextStyle(this.game_constants.weapons.selected_color));
    this.game.physics.arcade.velocityFromAngle(this.angle, this.game_constants.player.turbo_speed, this.body.velocity);
  } else if (this.cursors.up.isDown) {
    this.is_turbo = false;
    this.game.physics.arcade.velocityFromAngle(this.angle, this.game_constants.player.speed, this.body.velocity);
  }
  if (this.cursors.down.isDown) {
    this.is_turbo = false;
    this.game.physics.arcade.velocityFromAngle(this.angle, - this.game_constants.player.speed, this.body.velocity);
  }
  if(!this.is_turbo){
    this.turbo_text.setStyle(this.getTextStyle(this.game_constants.weapons.unselected_color));
  }
};

