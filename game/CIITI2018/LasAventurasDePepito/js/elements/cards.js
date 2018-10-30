var cards = {
  list: {},
  lastChoose: undefined,
  waiting: false,
  create: function(id, x, y, width, height, group) {
    cards.list[id] = {
      id: id,
      x: x,
      y: y,
      group: group,
      width: width,
      height: height,
      selected: false,
      backgroundColor: '#fa0',
      image: new Image(),
      init: function() {
        this.image.src = 'img/DorsoCartas.jpg';
      },
      checkClick: function () {
        if(!cards.waiting) {
          if(this.x < mouse.x
          && mouse.x < (this.x + this.width)
          && this.y < mouse.y
          && mouse.y < (this.y + this.height)) {
            this.selected = true;
            game.intentos++
            if(cards.lastChoose) {
              if(cards.lastChoose.group === this.group
                && cards.lastChoose !== this) {
                this.flip()
                cards.waiting = true
                setTimeout(this.destroy.bind(this), 500)
              }
              else{
                this.flip()
                cards.waiting = true
                setTimeout(this.unflip.bind(this), 500)
              }
            }
            else {
              cards.lastChoose = this
              this.flip()
            }
            mouse.reset()
          }
        }
      },
      unflip: function(){
        cards.list[cards.lastChoose.id].image.src = 'img/DorsoCartas.jpg'
        cards.list[cards.lastChoose.id].selected = false;
        this.selected = false;
        cards.lastChoose = undefined;
        this.image.src = 'img/DorsoCartas.jpg';
        cards.waiting = false
      },
      flip: function(){
        switch (this.group) {
          case 'A':
          this.image.src = 'img/pelota_voley.png';
            break;
          case 'B':
          this.image.src = 'img/Pelota_Tenis.png';
            break;
          case 'C':
          this.image.src = 'img/Pelota_Futbol.png';
            break;
          case 'D':
          this.image.src = 'img/Pelota_Basquet.png';
              break;
          case 'E':
          this.image.src = 'img/Pelota_Bowling.png';
              break;
          case 'F':
          this.image.src = 'img/Pelota_Golf.png';
              break;
          case 'G':
          this.image.src = 'img/Pelota_Bola8.png';
              break;
          case 'H':
          this.image.src = 'img/Pelota_Baseball.png';
              break;
          case 'I':
          this.image.src = 'img/Pelota_FAmericano.png';
              break;
          case 'J':
          this.image.src = 'img/Pelota_Badmintong.png';
              break;
        }
        this.backgroundColor = '#CCCCFF'
      },
      destroy: function(){
        var i = game.dynamicList.indexOf(cards.list[cards.lastChoose.id])
           game.dynamicList.splice(i, 1)
        delete cards.list[cards.lastChoose.id]
        var i = game.dynamicList.indexOf(cards.list[this.id])
          game.dynamicList.splice(i, 1)
        delete cards.list[this.id]
        cards.lastChoose = undefined
        cards.waiting = false
      },
      update: function() {
        this.checkClick()
       },
      render: function() {
        game.context.fillStyle = this.backgroundColor;
        game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    };
  }
};
