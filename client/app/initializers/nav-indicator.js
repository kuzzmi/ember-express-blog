import Ember from 'ember';
import { WebFont } from 'webfontloader';

var initialized = false;

export function initialize() {
    if (initialized) {
        return;
    }

    let areFontsLoaded = false;

    let setIndicator = () => {
        let indicator = Ember.$('nav .active-indicator')[0];
        let activeLink = Ember.$('nav li a.active')[0];
        if (indicator && activeLink) {
            indicator.style.left  = activeLink.offsetLeft + 'px';
            indicator.style.width = activeLink.offsetWidth + 'px';
        }
    };

    Ember.Route.reopen({
        actions: {
            didTransition() {
                if (areFontsLoaded) {
                    setTimeout(setIndicator, 1);
                } else {
                    WebFont.on('active', () => {
                        areFontsLoaded = true;
                        setIndicator();
                    }, true);
                }
            }
        }
    });

    initialized = true;
}

export default {
  name: 'nav-indicator',
  initialize
};
