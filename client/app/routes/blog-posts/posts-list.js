import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findAll('post');
        // return this.store.findAll('post').then((posts) => {
        //     return posts.map((post) => {
        //         console.log(post.get('isNew'));
        //         if (post.get('isNew') === false) {
        //             return post;
        //         } else {
        //             post.rollbackAttributes();
        //             this.store.unloadRecord(post);
        //         }
        //     });
        // });
    }
});
