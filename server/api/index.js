var express = require('express');
var router = express.Router();

var posts = require('./posts');
var tags = require('./tags');
var users = require('./users');
var projects = require('./projects');
var auth = require('../auth');
var feed = require('./feed');

router.use('/posts', posts);
router.use('/tags', tags);
router.use('/users', users);
router.use('/projects', projects);
router.use('/auth', auth);
router.use('/feed', feed);

module.exports = router;
