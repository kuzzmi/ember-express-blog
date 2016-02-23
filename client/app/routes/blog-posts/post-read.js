import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
    controllerName: 'blog-posts',

    model(post) {
        let { slug } = post;
        return this.store.query('post', { slug }).then((posts) => {
            if (posts.content.length) {
                return posts.get('firstObject');
            } else {
                this.transitionTo('404');
            }
        });
    },

    afterModel: function(model) {
        this.setHeadTags(model);
    },

    setHeadTags: function(model) {
        const author = config['author'] || {};
        const fullname = [ author.name, author.lastName ].join(' ');
        let tags = {};

        tags = [{
            type: 'meta',
            tagId: 'meta-twitter-title-tag',
            attrs: {
                property: 'twitter:title',
                content: model.get('title')
            }
        }, {
            type: 'meta',
            tagId: 'meta-twitter-site-tag',
            attrs: {
                property: 'twitter:site',
                content: '@' + author.nickname
            }
        }, {
            type: 'meta',
            tagId: 'meta-twitter-creator-tag',
            attrs: {
                property: 'twitter:creator',
                content: '@' + author.nickname
            }
        }, {
            type: 'meta',
            tagId: 'meta-twitter-description-tag',
            attrs: {
                property: 'twitter:description',
                content: model.get('description')
            }
        }, {
            type: 'meta',
            tagId: 'meta-og-type-tag',
            attrs: {
                property: 'og:type',
                content: 'article'
            }
        }, {
            type: 'meta',
            tagId: 'meta-og-section-tag',
            attrs: {
                property: 'article:section',
                content: 'Software Development'
            }
        }, {
            type: 'meta',
            tagId: 'meta-og-author-tag',
            attrs: {
                property: 'article:author',
                content: author.facebook
            }
        }, {
            type: 'meta',
            tagId: 'meta-og-title-tag',
            attrs: {
                property: 'og:title',
                content: model.get('title')
            }
        }, {
            type: 'meta',
            tagId: 'meta-og-description-tag',
            attrs: {
                property: 'og:description',
                content: model.get('description')
            }
        }, {
            type: 'meta',
            tagId: 'meta-og-url-tag',
            attrs: {
                property: 'og:url',
                content: window.location.href
            }
        }, {
            type: 'meta',
            tagId: 'meta-title-tag',
            attrs: {
                name: 'title',
                content: model.get('title')
            }
        }, {
            type: 'meta',
            tagId: 'meta-description-tag',
            attrs: {
                name: 'description',
                content: model.get('description')
            }
        }, {
            type: 'meta',
            tagId: 'meta-author-tag',
            attrs: {
                name: 'author',
                content: fullname
            }
        }];

        this.set('headTags', tags);
    },
    
    actions: {
        delete(post) {
            this.store.findRecord('post', post.id).then((_post) => {
                _post.destroyRecord().then(() => {
                    this.transitionTo('blog-posts');
                });
            });
        }
    }
});
