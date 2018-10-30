var PoligonosDeLaMuerte = PoligonosDeLaMuerte || {};

PoligonosDeLaMuerte.EnemyNormal = function(game, x, y, health,speed,target,collisionLayer) {
	Phaser.Sprite.call(this, game, x, y, 'zombie1');
    this.anchor.setTo(0.5);
    this.scale.setTo(0.5);
    this.game.physics.arcade.enable(this);
    this.game=game;
    this.player=target;
    this.target={'x':target.x,'y':target.y};
    this.collisionLayer = collisionLayer;
    this.health = health;
    this.MAX_SPEED = speed; // pixels/second
    this.MIN_DISTANCE_PLAYER = 10; // pixel
    this.MIN_DISTANCE_HAMBURGER = 100; // pixel
    //this.body.setSize(175,175,50,75);
    this.haveHamburger=false;
    this.playerDistance=0;
    this.hamburgerDistance=0;
    this.borders=this.game.borders;
    this.targets={};
    this.destroyFlag=false;
    
    this.getClosestTarget();
}

PoligonosDeLaMuerte.EnemyNormal.prototype = Object.create(Phaser.Sprite.prototype);
PoligonosDeLaMuerte.EnemyNormal.prototype.constructor = PoligonosDeLaMuerte.EnemyNormal;


PoligonosDeLaMuerte.EnemyNormal.prototype.update = function() {
    if(this.game.playerAlive){
         if(!this.destroyFlag){
             if(!this.haveHamburger){
             this.game.physics.arcade.collide(this, this.collisionLayer);
         }else{
             this.game.physics.arcade.collide(this, this.collisionLayer,this.destroyEnemy.bind(this));
         }
        
        if(this.haveHamburger){
            var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);  
            var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);
            this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
            this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
            this.rotation = rotation;
        }
        else{
            if(this.target.obj.alive){
                this.game.physics.arcade.collide(this, this.target.obj,this.getClosestBorder.bind(this));
                var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);
                if (distance > this.MIN_DISTANCE_PLAYER) {
                    var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);
                    this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
                    this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
                    this.rotation = rotation;
                }else{
                    this.body.velocity.setTo(0, 0);
                }
            }else{
                this.getClosestTarget();
            }
        }}
        else{
            this.destroy();
        }
    }else{
        this.body.velocity.setTo(0, 0);
    }
};

PoligonosDeLaMuerte.EnemyNormal.prototype.getDistanceLinePoint= function(x, y, x1, y1, x2, y2) { 
  
   
  //{'x':dx,'y':dy,'distance':Math.sqrt(dx * dx + dy * dy)}
     
    //return g;
}

PoligonosDeLaMuerte.EnemyNormal.prototype.destroyEnemy = function(){
this.game.time.events.add(100, function() {
       this.destroyFlag=true;
    }, this);    
}


PoligonosDeLaMuerte.EnemyNormal.prototype.getClosestTarget= function(){
    //Calcular distancia entre el enemigo y el personaje
    //Calcular distancia entre el enemigo y las hamburguesas
    //La distancia mas corta, se convierte en el proximo target
    
    
    var player_distance = this.game.math.distance(this.x, this.y, this.player.x, this.player.y);
    var distances = [];
    var minDis=99999999999999999999;
    var target = this.target;
    target.obj=this.player;    
    
    if(this.game.hamburgers.children.length>0){
        this.game.hamburgers.forEach(function(h,i){
            var dis=this.game.math.distance(this.x, this.y, h.x, h.y);
            distances.push({"obj":h,"distance":dis});
        }.bind(this));
        distances.forEach(function(d){
            if(!d.obj.isFollowed){
            if(d.distance<minDis){
                minDis=d.distance;
                target.x=d.obj.x;
                target.y=d.obj.y;
                target.obj=d.obj;
                d.obj.isFollowed = true;
            }
            }
        });
        if(this.game.physics.arcade.distanceBetween(this,this.player)>minDis){
           this.target=target;
        }
    }    
}


