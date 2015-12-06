var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var User = require('../../models/user');

/* LOCAL AUTH */

router.route('/login') 
    .post(passport.authenticate('local', { failureRedirect: '/login'  }),
         function(req, res) {
             var token = jwt.sign({_id: req.user._id, role: req.user.role }, config.secret, { expiresIn: 60*60*5 });
             res.json({ 'access_token': token });
         });

/* GOOGLE AUTH */

router.route('/google').get(passport.authenticate('google', { scope: 'email' }));

router.route('/google/callback').get( 
  passport.authenticate('google', { failureRedirect: 'http://localhost:4200/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:4200/');
  });

module.exports = router;
