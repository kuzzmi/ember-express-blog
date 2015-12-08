import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tags-list', 'Integration | Component | tags list', {
    integration: true
});

test('it renders', function(assert) {
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    this.render(hbs`{{tags-list}}`);

    assert.equal(this.$().text().trim(), '');
});

test('it renders the same amount of links as amount of items passed as items property', function(assert) {
    this.set('items', [{ name: 'a' }, { name: 'b' }]);

    this.render(hbs`{{tags-list items=items}}`);

    assert.equal(this.$().text().trim(), 'a b');
});
