import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
    session: Ember.inject.service('session'),
    api: Ember.inject.service('api'),
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
        this.get('api').call(true, 'users/me', data => {
            this.set('user', data);
        });
    }.observes('session.isAuthenticated').on('init')
});
