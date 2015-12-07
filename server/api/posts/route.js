var mongoose = require('mongoose');
var extend = require('extend');
var Post = require('../../models/post');
var Tag = require('../../models/tag');

module.exports.add = function(req, res) {
    var post = new Post(req.body.post);

    post.save(function(err, post) {
        if (err) {
            res.send(err);
        }
        Post.populate(post, 'tags', function() {
            res.json({
                post: post
            });
        });
    });
};

module.exports.getAll = function(req, res) {
    Post.find(req.query)
    .populate('tags')
    .exec(function(err, posts) {
        if (err) {
            res.send(err);
        }
        res.json({
            posts: posts
        });
    });
};

module.exports.getOne = function(req, res) {
    var slug = req.params.id;

    Post.findOne({
        slug: slug
    })
    .populate('tags')
    .exec(function(err, post) {
        if (err) {
            res.send(err);
        }
        res.json({
            post: post
        });
    });
};

module.exports.update = function(req, res) {
    var id = req.params.id;

    Post.findById(id, function(err, post) {
        if (err) {
            res.send(err);
        }

        var newPost = req.body.post;
        post.markdown = newPost.markdown;
        post.tags = newPost.tags;
        post.title = newPost.title;
        post.description = newPost.description;

        post.save(function(err, post) {
            if (err) {
                res.send(err);
            }
            Post.populate(post, 'tags', function() {
                res.json({
                    post: post
                });
            });
        });
    });
};

module.exports.delete = function(req, res) {
    var id = req.params.id;

    Post.findOne({
        _id: id
    }, function(err, post) {
        if (err) {
            res.send(err);
        }
        post.remove(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({});
        });
    });
};

