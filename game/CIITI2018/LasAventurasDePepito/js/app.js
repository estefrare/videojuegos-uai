var resize = function(evt) {
  var canvas = document.getElementById('game');
  var canvasRatio = canvas.height / canvas.width;
  var windowRatio = window.innerHeight / window.innerWidth;
  var width;
  var height;

  if (windowRatio < canvasRatio) {
      height = window.innerHeight;
      width = height / canvasRatio;
  } else {
      width = window.innerWidth;
      height = width * canvasRatio;
  }

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
};
var load = function() {
  // resize();
  document.onclick = mouse.onClick
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
// window.onresize = resize;
