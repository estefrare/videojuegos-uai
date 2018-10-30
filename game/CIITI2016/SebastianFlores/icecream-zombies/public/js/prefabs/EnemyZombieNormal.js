var MyGame = MyGame || {};

MyGame.EnemyZombieNormal = function(game, x, y, key, health, enemyBulletsGroup, enemySpeed, direction, scale, reward) {
  Phaser.Sprite.call(this, game, x, y, key);
  
  this.game = game;
  
  //enable physics
  //this.game.physics.arcade.enable(this);
  game.physics.arcade.enable(this);

  
  this.anchor.setTo(0.5);
  this.health = health;
  
  this.enemyBullets=this.game.add.group();
  //this.enemyBullets = enemyBulletsGroup;
  
  this.enemyTimer = this.game.time.create(false);
  this.enemyTimer.start();
  
  //this.scheduleShooting();

      this.body.collideWorldBounds=true;
      //"bounce" (factor de rebote) se basa en el coeficiente de restitución en física:
      this.body.bounce.set(0.1,0.6);

      //  This adjusts the collision body size to be a (1st atribute: width pixels) x (2nd actribute: height pixels) box.
      //  3rd atribute, is the X offset, and 4th is the Y offset of the newly sized box.
      this.body.setSize(32, 60, 12, 4);
      //this.body.velocity.x=10;
      //this.animations.add('walking',[0],4,false);
      this.animations.add('walkingLeft',[8,9,10,11],4,true);
      this.animations.add('walkingRight',[12,13,14,15],4,true);
      this.animations.add('getHit', [4, 5, 6, 7, 4], 12, false);
      this.animations.add('attack', [0, 1, 2, 3, 0], 4, false);
      this.state='walking';
      this.play('walking');
      //this.body.velocity.x=this.levelData.enemySpeed*1.2;
      this.enemySpeed=enemySpeed;
      this.body.velocity.x = this.enemySpeed*1.2;
      this.scaleFactor=scale;
      //this.scale.setTo(0.8,0.8);
      this.scale.setTo(scale,scale);
      this.anchor.set(0.5,0.5);
      this.health=health;
      this.direction=direction;
      this.reward=reward;
      this.attackPower=7;

      //para identificar el enemigo a la hora de reproducir sonidos:
      this.type="zombie";

      this.zombieWalk = this.game.add.audio('zombieWalk');
      this.zombieWalk.volume=0.2;

      this.zombieAttack1 = this.game.add.audio('zombieAttack1');
      this.zombieAttack1.volume=5;
      this.zombieAttack2 = this.game.add.audio('zombieAttack2');
      this.zombieAttack2.volume=13;

      this.zombieDie = this.game.add.audio('zombieDie');
      this.zombieDie.volume=1;
      this.zombiePain = this.game.add.audio('zombiePain');
      this.zombiePain.volume=0.3;

      this.rndCol=[];
      
      for(var x=0;x<=5;x++)
      {
        //this.rndNum[] = (Math.random(10)*10);
        this.rndNum = this.game.rnd.integerInRange(0, 15);

        if(this.rndNum===10)
        {
          this.rndNum='a';
        }
        if(this.rndNum===11)
        {
          this.rndNum='b';
        }
        if(this.rndNum===12)
        {
          this.rndNum='c';
        }
        if(this.rndNum===13)
        {
          this.rndNum='d';
        }
        if(this.rndNum===14)
        {
          this.rndNum='e';
        }
        if(this.rndNum===15)
        {
          this.rndNum='f';
        }
        this.rndCol[x]=this.rndNum;
      }
      this.tint='0x'+this.rndCol[0]+this.rndCol[1]+this.rndCol[2]+this.rndCol[3]+this.rndCol[4]+this.rndCol[5];


};

MyGame.EnemyZombieNormal.prototype = Object.create(Phaser.Sprite.prototype);
MyGame.EnemyZombieNormal.prototype.constructor = MyGame.EnemyZombieNormal;


