import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    user: Ember.inject.service('user'),

    init() {
        this._super(...arguments);
    }
});
