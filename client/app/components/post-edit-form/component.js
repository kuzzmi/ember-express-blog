import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        save(post) {
            this.sendAction('save', post);
        }
    }
});
