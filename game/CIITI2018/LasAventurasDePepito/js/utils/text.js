var text = {
  draw: function(str, color, fontSize, fontFamily, align, baseLine, x, y) {
    x = x || game.width/2;
    y = y || game.height/2;
    fontSize = fontSize || 30;
    fontFamily = fontFamily || 'monospace';
    game.context.fillStyle = color;
    game.context.font = fontSize+'px '+fontFamily;
    game.context.textAlign = align || 'center';
    game.context.textBaseline = baseLine || 'center';
    game.context.fillText(str, x, y);
  }
};
