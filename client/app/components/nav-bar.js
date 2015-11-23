import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);

        function setActiveIndicator(time) {
            setTimeout(function () {
                var indicator = Ember.$('nav .active-indicator')[0];
                var activeLink = Ember.$('nav a.active')[0];
                console.log('click');
                indicator.style.left = activeLink.offsetLeft + 'px';
                indicator.style.width = activeLink.offsetWidth + 'px';
            }, time);
        }

        Ember.$('nav ul li a').on('click', () => {
            setActiveIndicator(0);
        });

        setActiveIndicator(0);
    }
});
