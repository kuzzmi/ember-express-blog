/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'kuzzmi-blog',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },

        API: {
            namespace: 'api'
            // Here will be stored API specific settings
        },

        contentSecurityPolicy: {
            'script-src': "'self'",
            'style-src': "'self' 'unsafe-inline' use.typekit.net fonts.googleapis.com",
            'font-src': "'self' 'unsafe-inline' fonts.gstatic.com",
            'img-src': "'self' 'unsafe-inline' www.gravatar.com",
            'connect-src': "'self' http://localhost:3000"
        },

        'ember-simple-auth': {
            // Here we can configure ember-simple-auth
            authenticationRoute: 'auth.login',
            routeAfterAuthentication: 'blog-posts',
            routeIfAlreadyAuthenticated: 'blog-posts'
        }
    };

    if (environment === 'development') {
        ENV.API.host = 'http://localhost:3000';
        // ENV.APP.LOG_RESOLVER = true;
        ENV.APP.LOG_ACTIVE_GENERATION = true;
        ENV.APP.LOG_TRANSITIONS = true;
        ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {
        ENV.API.host = 'https://beta.kuzzmi.com';
        ENV.contentSecurityPolicy = {
            'script-src': "'self'",
            'style-src': "'self' 'unsafe-inline' use.typekit.net fonts.googleapis.com",
            'font-src': "'self' 'unsafe-inline' fonts.gstatic.com",
            'img-src': "'self' 'unsafe-inline' www.gravatar.com"
        };
    }

    return ENV;
};
