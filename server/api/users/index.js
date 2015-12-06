var express = require('express');
var router = express.Router();
var users = require('./route'); 
var auth = require('../../auth/service');

router.route('/')
    .get(users.index)
    .post(users.create);

router.get('/me', auth.isAuthenticated(), users.me);

module.exports = router;
