$( document ).ready(function() {
    var games2018 = [
      {
        name: 'game/CIITI2018/phantom',
        image: 'img/2018/phanton-chains.png',
        title: 'Phantom',
        color: '#EBC554'
      },
      {
        name: 'game/CIITI2018/SlimeOddysseyDemo',
        image: 'img/2018/slime.png',
        title: 'Slime Oddyssey',
        color: '#828CB8'
      },
      {
        name: 'game/CIITI2018/shuki',
        image: 'img/2018/shuki.png',
        title: 'Shuki',
        color: '#5C3B6C'
      },
      {
        name: 'game/CIITI2018/lostInTheAbysm',
        image: 'img/2018/lostInTheAbysm.png',
        title: 'Lost in the Abysm',
        color: '#233D8A'
      },
      {
        name: 'game/CIITI2018/LasAventurasDePepito',
        image: 'img/2018/LasAventurasDePepito.png',
        title: 'Las Aventuras de Pepito',
        color: '#7F9037'
      }
    ];
    var games2018Shufled = _.shuffle(games2018);
    var html = '';
    var arr;
    for (var i = 0; i < games2018Shufled.length; i++) {
      arr = [
      '<a class="game" href="'+games2018Shufled[i].name+'">',
        '<div class="titleContainer" style="background-color:' + games2018Shufled[i].color + '" >',
            '<h3 class="title">'+games2018Shufled[i].title+'</h1>',
        '</div>',
        '<img class="poster" src="'+games2018Shufled[i].image+'" alt>',
      '</a>',
      ];
      html += arr.join('\n');
    }
    $( '#gallery2018' ).append( html );
});
