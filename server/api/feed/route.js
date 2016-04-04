var express = require('express');
var router = express.Router();

var Post = require('../../models/post');
var Tag = require('../../models/tag');

module.exports.rss = function(req, res) {
    Post.find({})
        .sort('-dateCreated')
        .where('isPublished', true)
        .limit(20)
        .select('title slug dateCreated description')
        .exec(function(err, posts) {
            if (err) return next(err);
            console.log(posts);
            return res.render('rss', {
                posts: posts
            });
        });
};
