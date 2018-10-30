var player = {
  x: 100,
  y: 0,
  width: 30,
  height: 40,
  backgroundColor: '#0C0',
  speed: 3,
  jumpForce: null,
  maxJumpForce: 10,
  score: 0,
  move: function() {
    //move left and right
    if(keyboard.left) {
      this.x -= this.speed;
    } else if(keyboard.right) {
      this.x += this.speed;
    }
    //jump
    if(typeof this.jumpForce === 'number') {
      //console.log(this.jumpForce, -this.maxJumpForce, this.jumpForce >= -this.maxJumpForce);
      if(this.jumpForce >= -this.maxJumpForce) {
        this.y -= this.jumpForce;
        this.jumpForce -= 0.2;
      } else {
        this.jumpForce = null;
      }
    }
  },
  checkJump: function() {
    if(keyboard.up && this.jumpForce === null) {
      this.jumpForce = this.maxJumpForce;
    }
  },
  fixNumbers: function() {
    if(typeof this.x === 'number') this.x = Math.round(this.x * 100) / 100;
    if(typeof this.y === 'number') this.y = Math.round(this.y * 100) / 100;
    if(typeof this.jumpForce === 'number') this.jumpForce = Math.round(this.jumpForce * 100) / 100;
  },
  init: function() {
    this.y = wall.list['bottom'].y - this.height;
  },
  update: function() {
    this.fixNumbers();
    this.checkJump();
    this.move();
  },
  render: function() {
    game.context.fillStyle = this.backgroundColor;
    game.context.fillRect(this.x, this.y, this.width, this.height);
  }
};
