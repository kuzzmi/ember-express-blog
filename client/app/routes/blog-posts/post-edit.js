import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return this.store.findRecord('post', params.slug);
    },

    actions: {
        savePost(post) {
            post.save().then((newPost) => {
                this.transitionTo('blog-posts.post-read', newPost);
            });
        }
    }
});
