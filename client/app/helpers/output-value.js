import Ember from 'ember';

export function outputValue(params/*, hash*/) {
    let object = params[0],
        key = params[1];
    
    return object.get(key);
}

export default Ember.Helper.helper(outputValue);
