import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),

    didInsertElement() {
        this._super(...arguments);

        function setActiveIndicator(interval) {
            setTimeout(function () {
                var indicator = Ember.$('nav .active-indicator')[0];
                var activeLink = Ember.$('nav li a.active')[0];
                if (indicator && activeLink) {
                    indicator.style.left  = activeLink.offsetLeft + 'px';
                    indicator.style.width = activeLink.offsetWidth + 'px';
                }
            }, interval);
        }

        Ember.$('nav ul li a').on('click', () => {
            setActiveIndicator(1);
            this.actions.toggleNavbar();
        });

        setActiveIndicator(100);
   },

   actions: {
       toggleNavbar() {
           Ember.$('.navbar').toggleClass('show');
           Ember.$('.nav-toggle').toggleClass('active');
       },

       invalidateSession() {
           this.get('session').invalidate();
       }
   }
});
