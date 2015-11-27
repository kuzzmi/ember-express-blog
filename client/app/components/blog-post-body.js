/* globals hljs */
import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);

        Ember.$('pre code').each((i, block) => {
            hljs.highlightBlock(block);
        }); 
    }
});
