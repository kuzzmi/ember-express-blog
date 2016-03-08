import Ember from 'ember';
import config from '../config/environment';

const LCTV_URL = 'https://www.livecoding.tv/livestreams';
const REGEXP = /(?:itemprop="author">\W+.*\W+)(.*)/g;
let initialized = false;

export function initialize() {
    if (initialized) {
        return;
    }

    Ember.Route.reopen({
        isLive: false,

        actions: {
            didTransition() {
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
                        if (test.indexOf(config.author.nickname) === -1) {
                            this.set('isLive', true);
                        }
                    });
                }

                return true;
            }
        }
    });

    initialized = true;
}

export default {
  name: 'lctv-initializer',
  initialize
};

