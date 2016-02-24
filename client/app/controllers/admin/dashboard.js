import Ember from 'ember';

export default Ember.Controller.extend({
    api: Ember.inject.service(),

    sitemap: [],
    status: {},

    init() {
        this._super(...arguments);
        this.get('api').call(true, 'admin/sitemap', data => {
            this.set('sitemap', data);
        });
    },

    actions: {
        saveSitemap() {
            console.log(this.get('sitemap'));
        },

        rebuildCache() {
            this.get('api').call(true, 'admin/cache/rebuild', (status) => {
                this.set('status.rebuildCache', status);
            }, (status) => {
                this.set('status.rebuildCache', 'ERROR');
            });
        },

        updateCache() {
            this.get('api').call(true, 'admin/cache/update', (status) => {
                this.set('status.updateCache', status);
            }, (status) => {
                this.set('status.updateCache', 'ERROR');
            });
        },
    }
});
