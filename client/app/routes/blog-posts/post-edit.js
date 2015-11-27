import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return this.store.findRecord('post', params.slug);
    },

    actions: {
        willTransition() {
            var model = this.currentModel;
            if (model.get('hasDirtyAttributes')) {
                model.rollbackAttributes();
            }
        }
    }
});
