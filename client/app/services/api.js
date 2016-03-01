import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
    session: Ember.inject.service('session'),

    call(toAuthorize, endpoint, options, success, error) {
        if (typeof options === 'function') {
            error = success;
            success = options;
            options = null;
        }

        function callFn(headers) {
            options = options || {};
            headers = headers || {};
            options.headers = headers;

            success = success || ( () => {} );
            error = error || ( () => {} );
            let url = [config.API.host, config.API.namespace, endpoint].join('/');

            Ember.$.ajax(url, options).success(success).error(error);
        }

        if (typeof toAuthorize === 'boolean' && toAuthorize === true) {
            this.getHeaders(callFn);
        } else {
            callFn();
        }
    },

    getHeaders(callFn) {
        let session = this.get('session');
        session.authorize('authorizer:oauth2', (headerName, headerValue) => {
            const headers = {};
            headers[headerName] = headerValue;
            callFn(headers);
        });
    }
});
