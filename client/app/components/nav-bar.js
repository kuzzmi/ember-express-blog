import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);

        function setActiveIndicator(interval) {
            setTimeout(function () {
                var indicator = Ember.$('nav .active-indicator')[0];
                var activeLink = Ember.$('nav a.active')[0];
                indicator.style.left = activeLink.offsetLeft + 'px';
                indicator.style.width = activeLink.offsetWidth + 'px';
            }, interval);
        }

        Ember.$('nav ul li a').on('click', () => {
            setActiveIndicator(1);
        });

        setActiveIndicator(50);
    }
});
