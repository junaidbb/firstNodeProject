var express = require("express");
var dataFile =require("../data/data.json");
var feedbackData = require('../data/feedback.json');
var fs  = require("fs");

var SpeakersMongo = require('../models/speakers.js');

module.exports  = function (app) {
	
	var pagePhotos = []; 
	var speakers = dataFile.speakers;

	dataFile.speakers.forEach(function (item) {
		pagePhotos = pagePhotos.concat(item.artwork); 
	});

	app.get('/api',  function(req, res) {
		res.json(feedbackData);
	});	

	app.post('/api',  function(req, res) {
		feedbackData.unshift(req.body);
		fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
			if (err) {
				console.log(err);
			}
		});
		res.json(feedbackData);
	});

	app.delete('/api/:id', function(req, res) {
		feedbackData.splice(req.params.id, 1);
		fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
			if (err) {
				console.log(err);
			}
		});
		res.json(feedbackData);
	});	

	app.get('/',  function(req, res) {
		res.render('index', {
			pageTitle: 'Home',
			artwork: pagePhotos,
			speakers: speakers, 
			pageID: 'home'
		});

		// SpeakersMongo.find(function(err, speakers){
		// 	if (err) {
		// 		res.json({info: "error during find cat", error: err});
		// 	}
		// 	console.log(speakers);
		// });


	});


	app.get('/chat',  function(req, res) {
		res.render('chat', {
			pageTitle: 'chat',
			pageID: 'chat'
		});
	});

	app.get('/speakers',  function(req, res) {
		res.render('speakers', {
			pageTitle: 'speakers',
			artwork: pagePhotos,
			speakers: speakers, 
			pageID: 'speakerList'
		});
	});

	app.get('/speakers/:speakerId',  function(req, res) {
		var speaker = [];
		dataFile.speakers.forEach(function (item) {
			if (item.shortname == req.params.speakerId) {
				speaker.push(item);
				pagePhotos = pagePhotos.concat(item.artwork);
			} 
		});
		res.render('speakers', {
			pageTitle: 'speaker',
			artwork: pagePhotos,
			speakers: speaker, 
			pageID: 'speaker'
		});
	});

	app.get('/feedback',  function(req, res) {
		res.render('feedback', {
			pageTitle: 'FeedBack',
			pageID: 'feedback'
		});
	});

}