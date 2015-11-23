var express = require('express');
var router = express.Router();

var posts = require('./posts');

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


module.exports = router;
