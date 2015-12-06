import Ember from 'ember';

export default Ember.Service.extend({
    session: Ember.inject.service('session'),
    user: null,

    init() {
        this._super(...arguments);

        this.set('user', {});
        this.getData();
    },

    isAdmin: Ember.computed('user', function() {
        let user = this.get('user');
        return user.role === 'admin';
    }),

    getData: function() {
        let session = this.get('session');
        
        session.authorize('authorizer:oauth2', (headerName, headerValue) => {
            const headers = {};
            headers[headerName] = headerValue;
            Ember.$.ajax('http://localhost:3000/api/users/me', { headers })
                .success((data) => {
                    this.set('user', data);
                });
        });
    }.observes('session.isAuthenticated'),

    test() {
        console.log('test');
    }
});
