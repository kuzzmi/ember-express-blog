import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        savePost(post) {
            post.get('tags').then(tags => {
                return tags.save();
            }).then((tags) => {
                return post.save();
            }).then(() => {
                this.transitionTo('blog-posts.post-read', post);
            });
        }
    }
});
