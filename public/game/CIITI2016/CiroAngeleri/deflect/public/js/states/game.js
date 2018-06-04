var Deflect = Deflect || {};


Deflect.GameState = {
  XDown:null,
  YDown:null,
  XUp:null,
  YUp:null,
  maxLines:2,
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //Activamos la fisica en el juego
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 85;


  },
  preload: function() {
    //Cargamos imagenes
    this.load.image('background', 'assets/images/ville.png');
    this.load.image('line', 'assets/images/line.png');
    this.load.image("proyectile", "assets/images/bomb.png")
    this.load.image("particle", "assets/images/proyectile.png")

  },
  create: function() {

   this.game.world.setBounds(0, 0, 360, 650);
   //Captura el input del mouse
   this.input.mouse.capture = true;
   this.background = this.game.add.sprite(0, 0, 'background');
   //Activa input en el Bg
   this.background.inputEnabled = true;

   //EVENTOS
   //Input Down
   this.background.events.onInputDown.add(this.getXYDown.bind(this));
   //Input Up
   this.background.events.onInputUp.add(this.getXYUp.bind(this));

   //GRUPOS
   this.lines = this.add.group();
   this.proyectiles = this.add.group();
   //SPRITES SUELTOS
   this.city = this.game.add.sprite(0, 420)
   this.city.scale.setTo(720, 1)
   this.game.physics.p2.enable(this.city, false)
   this.city.body.static = true;
   this.lives = 3;
   this.vidas = this.game.add.text(300, 1, "VIDAS: " + this.lives, {
    font:"bold 12px Arial"
   })
   //INTERVALO DE PROYECTILES
   this.game.time.events.loop(1000, this.fireProyectiles.bind(this, this.vidas));


    this.game.physics.p2.setImpactEvents(true);
    //Fuerza de rebote?
    this.game.physics.p2.restitution = 1.7;

    //  Create our collision groups. One for the player, one for the pandas
    Deflect.lineCollisionGroup = this.game.physics.p2.createCollisionGroup();
    Deflect.proyectileCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.city.body.setCollisionGroup(Deflect.lineCollisionGroup)
    this.city.body.collides(Deflect.proyectileCollisionGroup, function (city, proyectile) {
      //console.log(city, proyectile.die, proyectile.sprite.kill)
      proyectile.sprite.dieFloor()
      
    })

    //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.

    //this.game.physics.p2.updateBoundsCollisionGroup();
    this.lines.enableBody = true;
    this.lines.physicsBodyType = Phaser.Physics.P2JS;
    this.proyectiles.enableBody = true;
    this.proyectiles.physicsBodyType = Phaser.Physics.P2JS;

  },
  update: function() {
    //this.game.physics.p2.collide(this.lines, this.proyectiles, function(){console.log()})
    this.getXYNow();


    /*var line = new Phaser.Line(this.XDown, this.YDown, this.XNow, this.YNow);
    var myLine = this.game.add.sprite(this.XDown,this.YDown, "line")
    myLine.scale.setTo(line.length, 3);
    myLine.angle = line.angle * (180/Math.PI);*/
    
  },
  fireProyectiles:function () {

    var proyectile = this.proyectiles.getFirstExists(false)
    if (!proyectile) {
      proyectile = new Deflect.Proyectile(this.game);
      this.proyectiles.add(proyectile)
    }
    else{

      proyectile.reset(this.game.rnd.integerInRange(5,this.game.width - 5), 5)
    }
  },
  getXYDown: function () {
    this.XDown = this.input.x
    this.YDown = this.input.y
  },
  getXYUp:function () {
    this.XUp = this.input.x
    this.YUp = this.input.y
    
    //Dibujar una linea
    if(this.lines.total > 1) return;
    var line = this.lines.getFirstExists(false)
    if (!line) {
      line = new Deflect.Line(this.game, this.XDown, this.YDown, this.XUp, this.YUp, 60);
      this.lines.add(line)

    }
    else{
      line.reset(this.XDown, this.YDown)
      line.draw(this.XDown, this.YDown, this.XUp, this.YUp, 60)
    }
    //---------------------------------------------

  },

  getXYNow:function () {
    this.XNow = this.input.mousePointer.x
    this.YNow = this.input.mousePointer.y
    },

   render: function() {


    this.lines.forEachAlive(
      function(line)
        {
        this.game.debug.body(line);
        }, this
    );


  }
};
