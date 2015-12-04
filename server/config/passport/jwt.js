var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var config = require('../config');

var opts = {
    secretOrKey: config.secret
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //
    //     }
    //     if (user) {
    //         done(null, user);
    //
    //     } else {
    //         done(null, false);
    //         // or you could create a new account
    //         //         
    //     }
    //
    // });

}));
