var keyboard = {
  up: false,
  left: false,
  right: false,
  p: false,
  press: function(evt) {
    var key = keyboardEnum[evt.code];
    if(key) {
      keyboard[key] = true;
    }
  },
  release: function(evt) {
    var key = keyboardEnum[evt.code];
    if(key) {
      keyboard[key] = false;
    }
  }
};
var keyboardEnum = {
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyP: 'p'
};
