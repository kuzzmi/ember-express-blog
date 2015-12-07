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

module.exports.update = function(req, res) {
    var id = req.params.id;

    Tag.findOne({
        _id: id
    }, function(err, tag) {
        if (err) {
            res.send(err);
        }

        extend(true, tag, req.body.tag);

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

module.exports.getOne = function(req, res) {
    var id = req.params.id;

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

module.exports.delete = function(req, res) {
    var id = req.params.id;

    Tag.findOne({
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
