import Ember from 'ember';

export default Ember.Controller.extend({
    generatedTags: [],

    actions: {
        findTags(value) {
            this.store.query('tag', { name: {'$regex': value} }).then((tags) => {
                this.set('generatedTags', tags);
            });
        }
    }
});
