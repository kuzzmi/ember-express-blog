var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    url: String,
    description: String,
    githubID: Number,
    dateCreated: Date,
    dateUpdated: Date,
    stars: Number,
    isOwner: Boolean,
    isPublished: Boolean,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('Project', ProjectSchema);
