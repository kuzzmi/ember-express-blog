/* globals CodeMirror */
/* globals hljs */

import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    preview: '',
    isPreview: false,

    /* events */
    didInsertElement() {
        var self = this;
        this._super(...arguments);
        var myTextarea = this.$('#editor-body')[0];
        new CodeMirror(myTextarea, {
            value: this.get('post.markdown') || '',
            mode: 'markdown',
            lineWrapping: true,
            keyMap: 'vim'
        }).on('change', function(editor) {
            var body = editor.getValue();
            self.set('post.markdown', body);
        });
        
        this.$('input:first').focus();
    },

    init() {
        this._super(...arguments);
    },

    /* actions */
    actions: {
        save(post) {
            if (!post.get('dateCreated')) {
                post.set('dateCreated', new Date());
            }
            this.sendAction('save', post);
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
        },

        fullscreen() {
            Ember.$('.not-editor').toggleClass('hidden');
            Ember.$('.title.form-title').toggleClass('hidden');
            Ember.$('.current-time').toggleClass('hidden');
            Ember.$('.toolbar').toggleClass('hidden');
            Ember.$('nav').toggleClass('hidden');
            Ember.$('.editor').toggleClass('fullscreen');
        }
    }
});
