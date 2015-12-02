// var mongoose = require('mongoose');
// var githubAPI = require('node-github');
//
// // var Post = require('../../models/post');
//
// module.exports.getAll = function(req, res) {
//     var github = new githubAPI({
//         version: '3.0.0'
//     });
//
//     github.repos.getAll({}, function(err, data) {
//         res.json(data);
//     });
// };
var express = require('express');
var router = express.Router();
var projects = require('./route');

/* projects routes */
router.route('/')
    .post(function(req, res) {
        projects.add(req, res);
    })
    .get(function(req, res) {
        projects.getAll(req, res);
    });

/* Single tag routes */
router.route('/:id')
    .get(function(req, res) {
        projects.getOne(req, res, req.params.id);
    })
    .put(function(req, res) {
        projects.update(req, res, req.params.id);
    })
    .delete(function(req, res) {
        projects.delete(req, res, req.params.id);
    });

module.exports = router;
