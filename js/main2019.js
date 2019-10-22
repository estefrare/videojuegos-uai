$(document).ready(function () {
  var games2019 = [
    {
      name: 'game/CIITI2019/HuntingTheDamned',
      image: 'img/2019/phanton-chains.png',
      title: 'Hunting the Damned',
      color: '#861F6E'
    },
  ];
  var games2019Shufled = _.shuffle(games2019);
  var html = '';
  var arr;
  for (var i = 0; i < games2019Shufled.length; i++) {
    arr = [
      '<a class="game" href="' + games2019Shufled[i].name + '">',
      '<div class="titleContainer" style="background-color:' + games2019Shufled[i].color + '" >',
      '<h3 class="title">' + games2019Shufled[i].title + '</h1>',
      '</div>',
      '<img class="poster" src="' + games2019Shufled[i].image + '" alt>',
      '</a>',
    ];
    html += arr.join('\n');
  }
  $('#gallery2019').append(html);
});
