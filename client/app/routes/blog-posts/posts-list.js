import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'blog-posts',

    model() {
        return this.store.findAll('post');
    }
});
