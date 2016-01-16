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
                        console.log('Setting a new indicator style');
                        console.log(Ember.$('nav li a.active'));
                        indicator.style.left  = activeLink.offsetLeft + 'px';
                        indicator.style.width = activeLink.offsetWidth + 'px';
                    }
                };

                if (areFontsLoaded) {
                    setIndicator();
                } else {
                    let checker = setInterval(() => {
                        // if (page.hasClass('wf-active')) {
                        if (page.hasClass('wf-inactive') || page.hasClass('wf-loading')) {
                            areFontsLoaded = true;
                            setIndicator();
                            clearInterval(checker);
                        }
                    }, 10);
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
