/* globals CodeMirror */

import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        var self = this;
        this._super(...arguments);
        var myTextarea = this.$('#editor-body')[0];
        new CodeMirror(myTextarea, {
            value: this.get('post.markdown') || '',
            mode: 'markdown',
            keyMap: 'vim'
        }).on('change', function(editor) {
            var body = editor.getValue();
            self.set('post.markdown', body);
        });
    },
    actions: {
        save(post) {
            this.sendAction('save', post);
        }
    }
});