//Phaser recorre todos sus objetos y automáticamente ejecuta la función "update" si es
//que tienen alguna:
MyGame.EnemyZombieNormal.prototype.update = function() {

  if(this.attacking){
    this.body.velocity.x=0;
    //this.body.immovable=true;
  }
  if(this.body.velocity.x>this.enemySpeed)
  {
    this.body.velocity.x=this.enemySpeed;
  }
  else if(this.body.velocity.x<-this.enemySpeed)
  {
    this.body.velocity.x=-this.enemySpeed;
  }


  /*
  //bounce on the borders
  if(this.position.x < 0.05 * this.game.world.width) {
    this.position.x = 0.05 * this.game.world.width + 2;
    this.body.velocity.x *= -1;
  }
  else if(this.position.x > 0.95 * this.game.world.width) {
    this.position.x = 0.95 * this.game.world.width - 2;
    this.body.velocity.x *= -1;
  }

  //kill if off world in the bottom
  if(this.position.y > this.game.world.height) {
    this.kill();
  }
  

  if(this.animations.currentAnim.name==='getHit' || this.state==='getHit'){

  }
  else
  {
    if(this.body.velocity.x>0){
    this.animations.play('walkingRight');   
    this.direction=1;
    }
    else
    {
      this.animations.play('walkingLeft'); 
      this.direction=-1; 
    }
  }
*/
  if(this.animations.currentAnim.name==='walking' || this.state==='walking'){
    if(this.body.velocity.x>0){

    this.animations.play('walkingRight');   
    this.direction=1;
    this.body.velocity.x = (this.enemySpeed*1.2);
    }
    else
    {
      
      this.animations.play('walkingLeft'); 
      this.direction=-1; 
      this.body.velocity.x = -(this.enemySpeed*1.2);
    }

    if(!this.zombieWalk.isPlaying)
    {
      this.zombieWalk.play();
    }
    
  }
  else
  {
    //si hay otra animación que se terminó de animar (que sea distinto a las de "walking")
    //como por ej. la animación de daño "getHit":
    if(this.animations.currentAnim.isFinished)
    {
      this.enemyTimer.destroy();
      this.state='walking';
      this.attacking=false;
      this.body.enable=true;
      //this.immovable=false;

    }
  }
  
};

//esta función recibe como parámetro la cantidad de daño (amount)
MyGame.EnemyZombieNormal.prototype.damage = function(amount,playerDirection,lookAT,game) {
  this.state='getHit';
  this.animations.play('getHit');
  Phaser.Sprite.prototype.damage.call(this, amount,playerDirection,lookAT);
  //play "getting hit" animation
  
  //this.health-=amount;

/*
  if(playerDirection<0)
  {
    this.body.x-=10;
    //this.body.velocity.x*=playerDirection
  }
  else
  {
    this.body.x+=10;
    //this.body.velocity.x*=playerDirection
  }
  */
  

  if(lookAT='left' && this.direction>0)
  {
    //this.scale.setTo(this.scaleFactor,this.scaleFactor);

    //this.direction=-1;
    this.body.velocity.x*=(-playerDirection);
    //this.body.velocity.x*=(-this.direction);
    this.body.x+=(5*playerDirection);
  }
  else if(lookAT='right' && this.direction<0)
  {
    //this.scale.setTo(this.scaleFactor,this.scaleFactor);
    //this.direction=-1;
    this.body.velocity.x*=(playerDirection);
    this.body.x+=(5*playerDirection);
  }
  
  var emitter = this.game.add.emitter(this.x, this.y, 3);
    emitter.makeParticles('snow');
    emitter.minParticleSpeed.setTo(-50, -300);
    emitter.maxParticleSpeed.setTo(50, 50);
    emitter.setRotation(0, 359);
    emitter.setAlpha(1, 0.1, 1000);
    emitter.setScale(1, 0.2, 1, 0.2, 1000, Phaser.Easing.Quintic.Out);
    emitter.gravity = -500;

    emitter.forEach(function(particle) {  
    // tint every particle  
        particle.tint = 0x00ffaa;
    });

    emitter.start(true, 1000, null, 3);

    //reproducir sonido de daño:
    this.zombiePain.play();

  //particle explosion
  if(this.health <= 0) {

    //var createColorImage = function(game, source, color="#ffffff") {
    /*var createColorImage = function(game, source, color="#ffffff") {
      var color = Phaser.Color.hexToColor(color);
      return game.make.image(0, 0, game.add.bitmapData(source.width, source.height).fill(color.r, color.g, color.b,blendDestinationAtop().draw(source, 0, 0, source.width,  source.height)));
    };
    
    var createColorImage = function(game=this.game, source='snow', color="#ffffff") {  
    var color = Phaser.Color.hexToColor(color);        
    return game.make.sprite(0, 0, game.add.bitmapData(source.width, source.height).fill(color.r, color.g, color.b).blendDestinationAtop().draw(source, 0, 0, source.width, source.height));
    };
    */
    //var spriteEmitter = createColorImage;
    //this.load.image('spriteEmitter', createColorImage);
    //var spriteEmitter = this.game.add.sprite(0, 0, createColorImage);

    //var chaos = game.make.sprite(0, 0, 'chaos');

  	//el 100 al hacer add.emitter (3er parámetro) indica la cantidad máxima de partículas
    var emitter = this.game.add.emitter(this.x, this.y, 15);
    //emitter.makeParticles(createColorImage);
    emitter.makeParticles('snow');
    emitter.minParticleSpeed.setTo(-200, -300);
    emitter.maxParticleSpeed.setTo(200, 50);
    emitter.setRotation(0, 359);
    emitter.setAlpha(1, 0.1, 1000);
    emitter.setScale(1, 0.2, 1, 0.2, 1000, Phaser.Easing.Quintic.Out);
    emitter.gravity = -500;
    
    emitter.forEach(function(particle) {  
    // tint every particle  
        particle.tint = 0x00ffaa;
    });

    emitter.start(true, 1000, null, 15);
	//1er parámetro: "explode"
	//si es true, explota a alta velocidad al crearse.
	//2do parámetro: "lifeSpan"
  	//indica cuantos milisegundos va a vivir cada partícula
  	//3er parámetro: ""
  	//4to parámetro: ""
  	//indica la cantidad de partículas

    this.zombiePain.stop();
    //reproducir sonido de muerte:
    this.zombieDie.play();
  	this.kill();
  }
};

