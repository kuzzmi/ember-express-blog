'use strict';

var mongoose = require('mongoose');
var extend = require('extend');
var Post = require('../../models/post');
var Tag = require('../../models/tag');
var fs = require('fs');
var config = require('../../config/config');

module.exports.add = function(req, res) {
    var post = new Post(req.body.post);

    post.save(function(err, post) {
        if (err) {
            res.send(err);
        }
        Post.populate(post, 'tags project', function() {
            res.json({
                post: post
            });
        });
    });
};

module.exports.getAll = function(req, res) {
    var limits = {
        skip: ( req.query.page - 1 ) * req.query.size,
        limit: parseInt(req.query.size, 10)
    }

    delete req.query.page;
    delete req.query.size;

    if (!req.user) {
        req.query.isPublished = true;
    } else if (req.query.isPublished) {
        delete req.query.isPublished;
    }

    Post.find(req.query)
        .populate('tags')
        .limit(limits.limit)
        .skip(limits.skip)
        .sort('-dateCreated')
        // .populate('project')
        .exec(function(err, posts) {
            if (err) {
                res.send(err);
            }
            res.json({
                posts: posts
            });
        });
};

module.exports.getCount = function(req, res) {
    if (!req.user) {
        req.query.isPublished = true;
    } else if (req.query.isPublished) {
        delete req.query.isPublished;
    }

    Post.find(req.query)
        .populate('tags')
        .sort('-dateCreated')
        // .populate('project')
        .count(function(err, count) {
            if (err) {
                res.send(err);
            }
            res.json({
                count: count
            });
        });
};

module.exports.getOne = function(req, res) {
    var query = {
        slug: req.params.slug,
        isPublished: true
    };

    if (req.user) {
        delete query.isPublished;
    }

    Post.findOne(query)
    .populate('tags')
    // .populate('project')
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
        post.project = newPost.project;
        post.isPublished = newPost.isPublished;

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

module.exports.upload = function(req, res) {
    res.send(req.file.filename);
};

module.exports.deleteUploaded = function(req, res) {
    fs.unlink(config.uploadPath + req.params.id, (err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200).json({ status: 'OK' });
    });
};
