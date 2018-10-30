var wall = {
  list: {},
  create: function(id, x, y, width, height) {
    wall.list[id] = {
      id: id,
      x: x,
      y: y,
      width: width,
      height: height,
      backgroundColor: '#f00',
      init: function() { },
      update: function() { },
      render: function() {
        game.context.fillStyle = this.backgroundColor;
        game.context.fillRect(this.x, this.y, this.width, this.height);
      }
    };
  }
};
