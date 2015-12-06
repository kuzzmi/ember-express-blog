import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'blog-posts',

    model(post) {
        // Should be covered in a blog, actually
        return this.store.query('post', { slug: post.slug }).then((posts) => {
            return posts.get('firstObject');
        });
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
