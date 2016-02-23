import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        const root = 'admin';
        const menu = [{
            title: 'Dashboard',
            route: [ root, 'dashboard' ].join('.')
        }
        , {
            title: 'Invites',
            // route: [ root, 'invites' ].join('.')
        }, {
            title: 'System',
            // route: [ root, 'system' ].join('.')
        }
        ];
        return menu;
    }
});
