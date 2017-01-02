var express = require("express");
var dataFile =require("../data/data.json");


module.exports  = function (app) {
	


app.get('/',  function(req, res) {

res.render('index');


// 	res.send(`
// 		<link rel="stylesheet" type="text/css" href="/css/style.css">
// 		<h1>Welcome</h1>

// <img src="/images/misc/background.jpg" alt="background" styles="height:300px"/>

// 		`)
});


app.get('/speakers',  function(req, res) {
	var info = '';

	dataFile.speakers.forEach(function (arg) {
		info += `
		<link rel="stylesheet" type="text/css" href="/css/style.css">
			<li>
			<h2>${arg.name}</h2>
			<img src="/images/speakers/${arg.shortname}_tn.jpg" alt="speaker"/>
			<p>${arg.summary}</p>
			</li>
		`;
	});

	res.send(`${info}`)
});


app.get('/speakers/:speakerId',  function(req, res) {
	var info = '';

	var speaker = dataFile.speakers[req.params.speakerId]
		info += `
		<link rel="stylesheet" type="text/css" href="/css/style.css">
			<li>
			<h1>${speaker.title}</h1>
			<h2>${speaker.name}</h2>
			<img src="/images/speakers/${speaker.shortname}_tn.jpg" alt="speaker"/>
			<p>${speaker.summary}</p>
			</li>
		`;

	res.send(`${info}`)
});

}