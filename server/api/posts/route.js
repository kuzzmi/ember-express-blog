var mongoose = require('mongoose');
var extend = require('extend');
var Post = require('../../models/post');

module.exports.add = function(req, res) {
    var post = new Post(req.body.post);
    post.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({
            post: post
        });
    });
};

module.exports.getAll = function(req, res) {
    Post.find(function(err, posts) {
        if (err) {
            res.send(err);
        }
        res.json({
            posts: posts
        });
    });
};

module.exports.getOne = function(req, res, slug) {
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

module.exports.update = function(req, res, id) {
    Post.findOne({
        _id: id
    }, function(err, post) {
        if (err) {
            res.send(err);
        }

        var oldTags = post.tags;
        extend(true, post, req.body.post);
        post.tags.map(function(_id) {
            var index = oldTags.indexOf(_id);
            if (index === -1) {
                post.tags.push(oldTags[_id]);
            }
        });

        post.save(function(err, post) {
            if (err) {
                res.send(err);
            }
            res.json({
                post: post
            });
        });
    });
};

module.exports.delete = function(req, res, id) {
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

