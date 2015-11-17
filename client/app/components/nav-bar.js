import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);

        function setActiveIndicator() {
            var indicator = Ember.$('nav .active-indicator')[0];
            var activeLink = Ember.$('nav a.active')[0];
            indicator.style.left = activeLink.offsetLeft + 'px';
            indicator.style.width = activeLink.offsetWidth + 'px';
        }

        Ember.$('nav ul li a').on('click', () => {
            setActiveIndicator();
        });

        setActiveIndicator();
    }
});
