 var MyGame = MyGame || {};

 //BULLET objeto BULLET objeto BULLET objeto BULLET
 //************************************************
  MyGame.Bullet = function (game, key) {
        Phaser.Sprite.call(this, game, 0, 0, key);
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.anchor.set(0.5);
        this.scale.setTo(0.3,0.3);
        //.scale.x=0.3;
        //this.scale.y=0.3;
        //this.checkWorldBounds = true;
        //this.outOfBoundsKill = true;
        //this.bulletLifespan = 100;
        //this.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.exists = false;
        this.tracking = false;
        this.scaleSpeed = 0;
    };
    MyGame.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    MyGame.Bullet.prototype.constructor = MyGame.Bullet;
    MyGame.Bullet.prototype.fire = function (x, y, angle, speed, gx, gy,currentWeapon) {
        gx = gx || 0;
        gy = gy || 0;
        this.reset(x, y);
        this.scale.set(1.5);

          this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
        
        this.angle = angle;
        //gravedad gy para que siga recto:
        this.body.gravity.set(gx, gy-1000);
        //seteo el tiempo que tarda (en ms.) en desaparecer (kill) el proyectil Bullet:

        if(currentWeapon===1){
            this.lifespan=10;
        }
        else{
            this.lifespan=1500;
        };
        
    };
    MyGame.Bullet.prototype.update = function () {
        if (this.tracking)
        {
            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
        }
        if (this.scaleSpeed > 0)
        {
            this.scale.x += this.scaleSpeed;
            this.scale.y += this.scaleSpeed;
            
        }
        this.scale.x=0.4;
        this.scale.y=0.4;
    };