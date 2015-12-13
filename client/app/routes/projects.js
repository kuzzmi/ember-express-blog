import Ember from 'ember';

export default Ember.Route.extend({
    api: Ember.inject.service('api'),

    model() {
        return this.store.findAll('project');
    },

    actions: {
        sync() {
            this.get('api').call(true, 'projects/sync', data => {
                console.log(data);
            });
        },

        publish(project) {
            project.set('isPublished', true);
            project.save();
        }
    }
});
