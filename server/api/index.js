var express = require('express');
var router = express.Router();
var passport = require('passport');
var marked = require('marked');

var posts = require('./posts');
var projects = require('./projects');

var User = require('../models/user');

/*
 *  POSTS START
 */

/* Posts routes */
router.route('/posts')
    .post(function(req, res) {
        posts.add(req, res);
    })
    .get(function(req, res) {
        posts.getAll(req, res);
    });

/*
 *  MARKDOWN PREVIEW
 */ 
router.route('/posts/preview')
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
router.route('/posts/:id')
    .get(function(req, res) {
        posts.getOne(req, res, req.params.id);
    })
    .put(function(req, res) {
        posts.update(req, res, req.params.id);
    })
    .delete(function(req, res) {
        posts.delete(req, res, req.params.id);
    });

/*
 *  PROJECTS START
 */
router.route('/projects')
    .get(function(req, res) {
        projects.getAll(req, res);
    });

/*
 *  AUTH
 */
// TODO: this one is no longer needed
router.route('/_setup')
    .get(function(req, res) {
        var testUser = new User({ 
            username: 'testuser',
            password: 'password',
            admin: true 
        });

        // save the sample user
        testUser.save(function(err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });

// TODO: Move these 2 to somewhere else
router.route('/auth').get(passport.authenticate('google', { scope: 'email' }));

router.route('/auth/callback').get( 
  passport.authenticate('google', { failureRedirect: 'http://localhost:4200/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:4200/');
  });

module.exports = router;
