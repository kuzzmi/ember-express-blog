import Ember from 'ember';

var initialized = false;

export function initialize() {
    if (initialized) {
        return;
    }
    Ember.Route.reopen({
        actions: {
            didTransition() {
                let areFontsLoaded = false;
                let page = Ember.$('html');

                let setIndicator = () => {
                    let indicator = Ember.$('nav .active-indicator')[0];
                    let activeLink = Ember.$('nav li a.active')[0];
                    if (indicator && activeLink) {
                        indicator.style.left  = activeLink.offsetLeft + 'px';
                        indicator.style.width = activeLink.offsetWidth + 'px';
                    }
                };

                if (areFontsLoaded) {
                    setIndicator();
                } else {
                    let checker = setInterval(() => {
                        if (page.hasClass('wf-active')) {
                            areFontsLoaded = true;
                            setIndicator();
                            clearInterval(checker);
                        }
                    }, 100);
                }

                return true;
            }
        }
    });
    initialized = true;
}

export default {
  name: 'nav-indicator',
  initialize
};
