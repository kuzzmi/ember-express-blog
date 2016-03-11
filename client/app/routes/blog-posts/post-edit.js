import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    controllerName: 'blog-posts',

    model(params) {
        return this.store.findRecord('post', params.slug);
    },

    actions: {
        willTransition(transition) {
            var model = this.currentModel;
            console.log(model.get('hasDirtyAttributes'));
            if (model.get('hasDirtyAttributes')) {
                if(confirm('Are you sure?')) {
                    model.rollbackAttributes();
                } else {
                    transition.abort();
                }
            }
        }
    }
});
