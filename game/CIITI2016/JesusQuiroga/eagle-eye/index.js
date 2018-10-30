var express = require('express');
var app = express();
var port = 3123;

app.use(express.static('public'));

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port '+port+'. Open up http://localhost:'+port+'/ in your browser.')
  }
});
