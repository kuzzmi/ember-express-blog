var config = require('../config');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy(
    config.googleAuth,
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        // User.findOrCreate({
        //     googleId: profile.id
        // }, function(err, user) {
        //     return done(err, user);
        // });
    }
));
