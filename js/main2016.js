$( document ).ready(function() {
    var games2016 = [
      {
        name: 'game/CIITI2016/CiroAngeleri/deflect/public',
        image: 'img/2016/deflect.png',
        title: 'Deflect',
        color: '#EBC554'
      },
      {
        name: 'game/CIITI2016/DavidCurras/veggie-zombie/public',
        image: 'img/2016/zombie1.png',
        title: 'Zombie vs Veggies',
        color: '#828CB8'
      },
      {
        name: 'game/CIITI2016/EstebanFrare/hallucination/public',
        image: 'img/2016/halluc.png',
        title: 'Hallucination',
        color: '#5C3B6C'
      },
      {
        name: 'game/CIITI2016/GonzoGhanem/chaos/public',
        image: 'img/2016/chaos.png',
        title: 'Chaos',
        color: '#233D8A'
      },
      {
        name: 'game/CIITI2016/JuaneNieva/all-eyes-on-you/public',
        image: 'img/2016/alleyes.png',
        title: 'All eyes on you',
        color: '#7A5A3C'
      },
      {
        name: 'game/CIITI2016/JulianCedaro/head-soccer/public',
        image: 'img/2016/headsoccer.png',
        title: 'Head soccer',
        color: '#676C6E'
      },
      {
        name: 'game/CIITI2016/Lauro/black-and-white/public',
        image: 'img/2016/black.png',
        title: 'Black and white',
        color: '#C58C3B'
      },
      {
        name: 'game/CIITI2016/Lauro/me-quiere-no-me-quiere/public',
        image: 'img/2016/quiere.png',
        title: 'Me quiere no me quiere',
        color: '#7F9037'
      },
      {
        name: 'game/CIITI2016/Lauro/galaxy-jump/public',
        image: 'img/2016/galaxy.png',
        title: 'Galaxy jump',
        color: '#861F6E'
      },
      {
        name: 'game/CIITI2016/SebastianSilva/the-scape/public',
        image: 'img/2016/thescape.png',
        title: 'The Scape',
        color: '#A2292F'
      },
      {
        name: 'game/CIITI2016/SebastianFlores/icecream-zombies/public',
        image: 'img/2016/icecream.png',
        title: 'IceCream Zombie',
        color: '#59A447'
      },
      {
        name: 'game/CIITI2016/JesusQuiroga/eagle-eye/public',
        image: 'img/2016/eagle.png',
        title: 'Eagle Eye',
        color: '#0A2631'
      }
    ];
    var games2016Shufled = _.shuffle(games2016);
    var html = '';
    var arr;
    for (var i = 0; i < games2016Shufled.length; i++) {
      arr = [
        '<a class="game" href="'+games2016Shufled[i].name+'">',
          '<div class="titleContainer" style="background-color:' + games2016Shufled[i].color + '" >',
              '<h3 class="title">'+games2016Shufled[i].title+'</h1>',
          '</div>',
          '<img class="poster" src="'+games2016Shufled[i].image+'" alt>',
        '</a>',
      ];
      html += arr.join('\n');
    }
    $( '#gallery2016' ).append( html );
});
