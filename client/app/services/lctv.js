import Ember from 'ember';
import config from '../config/environment';

const LCTV_URL = 'https://www.livecoding.tv/livestreams';
const REGEXP = /(?:itemprop="author">\W+.*\W+)(.*)/g;

export default Ember.Service.extend({
    isLive: null,

    checkStatus() {
        function getMatches(string, regex, index) {
            index = index || 1;
            let matches = [];
            let match;
            while (match = regex.exec(string)) {
                matches.push(match[index]);
            }
            return matches;
        }

        if (this.get('isLive') !== true) {
            Ember.$.ajax(LCTV_URL).success(( data ) => {
                let test = getMatches(data, REGEXP);
                const live = test.indexOf(config.author.nickname) !== -1;
                this.set('isLive', live);
            });
        }
    }
});

