import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return [{
            title: 'Post 1'
        }, {
            title: 'Post 3'
        }, {
            title: 'Post 5'
        }, {
            title: 'Post 7'
        }, {
            title: 'Post 9'
        }];
    }
});
