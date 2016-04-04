/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'kuzzmi-blog',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        disqus: {
            shortname: 'kuzzmi'
        },
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
            'script-src': "'self' 'unsafe-inline' kuzzmi.disqus.com referrer.disqus.com www.google-analytics.com static.addtoany.com",
            'style-src': "'self' 'unsafe-inline' use.typekit.net fonts.googleapis.com a.disquscdn.com static.addtoany.com",
            'frame-src': "'self' 'unsafe-inline' disqus.com static.addtoany.com www.livecoding.tv",
            'child-src': "'self' 'unsafe-inline' disqus.com",
            'font-src': "'self' 'unsafe-inline' fonts.gstatic.com",
            'img-src': "'self' 'unsafe-inline' www.gravatar.com a.disquscdn.com referrer.disqus.com data:",
            'connect-src': "'self' http://localhost:3000"
        },

        'ember-simple-auth': {
            // Here we can configure ember-simple-auth
            authenticationRoute: 'auth.login',
            routeAfterAuthentication: 'blog-posts',
            routeIfAlreadyAuthenticated: 'blog-posts'
        },

        author: {
            nickname: 'kuzzmi',
            email: 'igor@kuzzmi.com',
            facebook: 'https://www.facebook.com/ikuzmenko',
            name: 'Igor',
            lastName: 'Kuzmenko'
        },

        webFontConfig: {
            google: {
                families: ['Roboto Mono:400,500,700']
            }
        },

        pace: {
            theme: 'minimal'
        }
    };

    if (environment === 'development') {
        ENV.API.host = 'http://localhost:3000';
        ENV.API.uploadPath = '/uploads';
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
        ENV.API.host = 'https://kuzzmi.com';
        ENV.API.uploadPath = '/uploads';
        ENV.googleAnalytics = {
            webPropertyId: 'UA-51775404-4'
        };
        ENV.contentSecurityPolicy = {
            'script-src': "'self' 'unsafe-inline' www.google-analytics.com",
            'style-src': "'self' 'unsafe-inline' use.typekit.net fonts.googleapis.com",
            'connect-src': "'self' www.google-analytics.com",
            'font-src': "'self' 'unsafe-inline' fonts.gstatic.com",
            'img-src': "'self' 'unsafe-inline' www.gravatar.com"
        };
    }

    return ENV;
};
