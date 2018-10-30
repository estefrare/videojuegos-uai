var resize = function(evt)
{
  var canvas = document.getElementById('game');
  var w = window.innerWidth / canvas.width;
  var h = window.innerHeight / canvas.height;
  var scale = Math.min(h, w);
  canvas.style.width = (canvas.width * scale) + 'px';
  canvas.style.height = (canvas.height * scale) + 'px';
};

var load = function()
{
  resize();
  document.onkeydown = keyboard.press;
  document.onkeyup = keyboard.release;
  var canvas = document.getElementById('game');
  var data = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop,
    width: canvas.width,
    height: canvas.height,
    context: canvas.getContext('2d')
  };
  game.start(data);
};

window.onload = load;
window.onresize = resize;
