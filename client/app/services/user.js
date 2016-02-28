import Ember from 'ember';

export default Ember.Service.extend({
    session: Ember.inject.service('session'),
    api: Ember.inject.service('api'),
    user: null,

    init() {
        this._super(...arguments);

        let user = this.get('session').get('data.user');
        if (user) {
            this.set('user', user);
        } else {
            this.getData();
        }
        
        this.get('session').on('authenticationSucceeded', () => {
            this.getData();
        });
        this.get('session').on('invalidationSucceeded', () => {
            this.get('session').set('data.user', {});
        });
    },

    isAdmin: Ember.computed('user', function() {
        let user = this.get('user');
        return user.role === 'admin';
    }),

    getData: function() {
        this.get('api').call(true, 'users/me', data => {
            this.set('user', data);
            this.get('session').set('data.user', data);
        });
    }
});
