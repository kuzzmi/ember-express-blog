import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    lctv: Ember.inject.service(),

    // When I want to include the info about LCTV
    // didInsertElement() {
    //     this.get('lctv').checkStatus();
    //     this._super(...arguments);
    // },

    isLiveChanged: Ember.observer('lctv.isLive', function() {
        this.set('isLive', this.get('lctv.isLive'));
    }),

    actions: {
        toggleNavbar() {
            Ember.$('.navbar').toggleClass('show');
            Ember.$('.nav-toggle').toggleClass('active');
        },

        invalidateSession() {
            this.get('session').invalidate();
        }
    }
});
