var express = require('express');
var router = express.Router();

var posts = require('./posts');
var projects = require('./projects');

/*
 *  POSTS START
 */

/* Posts routes */
router.route('/posts')
    .post(function(req, res) {
        posts.add(req, res);
    })
    .get(function(req, res) {
        posts.getAll(req, res);
    });

/* Single post routes */
router.route('/posts/:slug')
    .get(function(req, res) {
        posts.getOne(req, res, req.params.slug);
    });

router.route('/posts/:id')
    .put(function(req, res) {
        posts.update(req, res, req.params.id);
    })
    .delete(function(req, res) {
        posts.delete(req, res, req.params.id);
    });

/*
 *  PROJECTS START
 */
router.route('/projects')
    .get(function(req, res) {
        projects.getAll(req, res);
    });

module.exports = router;
