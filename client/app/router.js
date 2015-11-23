import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.route('blog-posts', { path: '/' }, function() {
    this.route('posts-list', { path: '/' });
    this.route('post-edit', { path: 'blog/:slug/edit' });
    this.route('post-new', { path: 'blog/new' });
    this.route('post-read', { path: 'blog/:slug' });
  });
  this.route('about');
  this.route('projects');
});

export default Router;
