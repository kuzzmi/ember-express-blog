import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    api: Ember.inject.service(),
    user: Ember.inject.service(),

    backup: storageFor('postBackup'),

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

    isDirty: Ember.computed('model', function() {
        return this.get('model').get('hasDirtyAttributes');
    }),

    init() {
        this.get('api').call(false, '/posts/count', (data) => {
            this.set('postsCount', data.count);
        });

        Ember.$(window).on('beforeunload', () => {
            if (this.get('isDirty')) {
                this.set('backup.markdown', this.get('model.markdown'));
                return 'Are you sure?';
            }
        });
    },

    actions: {
        incrPage() {
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
