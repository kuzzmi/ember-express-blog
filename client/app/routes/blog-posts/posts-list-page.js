import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'blog-posts',
    templateName: 'blog-posts.posts-list',

    model(params) {
        if (params.page === '1') {
            return this.transitionTo('blog-posts.posts-list');
        }
        let ctrl = this.controllerFor('blog-posts');
        let query = {
            page: params.page,
            size: ctrl.get('pageSize')
        };
        ctrl.set('currentPage', params.page);
        return this.store.query('post', query);
    }
});
