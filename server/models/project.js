var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    url: String,
    dateCreated: Date,
    dateUpdated: Date,
    stars: Number,
    status: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('Project', ProjectSchema);
