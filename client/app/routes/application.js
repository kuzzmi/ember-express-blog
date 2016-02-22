import Ember from 'ember';
import config from '../config/environment';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    model() {
        const author = config['author'] || {};
        const fullname = [ author.name, author.lastName ].join(' ');
        author.fullname = fullname;
        return author;
    }
});
