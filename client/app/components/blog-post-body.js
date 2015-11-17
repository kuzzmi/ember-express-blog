import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        var self = this;
        this._super(...arguments);

        Ember.$('pre code').each((i, block) => {
            hljs.highlightBlock(block);
        }); 
    }
});
