var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err);  }
        cb(null, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username, password);
        User.findOne({ username: username  }, function (err, user) {
            if (err) { return done(err);  }
            if (!user) { return done(null, false);  }
            if (!user.authenticate(password)) { return done(null, false);  }
            return done(null, user);
        });
    }
));
