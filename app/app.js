var express = require("express");
var dataFile =require("./data/data.json");


var app = express()

app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views','app/views');

app.use(express.static('./app/public'))

var route  = require('./routes/routes.js') (app); 



var server =  app.listen(app.get('port'), function () {
	console.log("port is "+ app.get('port')); 
});