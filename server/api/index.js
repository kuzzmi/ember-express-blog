var express = require('express');
var router = express.Router();

var posts = require('./posts');
var tags = require('./tags');
var users = require('./users');
var projects = require('./projects');
var auth = require('../auth');

router.use('/posts', posts);
router.use('/tags', tags);
router.use('/users', users);
router.use('/projects', projects);
router.use('/auth', auth);

module.exports = router;
