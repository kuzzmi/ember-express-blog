/* globals hljs */

import Ember from 'ember';

export default Ember.Route.extend({
    model(post) {
        return this.store.findRecord('post', post.slug);
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
