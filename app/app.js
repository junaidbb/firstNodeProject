var express = require("express");
var dataFile =require("./data/data.json");
var bodyParser = require('body-parser');
var io = require('socket.io')();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/roux'); 

var app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3009);
app.set('view engine','ejs');
app.set('views','app/views');

app.locals.siteTitle  = 'roux'; 
app.locals.allSpeakers =  dataFile.speakers;

app.use(express.static('./app/public'))

var route  = require('./routes/routes.js') (app); 



var server =  app.listen(app.get('port'), function () {
	console.log("port is "+ app.get('port')); 
});


io.attach(server);
io.on('connection', function(socket) {
	socket.on('postMessage', function(data) {
		console.log(data); 
		io.emit('updateMessages', data);
	});
});