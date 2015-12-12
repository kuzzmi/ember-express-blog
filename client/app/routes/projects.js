import Ember from 'ember';

export default Ember.Route.extend({
    api: Ember.inject.service('api'),

    model() {
        return [{
            fullname: 'monk'
        }];
    },

    actions: {
        sync() {
            this.get('api').call(true, 'projects/sync', data => {
                console.log(data);
            });
        }
    }
});