MyGame.EnemyZombieNormal.prototype.scheduleAttack = function() {

  if(this.state="attacking"){
    this.attack();
    //this.attacking=true;
    if(this.attacking=true){
      if(!this.enemyTimer)
      {
        this.enemyTimer.add(Phaser.Timer.SECOND * 1.2, this.scheduleAttack, this);
      }
      
    }
    
  }
};

MyGame.EnemyZombieNormal.prototype.attack = function() {
  this.animations.play("attack");
  this.state="attacking";


  //var rndSound = Math.floor((Math.random() * 10)+1);

  var rndSound = (Math.random(10)*10);
  if (rndSound<=5)
  {
    this.zombieAttack1.play();
  }
  else
  {
    this.zombieAttack2.play();
  }
  
  //this.body.enable=false;
  //this.state="walking";
};




MyGame.EnemyZombieNormal.prototype.scheduleShooting = function() {
  //var y = this.position.y;
  this.shoot();
  
  this.enemyTimer.add(Phaser.Timer.SECOND * 0.2, this.scheduleShooting, this);
};

MyGame.EnemyZombieNormal.prototype.shoot = function() {
  //var bullet = null;
  var bullet =this.enemyBullets.getFirstExists(true);
  

  if(!bullet) {

    if(this.direction!=0)
    {
      //bullet = new MyGame.EnemyBulletZombieNormal(this.game, this.x, this.bottom);

      //bullet = new MyGame.EnemyBulletZombieNormal(this.game, this.x, this.y+(this.body.height/16)+0);
      bullet = new MyGame.EnemyBulletZombieNormal(this.game, this.x, this.y+(this.body.height/16)-2000);
      bullet.visible=false;
      //bullet = new MyGame.EnemyBulletZombieNormal(this.game, x, (this.body.height)/2);
      //bullet.enableBody = true;
      //bullet.body.velocity.x = 100;
      //bullet.body.gravity.set(0, 0-1000);
      this.game.physics.arcade.enable(bullet);
      bullet.body.enable=true;
      bullet.checkWorldBounds = true;
      bullet.outOfBoundsKill = true;
      bullet.lifespan=5000;
      this.enemyBullets.add(bullet);
    
      bullet.visible=true;
      bullet.y=(this.y+(this.body.height/16)+0);
      this.enemyBullets.setAll('body.velocity.x',200*this.direction);
      this.enemyBullets.setAll('body.allowGravity',false);
    }
    
    
  }
  else {
    //bullet.visible=false;
    //bullet.reset(this.x, this.y);
    //bullet.kill;
  }
  if(!bullet) {
    //bullet.body.velocity.x = 100;
  }
};