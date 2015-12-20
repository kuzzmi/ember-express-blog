var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var checked = false;

// TODO
// Add flags to prevent this route to check the Users collection
// everytime, after setting up the system.

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
                // Refactor this to check Users only once
                User.find({}, function(err, users) {
                    if (checked === false) {
                        checked = true;
                        if (users.length) {
                            return done(null, false, { message: 'This user is not registered.' });
                        } else {
                            var newAdmin = new User({
                                role: 'admin',
                                username: username,
                                password: password
                            });
                            newAdmin.save(function(err) {
                                if (err) {
                                    return done(null, false, { message: 'Failed to create and setup admin account' });
                                }
                                return done(null, newAdmin);
                            });
                        }
                    }
                })
            } else if (!user.authenticate(password)) {
                return done(null, false, { message: 'This password is not correct.' });
            } else {
                return done(null, user);
            }
        });
    }));
};
