var mouse = {
  x: 0,
  y: 0,
  onClick: function (evt) {
    mouse.x = evt.clientX
    mouse.y = evt.clientY
  },
  reset: function () {
    mouse.x = 0
    mouse.y = 0
  },
};
