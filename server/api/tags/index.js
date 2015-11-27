var express = require('express');
var router = express.Router();
var tags = require('./route');

/* tags routes */
router.route('/')
    .post(function(req, res) {
        tags.add(req, res);
    })
    .get(function(req, res) {
        tags.getAll(req, res);
    });

/* Single tag routes */
router.route('/:id')
    .get(function(req, res) {
        tags.getOne(req, res, req.params.id);
    })
    .put(function(req, res) {
        tags.update(req, res, req.params.id);
    })
    .delete(function(req, res) {
        tags.delete(req, res, req.params.id);
    });

module.exports = router;
