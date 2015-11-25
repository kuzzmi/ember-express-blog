import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return {
            email: 'kuzzmi@gmail.com'
        };
    }
});
