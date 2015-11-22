/* globals hljs */

import Ember from 'ember';

export default Ember.Route.extend({
    afterModel() {
        setTimeout(function () {
            Ember.$('pre code').each((i, block) => {
                hljs.highlightBlock(block);
            });
        }, 10);
    },

    model(params) {
        return this.store.findRecord('post', params.id);
    }
});
