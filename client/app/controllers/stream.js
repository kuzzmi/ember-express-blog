import Ember from 'ember';

export default Ember.Controller.extend({
    lctv: Ember.inject.service(),

    init() {
        this.get('lctv').checkStatus();
        this._super(...arguments);
    },

    isLiveChanged: Ember.observer('lctv.isLive', function() {
        this.set('isLive', this.get('lctv.isLive'));
    })
});
