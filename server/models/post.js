var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var PostSchema = new Schema({  
    title: String,
    body: String,
    description: String,
    dateCreated: Date
});

module.exports = mongoose.model('Post', PostSchema);  