PoligonosDeLaMuerte.EnemyNormal.prototype.damage = function(amount) {
  
  this.health -= amount;
    
  if(this.health <= 0) {
    var emitter = this.game.add.emitter(this.x, this.y, 50);
    emitter.makeParticles('particulaSangre')
    emitter.minParticleSpeed.setTo(-50, -50);
    emitter.maxParticleSpeed.setTo(50, 50);
    emitter.gravity = 0;
    emitter.start(true, 250, null, 100);
    if(this.haveHamburger){
        var hamb= new PoligonosDeLaMuerte.Hamburgers(this.game,this.x,this.y);
        this.game.hamburgers.add(hamb);
        this.player.addScore(this.game.POINT_ENEMY_W_HAMB)
    }else{
        this.player.addScore(this.game.POINT_ENEMY_WO_HAMB)
    }
    
    this.destroy();
  }
};


PoligonosDeLaMuerte.EnemyNormal.prototype.getClosestBorder = function(y,h) {
    /*var betterDistanceIndex=0;
    var i = 0;
    var betterDistanceValue=9999999999999;
    var distances = [];
    var minDis=99999999999999999999;
    var target = this.target;
    
    
    */
    if(h!== undefined)h.destroy();
    this.loadTexture('zombie2', 0, false);
    this.haveHamburger=true;
    var goToPoint={'x':this.borders.xm,'y':this.borders.ym};
    var spawnArea = this.game.rnd.integerInRange(0, 3);
    switch(spawnArea) {
                case 0:
                    goToPoint.x=this.borders.xm;
                    goToPoint.y=this.game.rnd.realInRange(this.borders.ym, this.borders.yM);
                    break;
                case 1:
                    goToPoint.x=this.game.rnd.realInRange(this.borders.xm, this.borders.xM);
                    goToPoint.y=this.borders.yM;
                    break;
                case 2:
                    goToPoint.x=this.borders.xM;
                    goToPoint.y=this.game.rnd.realInRange(this.borders.ym, this.borders.yM);
                    break;
                case 3:
                    goToPoint.x=this.game.rnd.realInRange(this.borders.xm, this.borders.xM);;
                    goToPoint.y=this.borders.yM;
                    break;
                default:
    }
     this.target=goToPoint;
    
    /*
    console.log(this.collisionLayer)
      this.collisionLayer.forEach(function(h,i){
            var dis=this.game.math.distance(this.x, this.y, h.x, h.y);
            distances.push({"obj":h,"distance":dis});
        }.bind(this));
        distances.forEach(function(d){
            if(d.distance<minDis){
                minDis=d.distance;
                target.x=d.obj.x;
                target.y=d.obj.y
            }
            
        });
    
   
         */    
};



PoligonosDeLaMuerte.EnemyBoss = function(game, x, y, health,speed,target,collisionLayer) {
	Phaser.Sprite.call(this, game, x, y, 'zombie1');
    this.anchor.setTo(0.5);
    this.scale.setTo(1.1);
    this.game.physics.arcade.enable(this);
    this.game=game;
    this.player=target;
    this.target={'x':target.x,'y':target.y};
    this.collisionLayer = collisionLayer;
    this.health = health;
    this.MAX_SPEED = speed; // pixels/second
    this.MIN_DISTANCE_PLAYER = 10; // pixel
    //this.body.setSize(175,175,50,75);
}

PoligonosDeLaMuerte.EnemyBoss.prototype = Object.create(Phaser.Sprite.prototype);
PoligonosDeLaMuerte.EnemyBoss.prototype.constructor = PoligonosDeLaMuerte.EnemyBoss;


PoligonosDeLaMuerte.EnemyBoss.prototype.update = function() {
    if(this.game.playerAlive){
        this.game.physics.arcade.collide(this, this.collisionLayer);
        this.target={'x':this.player.x,'y':this.player.y,'distance':0};
        var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);
        if (distance > this.MIN_DISTANCE_PLAYER) {
            var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);
            this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
            this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
            this.rotation = rotation;
        }else{
            this.body.velocity.setTo(0, 0);
        }
    }else{
        this.body.velocity.setTo(0, 0);
    }
};

PoligonosDeLaMuerte.EnemyBoss.prototype.damage = function(amount) {
  
  this.health -= amount;
    
  if(this.health <= 0) {
    var emitter = this.game.add.emitter(this.x, this.y, 50);
    emitter.makeParticles('particulaSangre')
    emitter.minParticleSpeed.setTo(-50, -50);
    emitter.maxParticleSpeed.setTo(50, 50);
    emitter.gravity = 0;
    emitter.start(true, 250, null, 100);
    this.player.addScore(this.game.POINT_ENEMY_BOSS)
    this.destroy();
  }
};
