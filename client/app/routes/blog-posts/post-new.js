import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    controllerName: 'blog-posts',

    model() {
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
