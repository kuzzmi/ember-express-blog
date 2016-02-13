/* globals WebFont */
export function initialize(/* application */) {
    WebFont.load({
        google: {
            families: ['Roboto Mono:400,500,700']
        }
    });
}

export default {
  name: 'webfont-loader',
  initialize
};
