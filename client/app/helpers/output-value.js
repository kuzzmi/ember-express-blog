import Ember from 'ember';

export function outputValue(params/*, hash*/) {
    let object = params[0],
        key = params[1];

    if (typeof object === 'object' && typeof key === 'string') {
        if (object.get) {
            return object.get(key);
        } else {
            return object[key];
        }
    } else {
        throw new TypeError('outputValue helper signature is outputValue(Object, String)');
    }
}

export default Ember.Helper.helper(outputValue);
