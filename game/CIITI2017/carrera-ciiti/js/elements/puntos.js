var puntos =
{
  x: 0,
  y: 0,
  backgroundColor: '#0C0',
  score: 0,
  init: function()
  {
  },
  update: function()
  {
    if(this.score < 500) {
      this.score += 1;
      game.enemySpeed = 3;
    } else if(this.score < 1200) {
      this.score += 3;
      game.enemySpeed = 4;
    } else if(this.score < 1800) {
      this.score += 5;
      game.enemySpeed = 5;
    } else {
      this.score += 10;
      game.enemySpeed = 8;
    }
  },
  render: function()
  {
    text.draw('Puntos '+this.score, '	#000000', 30, 'monospace', 'center', 'center', 100, 100);
  }
};
