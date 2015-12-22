import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        save(project) {
            project.save().then(() => {
                this.transitionTo('projects.list');
            });
        }
    }
});
