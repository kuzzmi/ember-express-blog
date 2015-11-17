import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('blog-posts', { path: 'posts' }, function() {
        this.route('posts-list', { path: '/' });
        this.route('post-new', { path: 'new' });
    });
});

export default Router;
