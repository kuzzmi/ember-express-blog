var express = require('express');
var router = express.Router();

var posts = require('./posts');
var tags = require('./tags');
var users = require('./users');
var projects = require('./projects');
var auth = require('../auth');
var admin = require('./admin');

router.use('/posts', posts);
router.use('/tags', tags);
router.use('/users', users);
router.use('/projects', projects);
router.use('/auth', auth);
router.use('/admin', admin);

module.exports = router;
