var githubAPI = require('node-github');
var mongoose = require('mongoose');
var extend = require('extend');
var Project = require('../../models/project');

module.exports.add = function(req, res) {
    var project = new Project(req.body.project);
    project.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        res.json({
            project: project
        });
    });
};

module.exports.getAll = function(req, res) {
    if (!req.user) {
        req.query.isPublished = true;
    } else if (req.query.isPublished) {
        delete req.query.isPublished;
    }

    Project.find(req.query)
        .sort({
            dateUpdated: 'desc',
            githubID: 'asc'
        })
        .exec(function(err, projects) {
        if (err) {
            res.status(500).send(err);
        }
        res.json({
            projects: projects
        });
    });
};

module.exports.update = function(req, res) {
    Project.findOne({
        _id: req.params.id
    }, function(err, project) {
        if (err) {
            res.status(500).send(err);
        }

        project.update(req.body.project, function(err, project) {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                project: project
            });
        });
    });
};

module.exports.getOne = function(req, res, id) {
    Project.findOne({
        _id: req.params.id
    }, function(err, project) {
        if (err) {
            res.status(500).send(err);
        }
        res.json({
            project: project
        });
    });
};

module.exports.sync = function(req, res) {
    var github = new githubAPI({
        version: '3.0.0'
    });

    github.repos.getFromUser({
        user: 'kuzzmi'
    }, function(err, data) {
        if (err && res) {
            res.status(500).send(err);
        }

        data.forEach(function(_project) {
            Project.findOne({
                githubID: _project.id
            }, function(err, project) {
                if (err && res) {
                    res.status(500).send(err);
                }

                if (!project) {
                    project = new Project({
                        githubID: _project.id,
                        name: _project.name,
                        url: _project.html_url,
                        description: _project.description,
                        dateCreated: _project.created_at,
                        dateUpdated: _project.pushed_at,
                        isOwner: !_project.fork,
                        stars: _project.stargazers_count,
                        isPublished: false,
                        posts: []
                    });

                    project.save(function(err) {
                        if (err && res) {
                            res.status(500).send(err);
                        }
                    });
                } else {
                    project.name = _project.name;
                    project.description = _project.description;
                    project.url = _project.html_url;
                    project.dateUpdated = _project.pushed_at;
                    project.stars = _project.stargazers_count;
                    project.save(function(err) {
                        if (err && res) {
                            res.status(500).send(err);
                        }
                    });
                }
            });
        });

        if (res) {
            res.json(data);
        }
    });
};
