var Hallucination = Hallucination || {};

//initiate the Phaser framework
Hallucination.game = new Phaser.Game(1420, 700, Phaser.AUTO);

Hallucination.game.state.add('GameState', Hallucination.GameState);
Hallucination.game.state.start('GameState');  