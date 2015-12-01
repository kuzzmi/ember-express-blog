import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'blog-posts',

    model(params) {
        return this.store.createRecord('post');
    },

    actions: {
        willTransition() {
            var model = this.currentModel;
            if (model.get('hasDirtyAttributes')) {
                model.rollbackAttributes();
            }
            this.store.unloadRecord(model);
        }
    }
});
