/* globals CodeMirror */
/* globals hljs */

import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    preview: '',
    tags: '',
    isPreview: false,

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
            let tags = this.get('tags').split(',').map((tag) => {
                return tag.trim();
            });
            console.log(tags);
            this.sendAction('save', { post: post, tags: tags });
        },

        edit() {
            Ember.$('.form').toggleClass('hidden');
            Ember.$('.preview').toggleClass('hidden');
            this.set('isPreview', false);
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
                self.set('isPreview', true);
                Ember.$('.form').toggleClass('hidden');
                Ember.$('.preview').toggleClass('hidden');
                setTimeout(function() {
                    Ember.$('pre code').each((i, block) => {
                        hljs.highlightBlock(block);
                    }); 
                }, 0);
            });
        }
    }
});
