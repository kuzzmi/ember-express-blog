import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        savePost(post) {
            post.get('tags').then(tags => {
                return tags.save();
            }).then((tags) => {
                console.log(tags);
                return post.save();
            }).then(() => {
                this.transitionTo('blog-posts.post-read', post);
            });
            // if (post.get('isNew')) {
            //     post.save().then(() => {
            //         post.get('tags').then(tags => {
            //             return tags.map(tag => {
            //                 tag.get('posts').then(posts => {
            //                     return posts.addObject(post);
            //                 }).then(() => {
            //                     return tag.save();
            //                 });
            //             });
            //         }).then(() => {
            //         });
            //     });
            // } else {
            //     post.get('tags').then(tags => {
            //         return tags.map(tag => {
            //             tag.get('posts').then(posts => {
            //                 return posts.addObject(post);
            //             }).then(() => {
            //                 return tag.save();
            //             });
            //         });
            //     }).then(() => {
            //         post.save().then(() => {
            //             this.transitionTo('blog-posts.post-read', post);
            //         });
            //     });
            // }
            //
            //
            // // if (post.get('id')) {
            // //     post.get('tags').then((postTags) => {
            // //         tags.map((tag) => {
            // //             postTags.addObject(tag);
            // //         });
            // //         postTags.save();
            // //     });
            // //     // post.set('tags', []);
            // // }
            //
            // // let addTag = ( tag, postTags ) => {
            // //     return tag.get('posts')
            // //         .then((posts) => {
            // //             return posts.addObject(post).save();
            // //         })
            // //         .then(() => {
            // //             return postTags.pushObject(tag).save();
            // //         });
            // // };
            // //
            // // post.save().then(() => {
            // //     return post.get('tags');
            // // }).then((postTags) => {
            // //     return tags.map((_tag) => {
            // //         // need to swap 
            // //         if (!postTags.findBy('name', _tag)) {
            // //             console.log(_tag);
            // //             return store
            // //             .query('tag', { name: _tag })
            // //             .then((tag) => {
            // //                 if (tag.content.length) {
            // //                     tag = tag.get('firstObject');
            // //
            // //                     return addTag(tag, postTags);
            // //                 } else {
            // //                     let newTag = this.store.createRecord('tag', { 
            // //                         name: _tag 
            // //                     });
            // //                     return newTag.save().then(() => {
            // //                         return addTag(newTag, postTags);
            // //                     });
            // //                 }
            // //             });
            // //         } else {
            // //             return new Promise(()=>{});
            // //         }
            // //     });
            // // }).then(() => {
            // //     return post.save();
            // // })


        }
    }
});
