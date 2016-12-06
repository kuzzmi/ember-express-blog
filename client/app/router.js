import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = Ember.Router.extend(googlePageview, {
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
    this.route('blog-posts', { path: '/' }, function() {
      this.route('posts-list', { path: '/' });
      this.route('posts-list-page', { path: '/page/:page' });
      this.route('post-edit', { path: 'blog/:slug/edit' });
      this.route('post-new', { path: 'blog/new' });
      this.route('post-read', { path: 'blog/:slug' });
      this.route('tag-filtered', { path: 'blog/tag/:tag' });
    });
    this.route('about');
    this.route('projects', function() {
        this.route('create');
        this.route('list');
    });
    this.route('auth', function() {
        this.route('login');
    });
    this.route('404');
    this.route('stream');
});

export default Router;
