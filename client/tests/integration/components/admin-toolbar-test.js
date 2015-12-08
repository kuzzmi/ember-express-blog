import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('admin-toolbar', 'Integration | Component | admin toolbar', {
    integration: true
});

test('it renders content if user is admin', function(assert) {
    let userService = Ember.Service.extend({
        isAdmin: true
    });
    this.register('service:user', userService);
    this.inject.service('user', { as: 'user'  });

    this.render(hbs`
        {{#admin-toolbar}}
            <li>Test</li>
        {{/admin-toolbar}}
    `);

    assert.equal(this.$().text().trim(), 'Test');
});

test('it does not render content if user is not admin', function(assert) {
    let userService = Ember.Service.extend({
        isAdmin: false
    });
    this.register('service:user', userService);
    this.inject.service('user', { as: 'user'  });

    this.render(hbs`
        {{#admin-toolbar}}
            <li>Test</li>
        {{/admin-toolbar}}
    `);

    assert.equal(this.$().text().trim(), '');
});
