import { moduleFor, test } from 'ember-qunit';

moduleFor('route:blog-posts/posts-list', 'Unit | Route | blog posts/posts list', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
