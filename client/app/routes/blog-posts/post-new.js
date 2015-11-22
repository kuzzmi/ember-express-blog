import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.createRecord('post');
    },

    actions: {
        savePost(post) {
            post.set('dateCreated', new Date());
            post.save().then(() => {
                this.transitionTo('blog-posts.post-read', post);
            });
        }
    }
});
