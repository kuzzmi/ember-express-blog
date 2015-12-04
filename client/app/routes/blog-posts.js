import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        savePost(data) {
            let store = this.store;
            let { post, tags } = data;

            let addTag = ( tag, postTags ) => {
                return tag.get('posts')
                    .then((posts) => {
                        return posts.addObject(post).save();
                    })
                    .then(() => {
                        return postTags.pushObject(tag).save();
                    });
            };

            post.save().then(() => {
                return post.get('tags');
            }).then((postTags) => {
                return tags.map((_tag) => {
                    // need to swap 
                    if (!postTags.findBy('name', _tag)) {
                        console.log(_tag);
                        return store
                        .query('tag', { name: _tag })
                        .then((tag) => {
                            if (tag.content.length) {
                                tag = tag.get('firstObject');

                                return addTag(tag, postTags);
                            } else {
                                let newTag = this.store.createRecord('tag', { 
                                    name: _tag 
                                });
                                return newTag.save().then(() => {
                                    return addTag(newTag, postTags);
                                });
                            }
                        });
                    } else {
                        return new Promise(()=>{});
                    }
                });
            }).then(() => {
                return post.save();
            }).then(() => {
                this.transitionTo('blog-posts.post-read', post);
            });


        }
    }
});
