import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.route('blog-posts', { path: '/' }, function() {
    this.route('posts-list', { path: '/' });
    this.route('post-edit', { path: 'post/:id/edit' });
    this.route('post-new', { path: 'post/new' });
    this.route('post-read', { path: 'post/:id' });
  });
  this.route('about');
  this.route('projects');
});

export default Router;
