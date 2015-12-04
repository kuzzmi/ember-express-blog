import Ember from 'ember';

export default Ember.Component.extend({
    newValue: '',

    didInsertElement() {
        this._super(...arguments);
    },

    results: Ember.computed('items.[]', function() {
        return this.get('items').filter((item) => {
            let result = item.get(this.get('key'));
            if (this.get('values').indexOf(result) === -1) {
                return result;
            }
        }).map((item) => {
            let result = item.get(this.get('key'));
            return result;
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
                    if (value) {
                        this.sendAction('generate-items', value);
                    } else {
                        this.set('items', []);
                    }
                    return;
                    
            }
        }
    }
});
