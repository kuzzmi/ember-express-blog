/* globals WebFont */
export function initialize(/* application */) {
    WebFont.load({
        google: {
            families: ['Roboto Mono']
        }
    });
}

export default {
  name: 'webfont-loader',
  initialize
};
