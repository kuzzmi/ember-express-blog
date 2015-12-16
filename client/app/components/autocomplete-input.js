import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    foundItems: null,
    newItem: null,

    addItem(value) {
        if (typeof value === 'string') {
            value = this.get('store').createRecord('tag', {
                name: value
            });
        }
        if (this.get('items')) {
            this.get('items').addObject(value);
        } else if (this.get('item')) {
            this.set('item', value);
        }
        this.set('foundItems', []);
        this.set('newItem', null);
    },

    removeItem(value) {
        if (this.get('items')) {
            this.get('items').removeObject(value);
        } else if (this.get('item')) {
            this.set('item', undefined);
        }
    },

    findItem(value) {
        let { store, model, key } = this.getProperties('store', 'model', 'key');

        let query = {};
        query[key] = { '$regex': value };

        store.query(model, query).then((items) => {
            this.set('foundItems', items);
        });
    },

    actions: {
        remove(value) {
            this.removeItem(value);
        },

        add(value) {
            this.addItem(value);
        },

        keyUp(value, event) {
            let key = event.keyCode;
            switch (key) {
                // This is comma 
                case 188:
                    value = value.slice(0, -1);
                    this.addItem(value);
                    return;
                
                // Enter key
                case 13:
                    this.addItem(value);
                    return;
                
                default:
                    if (value) {
                        this.findItem(value);
                    } else {
                        // No need of querying and displaying old values 
                        // if value is empty
                        this.set('foundItems', []);
                    }
                    return;
                    
            }
        }
    }
});
