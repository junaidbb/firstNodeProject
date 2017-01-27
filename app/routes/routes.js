var express = require("express");
var dataFile =require("../data/data.json");
var feedbackData = require('../data/feedback.json');
var mongoose = require('mongoose')
var fs  = require("fs");

var SpeakersMongo = require('../models/speakers.js');
var feedbackMongo  = require('../models/feedback.js');

module.exports  = function (app) {


function getFeedBack(req, res) {
				feedbackMongo.find({}).
  sort({ created_at: -1 }).
  exec(function (err, feed) {


					if (err) {
				return console.error(err);
			} else {
				res.format({
					json: function() {
						res.send(feed);
					}
				});
			}


			
		});
}




	var speakers = dataFile.speakers;

	app.get('/api',  function(req, res) {
						getFeedBack(req, res);
	});	

	app.post('/api',  function(req, res) {
		var feed = new feedbackMongo(req.body);
		var promise = feed.save();

		promise.then(function (feedback) {

			getFeedBack(req, res); 

		// 	feedbackMongo.find({}).
  // sort({ created_at: -1 }).
  // exec(function (err, feed) {


		// 			if (err) {
		// 		return console.error(err);
		// 	} else {
		// 		res.format({
		// 			json: function() {
		// 				res.send(feed);
		// 			}
		// 		});
		// 	}


			
		// });




		// 		feedbackMongo.find({}, function (err, feed) {


		// 			if (err) {
		// 		return console.error(err);
		// 	} else {
		// 		res.format({
		// 			json: function() {
		// 				res.send(feed);
		// 			}
		// 		});
		// 	}


			
		// });


		// feedbackData.unshift(req.body);
		// fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// });
		// res.json(feedbackData);
	});
	});

	app.delete('/api/:id', function(req, res) {
		// feedbackData.splice(req.params.id, 1);
		// fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// });
		// res.json(feedbackData);

		feedbackMongo.findByIdAndRemove(req.params.id, function (err) {

			if(!err){
				getFeedBack(req, res); 
			}
		});
	});	

	app.get('/',  function(req, res) {
		var pagePhotos = [];
		SpeakersMongo.find({}, function (err, spkrs) {
			if (err) {
				return console.error(err);
			} else {
				spkrs.forEach(function (item) {
					pagePhotos = pagePhotos.concat(item.artwork); 
				});

				res.format({
					json: function() {
						res.send({speakers: spkrs});
					},
					html: function() {
						res.render('index', {
							pageTitle: 'Home',
							artwork: pagePhotos,
							speakers: spkrs, 
							pageID: 'home'
						});               
					}
				});
			}
		});
	});

	app.get('/chat',  function(req, res) {
		res.render('chat', {
			pageTitle: 'chat',
			pageID: 'chat'
		});
	});

	app.get('/speakers',  function(req, res) {
		var pagePhotos = [];
		SpeakersMongo.find({}, function (err, spkrs) {
			if (err) {
				return console.error(err);
			} else {
				spkrs.forEach(function (item) {
					pagePhotos = pagePhotos.concat(item.artwork); 
				});

				res.format({
					json: function() {
						res.send({speakers: spkrs});
					},
					html: function() {
						res.render('speakers', {
							pageTitle: 'speakers',
							artwork: pagePhotos,
							speakers: spkrs, 
							pageID: 'speakerList'
						});
					}
				});
			}
		});
	});

	app.get('/speakers/:speakerId',  function(req, res) {
		var spkrArt = []; 
		SpeakersMongo.find({shortname: req.params.speakerId}, function (err, spkrs) {
			if (err) {
				return console.error(err);
			} else {
				spkrs.forEach(function (item) {
					spkrArt = item.artwork; 
				});

				res.format({
					json: function() {
						res.send({speakers: spkrs});
					}, 
					html: function() {
						res.render('speakers', {
							pageTitle: 'speakers',
							artwork: spkrArt,
							speakers: spkrs, 
							pageID: 'speaker'
						});
					}
				});
			}
		});
	});

	app.get('/feedback',  function(req, res) {
		res.render('feedback', {
			pageTitle: 'FeedBack',
			pageID: 'feedback'
		});
	});

}