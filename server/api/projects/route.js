var mongoose = require('mongoose');
var extend = require('extend');
var Project = require('../../models/project');

module.exports.add = function(req, res) {
    var project = new Project(req.body.project);
    project.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({
            project: project
        });
    });
};

module.exports.getAll = function(req, res) {
    var query = req.query || null;
    Project.find(query, function(err, projects) {
        if (err) {
            res.send(err);
        }
        res.json({
            projects: projects
        });
    });
    
};

module.exports.update = function(req, res, id) {
    Project.findOne({
        _id: id
    }, function(err, project) {
        if (err) {
            res.send(err);
        }

        // var oldPosts = project.posts;
        // extend(true, project, req.body.project);
        // project.posts.map(function(_id) {
        //     var index = oldPosts.indexOf(_id);
        //     if (index === -1) {
        //         project.posts.push(oldPosts[_id]);
        //     }
        // });

        project.save(function(err, project) {
            if (err) {
                res.send(err);
            }
            res.json({
                project: project
            });
        });
    });
};

module.exports.getOne = function(req, res, id) {
    Project.findOne({
        _id: id
    }, function(err, project) {
        if (err) {
            res.send(err);
        }
        res.json({
            project: project
        });
    });
};

