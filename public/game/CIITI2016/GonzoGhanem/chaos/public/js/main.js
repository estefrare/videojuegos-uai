var Chaos = Chaos || {};

//initiate the Phaser framework
Chaos.game = new Phaser.Game(1400, 800, Phaser.AUTO);

Chaos.game.state.add('Game', Chaos.Game);
// Chaos.game.state.add('Level02', Chaos.Level02);
// Chaos.game.state.add('Level03', Chaos.Level03);
// Chaos.game.state.add('Level04', Chaos.Level04);
Chaos.game.state.start('Game');


function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}