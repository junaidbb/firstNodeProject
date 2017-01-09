var mongoose = require('mongoose');


var speakerSchema = mongoose.Schema({
    title: String,
    name: String,
    shortname: String,
    summary: String,
    description: String,
    artwork: [String]
});

module.exports = mongoose.model("Speaker", speakerSchema);