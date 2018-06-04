$( document ).ready(function() {
    var games2017 = [
      {
        name: 'game/CIITI2017/carrera-ciiti',
        image: 'img/2017/carrera.png',
        title: 'Carrera CIITI',
        color: '#EBC554'
      },
      {
        name: 'game/CIITI2017/insanity-infiltration',
        image: 'img/2017/infiltration.png',
        title: 'Insanity infiltration',
        color: '#828CB8'
      },
      {
        name: 'game/CIITI2017/servicio-a-tiempo',
        image: 'img/2017/tiempo.png',
        title: 'Servicio a tiempo',
        color: '#5C3B6C'
      },
      // {
      //   name: 'game/CIITI2017/hora-de-correr',
      //   image: 'img/2017/alarma.png',
      //   title: 'Hora de correr'
      //
      // }
    ];
    var games2017Shufled = _.shuffle(games2017);
    var html = '';
    var arr;
    for (var i = 0; i < games2017Shufled.length; i++) {
      arr = [
      '<a class="game" href="'+games2017Shufled[i].name+'">',
        '<div class="titleContainer" style="background-color:' + games2017Shufled[i].color + '" >',
            '<h3 class="title">'+games2017Shufled[i].title+'</h1>',
        '</div>',
        '<img class="poster" src="'+games2017Shufled[i].image+'" alt>',
      '</a>',
      ];
      html += arr.join('\n');
    }
    $( '#gallery2017' ).append( html );
});
