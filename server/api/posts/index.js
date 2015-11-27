var marked = require('marked');
var express = require('express');
var router = express.Router();
var posts = require('./route');

/* Posts routes */
router.route('/')
    .post(function(req, res) {
        posts.add(req, res);
    })
    .get(function(req, res) {
        posts.getAll(req, res);
    });

/*
 *  MARKDOWN PREVIEW
 */ 
router.route('/preview')
    .post(function(req, res) {
        var body = req.body.body;
        if (body) {
            body = marked(body);
            res.json({
                'html': body
            });
        } else {
            throw 'No body specified';
        }
    });

/* Single post routes */
router.route('/:id')
    .get(function(req, res) {
        posts.getOne(req, res, req.params.id);
    })
    .put(function(req, res) {
        posts.update(req, res, req.params.id);
    })
    .delete(function(req, res) {
        posts.delete(req, res, req.params.id);
    });

module.exports = router;
