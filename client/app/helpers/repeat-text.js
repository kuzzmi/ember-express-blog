import Ember from 'ember';

export function repeatText(params/*, hash*/) {
    let times = parseInt(params[0], 10),
        text = params[1];

    let result = (new Array(times + 1)).join(text);

    return result;
}

export default Ember.Helper.helper(repeatText);
