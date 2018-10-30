var moneda =
{
  x: 10800,
  y: 0,
  width: 30,
  height:2000 ,
  backgroundColor: '#FFFF00',
  direction: 'left',
  move: function()
  {
    if(this.direction == 'left')
    {
      this.x -= game.enemySpeed;
    }
  },
  init: function()
  {
  },
  update: function()
  {
    this.move();
  },
  render: function()
  {
    game.context.fillStyle = this.backgroundColor;
    game.context.fillRect(this.x, this.y, this.width, this.height);
  }
};
