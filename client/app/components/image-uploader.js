import Ember from 'ember';

let self;

export default Ember.Component.extend({
    links: [],

    didInsertElement() {
        self = this;
        // this.set('self', this);
    },

    actions: {
        uploadImage: (file) => {
            console.log(self);
            let image = {
                name: file.file.name
            };

            file.read().then((url) => {
                image.file = url;
                self.get('links').addObject(image);
            });


            //
                // console.log(url);
                // if (this.get(image, 'url') == null) {
                //     this.set(image, 'url', url);
                // }
            // const me = this;

            // console.log(file);
            // file.upload('/api/posts/upload').then((response) => {
            //     // console.log(file);
            //     console.log(response);
            //     // this.set(image, 'url', response.headers.Location);
            // }, () => { });
        }
    }
});
