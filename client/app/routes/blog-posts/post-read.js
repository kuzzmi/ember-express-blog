/* globals hljs */

import Ember from 'ember';

export default Ember.Route.extend({
    afterModel() {
        setTimeout(function () {
            Ember.$('pre code').each((i, block) => {
                hljs.highlightBlock(block);
            });
        }, 1);
    },

    model(params) {
        return this.store.findRecord('post', params.slug);
    },

    actions: {
        delete(post) {
            this.store.findRecord('post', post.id).then((_post) => {
                _post.destroyRecord().then(() => {
                    this.transitionTo('blog-posts');
                });
            });
        }
    }
});
