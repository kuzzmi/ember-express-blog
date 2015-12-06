var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
    passport.use(new LocalStrategy({
        // TODO: switch to emails
        // usernameField: 'email',
        usernameField: 'username',
        passwordField: 'password' // this is the virtual field on the model
    },
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, { message: 'This user is not registered.' });
            }
            if (!user.authenticate(password)) {
                return done(null, false, { message: 'This password is not correct.' });
            }
            return done(null, user);
        });
    }));
};
