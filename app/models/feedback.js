var mongoose = require('mongoose');


var feedbackSchema = mongoose.Schema({
    title: String,
    name: String,
    message: String
},
{ 
	timestamps: { createdAt: 'created_at' }
 }
);

module.exports = mongoose.model("Feedback", feedbackSchema);