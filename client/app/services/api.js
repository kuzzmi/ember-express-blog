import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
    session: Ember.inject.service('session'),

    call(toAuthorize, endpoint, success, error) {
        function callFn(headers) {
            headers = headers || {};
            error = error || ( () => {} );
            let url = [config.API.host, config.API.namespace, endpoint].join('/');

            Ember.$.ajax(url, { headers }).success(success).error(error);
        }

        if (typeof toAuthorize === 'boolean' && toAuthorize === true) {
            let session = this.get('session');
            session.authorize('authorizer:oauth2', (headerName, headerValue) => {
                const headers = {};
                headers[headerName] = headerValue;
                callFn(headers);
            });
        } else {
            callFn();
        }
    }
});
