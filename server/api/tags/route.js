var mongoose = require('mongoose');
var extend = require('extend');
var Tag = require('../../models/tag');

module.exports.add = function(req, res) {
    var tag = new Tag(req.body.tag);
    tag.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({
            tag: tag
        });
    });
};

module.exports.getAll = function(req, res) {
    var query = req.query || null;
    console.log(query);
    Tag.find(query, function(err, tags) {
        if (err) {
            res.send(err);
        }
        res.json({
            tags: tags
        });
    });
    
};

module.exports.update = function(req, res, id) {
    Tag.findOne({
        _id: id
    }, function(err, tag) {
        if (err) {
            res.send(err);
        }

        var oldPosts = tag.posts;
        extend(true, tag, req.body.tag);
        tag.posts.map(function(_id) {
            var index = oldPosts.indexOf(_id);
            if (index === -1) {
                tag.posts.push(oldPosts[_id]);
            }
        });

        tag.save(function(err, tag) {
            if (err) {
                res.send(err);
            }
            res.json({
                tag: tag
            });
        });
    });
};

module.exports.getOne = function(req, res, id) {
    Tag.findOne({
        _id: id
    }, function(err, tag) {
        if (err) {
            res.send(err);
        }
        res.json({
            tag: tag
        });
    });
};
