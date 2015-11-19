import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return this.store.findRecord('post', params.id);
    },

    actions: {
        savePost(post) {
            post.save().then(() => {
                this.transitionTo('blog-posts.post-read', post)
            });
        }
    }
});
