import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        const menu = [{
            title: 'Dashboard',
            route: 'main'
        }, {
            title: 'Invites',
            route: 'invites'
        }, {
            title: 'System',
            route: 'system'
        }];
        return menu;
    }
});
