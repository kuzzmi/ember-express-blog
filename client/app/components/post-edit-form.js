import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        save(post) {
            console.log(post);
            this.sendAction('save', post);
        }
    }
});
