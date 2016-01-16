'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../../config/config');
var auth = require('../service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(500).json({message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user._id, user.role);
    console.log(token);
    res.json({access_token: token, expiresIn: config.tokenExpiration});
  })(req, res, next);
});

module.exports = router;
