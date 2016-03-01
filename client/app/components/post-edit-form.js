/* globals CodeMirror */
/* globals hljs */

import Ember from 'ember';
import config from '../config/environment';

const cm = CodeMirror;

export default Ember.Component.extend({
    store: Ember.inject.service(),
    api: Ember.inject.service(),
    editor: null,
    preview: '',
    isPreview: false,
    images: [],

    /* events */
    didInsertElement() {
        let self = this;
        this._super(...arguments);
        let myTextarea = this.$('#editor-body')[0];
        let editor = cm(myTextarea, {
            value: this.get('post.markdown') || '',
            mode: 'markdown',
            lineWrapping: true,
            keyMap: 'vim'
        });
        
        editor.on('change', function(editor) {
            let body = editor.getValue();
            self.set('post.markdown', body);
        });

        this.set('editor', editor);
        
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

            let images = this.get('images');

            for (var i = 0, l = images.length; i < l; i++) {
                var v = images[i];
            
                if (this.get('post.markdown').indexOf(v.url) === -1) {
                    this.get('api').call(true, 'posts/upload/' + v.filename, {
                        method: 'DELETE'
                    });
                }
            }

            this.sendAction('save', post);
        },

        edit() {
            Ember.$('.form').toggleClass('hidden');
            Ember.$('.preview').toggleClass('hidden');
            this.set('isPreview', false);
        },

        preview(post) {
            let url = [config.API.host, config.API.namespace, 'posts', 'preview'].join('/');
            let self = this;
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

        insertLink(image) {
            let editor = this.get('editor');

            let val = editor.doc.getValue().split('\n');
            let cur = editor.doc.getCursor();
            let img = '![](' + image.url + ')';
            let scroll = editor.getScrollInfo();

            val.splice(cur.line + 1, 0, '', img, '', '');

            editor.doc.setValue(val.join('\n'));

            editor.doc.setCursor(cur.line + 4);
            editor.scrollTo(0, scroll.top);
            editor.focus();

            this.get('images').addObject(image);
        },

        fullscreen() {
            Ember.$('.not-editor').toggleClass('hidden');
            Ember.$('h1').toggleClass('hidden');
            Ember.$('.current-time').toggleClass('hidden');
            Ember.$('.toolbar').toggleClass('hidden');
            Ember.$('nav').toggleClass('hidden');
            Ember.$('.editor').toggleClass('fullscreen');
            this.get('editor').refresh();
        }
    }
});
