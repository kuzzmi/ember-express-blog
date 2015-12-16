import Ember from 'ember';
import WebfontLoaderInitializer from '../../../initializers/webfont-loader';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | webfont loader', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  WebfontLoaderInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
