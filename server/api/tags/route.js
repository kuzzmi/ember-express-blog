var mongoose = require('mongoose');
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

module.exports.getAll = function() {
    Tag.find(function(err, tags) {
        if (err) {
            res.send(err);
        }
        res.json({
            tags: tags
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
