import Ember from 'ember';
import config from '../config/environment';

let self;

export default Ember.Component.extend({
    links: [],

    didInsertElement() {
        self = this;
        // this.set('self', this);
    },

    actions: {
        action(link) {
            this.sendAction('action', link);
        },

        uploadImage: (file) => {
            console.log(self);
            let image = {
                name: file.file.name
            };

            file.read().then((url) => {
                image.file = url;
            });


            //
                // console.log(url);
                // if (this.get(image, 'url') == null) {
                //     this.set(image, 'url', url);
                // }
            // const me = this;

            // console.log(file);
            const path = [config.API.host, config.API.namespace, 'posts/upload'].join('/');
            //
            file.upload(path).then((response) => {
                // console.log(file);
                image.url = config.API.uploadPath + '/' + response.body[0].data;
                self.get('links').addObject(image);
                // this.set(image, 'url', response.headers.Location);
            }, () => { });
        }
    }
});
