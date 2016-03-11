import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    api: Ember.inject.service(),
    user: Ember.inject.service(),

    pageSize: 5,
    currentPage: null,
    postsCount: null,

    isNotFirstPage: Ember.computed('currentPage', function() {
        return ( +this.get('currentPage') !== 1 );
    }),

    isNotLastPage: Ember.computed('currentPage', 'pageSize', 'postsCount', function() {
        let size = this.get('pageSize');
        let cur = this.get('currentPage');
        let max = this.get('postsCount') - (size * cur);
        return max > 0;
    }),

    nextPage: Ember.computed('currentPage', function() {
        return +( this.get('currentPage') ) + 1;
    }),

    prevPage: Ember.computed('currentPage', function() {
        return +( this.get('currentPage') ) - 1;
    }),

    init() {
        this.get('api').call(true, '/posts/count', (data) => {
            this.set('postsCount', data.count);
        });
    },

    actions: {
        incrPage() {
            console.log('asdasdasd');
            let cur = this.get('currentPage');
            if (!this.get('isLastPage')) {
                this.transitionTo('blog-posts.posts-list-page', cur++);
            }
        },
        decrPage() {
            let cur = this.get('currentPage');
            if (cur === 2) {
                this.transitionTo('blog-posts.posts-list', cur--);
            } else {
                this.transitionTo('blog-posts.posts-list-page', cur--);
            }
        }
    }
});
