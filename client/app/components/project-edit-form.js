import Ember from 'ember';

export default Ember.Component.extend({
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

    init() {
        this._super(...arguments);
    },

    /* actions */
    actions: {
        save(project) {
            if (!project.get('dateCreated')) {
                project.set('dateCreated', new Date());
            }
            this.sendAction('save', project);
        },

        edit() {
            Ember.$('.form').toggleClass('hidden');
            Ember.$('.preview').toggleClass('hidden');
            this.set('isPreview', false);
        }
    }
});
