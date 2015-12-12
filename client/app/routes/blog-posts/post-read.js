import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'blog-posts',

    model(post) {
        let { slug } = post;
        // Should be covered in a blog, actually
        return this.store.query('post', { slug }).then((posts) => {
            if (posts.contents) {
                return posts.get('firstObject');
            } else {
                this.transitionTo('404');
            }
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
