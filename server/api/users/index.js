var express = require('express');
var router = express.Router();
var users = require('./route'); 

router.route('/')
    .get(users.index)
    .post(users.create);

module.exports = router;
