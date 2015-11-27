import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.createRecord('post');
    },

    actions: {
        willTransition() {
            var model = this.currentModel;
            if (model.get('isNew')) {
                model.rollbackAttributes();
            }
        },

        savePost(post) {
            post.set('dateCreated', new Date());
            post.save().then(() => {
                this.transitionTo('blog-posts.post-read', post);
            });
        }
    }
});
