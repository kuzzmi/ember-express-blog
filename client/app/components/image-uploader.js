import Ember from 'ember';
import config from '../config/environment';

let self;

export default Ember.Component.extend({
    api: Ember.inject.service(),

    didInsertElement() {
        self = this;
    },

    actions: {
        action(link) {
            this.sendAction('action', link);
        },

        uploadImage: (file) => {
            let image = {
                name: file.file.name
            };

            file.read().then((url) => {
                image.file = url;
            });

            const path = [config.API.host, config.API.namespace, 'posts/upload'].join('/');

            self.get('api').getHeaders((headers) => {
                file.upload(path, { headers }).then((response) => {
                    image.url = config.API.uploadPath + '/' + response.body[0].data;
                    image.filename = response.body[0].data;
                    self.sendAction('action', image);
                }, () => { });
            });
        }
    }
});
