import Ember from 'ember';

var initialized = false;

export function initialize() {
    if (initialized) {
        return;
    }

    Ember.Route.reopen({
        actions: {
            didTransition() {
                window.scrollTo(0,0);
                this._super();
                return true;
            }
        }
    });

    initialized = true;
}

export default {
  name: 'scroll-reset',
  initialize
};

