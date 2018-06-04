var enemy =
{
  list: {},
  create: function( id,x, y, width, height,direction)
  {
    enemy.list[id] =
    {
      id: id,
      x: x,
      y: y,
      width: width,
      height: height,
      direction: direction,
      backgroundColor: '#26F',
      image: new Image(),
      checkCollision: function()
      {
        var i, collisionSide, hasCollisionBottom = false;
        for (i = 0; i < game.elements.length; i++)
        {
          collisionSide = collision.boxesSide(enemy, game.elements[i]);
          if(collisionSide)
          {
            if(collisionSide === 'left' && this.direction == 'left')
            {
            }
          }
        }
      },
      move: function()
      {
        if(this.direction == 'left')
        {
          this.x -= game.enemySpeed;
        }
      },
      fixNumbers: function()
      {
        if(typeof this.x === 'number') this.x = Math.round(this.x * 100) / 100;
        if(typeof this.y === 'number') this.y = Math.round(this.y * 100) / 100;
      },
      init: function()
      {
        this.image.src = 'img/trampa.png';
      },
      update: function()
      {
        this.fixNumbers();
        this.move();
        this.checkCollision();
      },
      render: function()
      {
        game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      },
    };
  }
};
