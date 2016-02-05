import Ember from 'ember';

export default Ember.Route.extend({
    model(tag) {
        let name = tag.tag;
        return this.store.query('post', { tag: name });
    }
});
