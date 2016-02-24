import Ember from 'ember';

export default Ember.Controller.extend({
    api: Ember.inject.service(),

    sitemap: [],

    init() {
        this._super(...arguments);
        this.get('api').call(true, 'admin/sitemap', data => {
            this.set('sitemap', data);
        });
    },

    actions: {
        saveSitemap() {
            console.log(this.get('sitemap'));
        }
    }
});
