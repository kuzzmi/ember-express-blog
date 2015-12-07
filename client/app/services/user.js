import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
    session: Ember.inject.service('session'),
    user: null,

    init() {
        this._super(...arguments);

        this.set('user', {});
        console.debug('User service init...');
        this.getData();
    },

    isAdmin: Ember.computed('user', function() {
        let user = this.get('user');
        return user.role === 'admin';
    }),

    getData: function() {
        let session = this.get('session');
        let url = [config.API.host, config.API.namespace, 'users/me'].join('/');

        session.authorize('authorizer:oauth2', (headerName, headerValue) => {
            const headers = {};
            headers[headerName] = headerValue;
            Ember.$.ajax(url, { headers })
                .success(data => {
                    this.set('user', data);
                });
        });
        
    }.observes('session.isAuthenticated').on('init')
});
