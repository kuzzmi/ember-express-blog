import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        savePost(data) {
            let store = this.store;
            let { post, tags } = data;

            post.save().then(() => {
                post.get('tags').then((postTags) => {
                    tags.map((_tag) => {
                        store.query('tag', { name: _tag })
                        .then((tag) => {
                            if (tag.content.length) {
                                tag = tag.get('firstObject');
                                
                                tag.get('posts').then((posts) => {
                                    posts.addObject(post);
                                    posts.save();
                                    postTags.pushObject(tag);
                                    postTags.save().then(() => {
                                        post.save().then(() => {
                                            this.transitionTo('blog-posts.post-read', post);
                                        });
                                    });
                                });
                            } else {
                                let newTag = this.store.createRecord('tag', { 
                                    name: _tag 
                                });
                                newTag.get('posts').then((posts) => {
                                    posts.addObject(post);
                                    posts.save();
                                    postTags.pushObject(newTag);
                                    postTags.save().then(() => {
                                        post.save().then(() => {
                                            this.transitionTo('blog-posts.post-read', post);
                                        });
                                    });
                                });
                            }
                        });
                    });
                });
            });

        }
    }
});
