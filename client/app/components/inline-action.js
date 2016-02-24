import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['inline-action'],

    actions: {
        action() {
            this.sendAction();
        }
    }
});
