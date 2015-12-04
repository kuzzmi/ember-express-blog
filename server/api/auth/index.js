var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');

var User = require('../../models/user');

/*
 *  AUTH
 */
// TODO: this one is no longer needed
// router.route('/_setup')
//     .get(function(req, res) {
//         var testUser = new User({ 
//             username: 'testuser',
//             password: 'password',
//             admin: true 
//         });
//
//         // save the sample user
//         testUser.save(function(err) {
//             if (err) throw err;
//             res.json({ success: true });
//         });
//     });

// TODO: Move these 2 to somewhere else
// router.route('/jwt')
//     .get(passport.authenticate('jwt', { session: false }));
// , 
//      function(req, res) {
//          res.json({ status: 'OK' });
//      });

router.route('/google').get(passport.authenticate('google', { scope: 'email' }));

router.route('/login') 
    .post(passport.authenticate('local', { failureRedirect: '/login'  }),
         function(req, res) {
             // console.log(res);
             // console.log('Signing user... ' + res.user.id);
             var token = jwt.sign({_id: req.user._id }, config.secret, { expiresIn: 60*60*5 });
             res.json({ 'access_token': token });
         });

router.route('/google/callback').get( 
  passport.authenticate('google', { failureRedirect: 'http://localhost:4200/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:4200/');
  });

module.exports = router;
