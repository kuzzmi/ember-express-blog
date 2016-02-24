import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    api: Ember.inject.service(),

    sitemap: [],
    success: {},
    error: {},

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
                this.set('success.rebuildCache', status);
            }, () => {
                this.set('error.rebuildCache', 'ERROR');
            });
        },

        updateCache() {
            this.get('api').call(true, 'admin/cache/update', (status) => {
                this.set('success.updateCache', status);
            }, () => {
                this.set('error.updateCache', 'ERROR');
            });
        },

        invalidateSession() {
            this.get('session').invalidate();
        }
    }
});
