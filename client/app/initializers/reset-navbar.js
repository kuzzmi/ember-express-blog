import Ember from 'ember';

var initialized = false;

export function initialize() {
    if (initialized) {
        return;
    }

    Ember.Route.reopen({
        actions: {
            didTransition() {
                Ember.$('.navbar').removeClass('show');
                Ember.$('.nav-toggle').removeClass('active');
                this._super();
                return true;
            }
        }
    });

    initialized = true;
}

export default {
  name: 'reset-navbar',
  initialize
};


