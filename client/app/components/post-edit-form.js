/* globals CodeMirror */

import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    preview: 'sadasd',

    /* events */
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
        
        this.$('input:first').focus();
    },

    /* actions */
    actions: {
        save(post) {
            this.sendAction('save', post);
        },

        preview(post) {
            var url = [config.API.host, config.API.namespace, 'posts', 'preview'].join('/');
            var self = this;
            Ember.$.ajax({
                type: 'POST',
                url: url,
                data: {
                    body: post.get('markdown')
                }
            }).success((data) => {
                self.set('preview', data.html);
            });
        }
    }
});
