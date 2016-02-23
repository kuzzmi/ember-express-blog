import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
