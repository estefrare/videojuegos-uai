var express  = require('express');
var app = express();
var port = 3000; //mayor 2000

app.use(express.static('public')); //mismo nombre que la carpeta
app.listen(port, function(err){
	console.log('p:' + port)
});
