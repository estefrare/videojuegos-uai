 var MyGame = MyGame || {};

//MyGame.Weapon = {};
MyGame.Weapon = {};
    ////////////////////////////////////////////////////
    //  A single bullet is fired in front of the player //
    ////////////////////////////////////////////////////
    MyGame.Weapon.SingleBullet = function (game) {

        Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
        this.nextFire = 0;
        this.bulletSpeed = 300;
        this.fireRate = 500;
        for (var i = 0; i < 50; i++)
        {
            //this.add(new MyGame.Bullet(game, 'bullet5'), true);
            //this.add(new MyGame.Bullet(game, 'bullet'), true);   
            var newBullet = this.add(new MyGame.Bullet(game, 'bullet'), true);        }
        return this;
    };

    MyGame.Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
    MyGame.Weapon.SingleBullet.prototype.constructor = MyGame.Weapon.SingleBullet;

    MyGame.Weapon.SingleBullet.prototype.fire = function (source,direction) {
        if (this.game.time.time < this.nextFire) { return; }
        var x = source.x + 30*direction;
        var y = source.y - 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed*direction, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
        
    };





    
    ////////////////////////////////////////////////////
    //  Baseball Bat melee weapon //
    ////////////////////////////////////////////////////
    MyGame.Weapon.BaseballBat = function (game) {

        Phaser.Group.call(this, game, game.world, 'Baseball Bat', false, true, Phaser.Physics.ARCADE);
        this.nextFire = 0;
        this.bulletSpeed = 0;
        this.fireRate = 500;
        for (var i = 0; i < 50; i++)
        {
            //this.add(new MyGame.Bullet(game, 'bullet5'), true);
            this.add(new MyGame.MeleeAttack(game, ''), true);
            //game.player.play('meleeAttacking');
        }
        return this;
    };

    MyGame.Weapon.BaseballBat.prototype = Object.create(Phaser.Group.prototype);
    MyGame.Weapon.BaseballBat.prototype.constructor = MyGame.Weapon.BaseballBat;
    MyGame.Weapon.BaseballBat.prototype.fire = function (source,direction,currentWeapon) {
        if (this.game.time.time < this.nextFire) { return; }
        var x = source.x + 10*direction;
        var y = source.y + 0;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed*direction, 0, 0,currentWeapon);
        this.nextFire = this.game.time.time + this.fireRate;
        
    };