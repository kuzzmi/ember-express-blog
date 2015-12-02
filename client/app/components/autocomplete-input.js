import Ember from 'ember';

export default Ember.Component.extend({
    newValue: '',

    didInsertElement() {
        this._super(...arguments);
    },

    results: Ember.computed('items.[]', function() {
        return this.get('items').map((item) => {
            return item.get(this.get('key'));
        });
    }),

    addItem(value) {
        this.sendAction('add-item', value);
        this.set('newValue', null);
        this.set('items', []);
    },

    removeItem(value) {
        this.sendAction('remove-item', value);
    },

    actions: {
        select(value) {
            this.addItem(value);
        },

        remove(value) {
            this.removeItem(value);
        },

        keyUp(value, event) {
            let key = event.keyCode;
            switch (key) {
                case 188:
                    value = value.slice(0, -1);
                case 13:
                    this.addItem(value);
                    return;
                
                default:
                    this.sendAction('generate-items', value);
                    return;
                    
            }
        }
    }
});
