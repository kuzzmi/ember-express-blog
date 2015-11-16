var mongoose = require('mongoose');
var githubAPI = require('node-github');

// var Post = require('../../models/post');

module.exports.getAll = function(req, res) {
    var github = new githubAPI({
        version: '3.0.0'
    });

    github.repos.getAll({}, function(err, data) {
        res.json(data);
    });
};
