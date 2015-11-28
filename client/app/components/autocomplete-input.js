import Ember from 'ember';

export default Ember.Component.extend({
    outputValues: '',

    didInsertElement() {
        this._super(...arguments);
    },

    init() {
        this._super(...arguments);

        let key = this.get('key');
        let values = this.get('values').map((value) => {
            return value.get(key);
        });

        this.set('outputValues', values.join(', '));
    }
});
