'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../models/user');
var validateJwt = expressJwt({
    secret: config.secret
});
var validateJwtNotStrict = expressJwt({
    secret: config.secret,
    credentialsRequired: false
});

function validate(notStrict) {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            if (notStrict) {
                validateJwtNotStrict(req, res, next);
            } else {
                validateJwt(req, res, next);
            }
        });
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
    return compose()
        .use(validate())
        // Attach user to request
        .use(function(req, res, next) {
            User.findById(req.user._id, function(err, user) {
                if (err) return next(err);
                if (!user) return res.status(401).send('Unauthorized');

                req.user = user;
                next();
            });
        });
}

function attachUser() {
    return compose()
        .use(validate(true))
        // Attach user to request
        .use(function(req, res, next) {
            if (!req.user) {
                return next();
            }
            User.findById(req.user._id, function(err, user) {
                if (err) return next(err);
                if (user) 
                    req.user = user;
                next();
            });
        });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 * if not will return
 */
function hasRoleNotStrict(roleRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');

    return compose()
        .use(attachUser())
        .use(function meetsRequirements(req, res, next) {
            if (req.user) {
                if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                    next();
                } else {
                    delete req.user;
                    next();
                }
            } else {
                next();
            }
        });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');

    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                next();
            } else {
                res.status(403).send('Forbidden');
            }
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
    return jwt.sign({
        _id: id,
        role: role
    }, config.secret, {
        expiresIn: config.tokenExpiration
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
    if (!req.user) return res.status(404).json({
        message: 'Something went wrong, please try again.'
    });
    var token = signToken(req.user._id, req.user.role);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.hasRoleNotStrict = hasRoleNotStrict;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.attachUser = attachUser;
