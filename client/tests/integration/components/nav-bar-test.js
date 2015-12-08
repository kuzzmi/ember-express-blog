import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
    integration: true
});

test('it renders four li elements', function(assert) {

    // Template block usage:" + EOL +
    this.render(hbs`{{nav-bar}}`);

    assert.equal(this.$().find('li').length, 4);
});

test('it renders Login link if user is not authenticated', function(assert) {
    let sessionService = Ember.Service.extend({
        isAuthenticated: false
    });
    this.register('service:session', sessionService);
    this.inject.service('session', { as: 'session'  });

    this.render(hbs`{{nav-bar}}`);

    assert.equal(this.$().find('li').last().text().trim(), 'Login');
});

test('it renders Logout link if user is authenticated', function(assert) {
    let sessionService = Ember.Service.extend({
        isAuthenticated: true
    });
    this.register('service:session', sessionService);
    this.inject.service('session', { as: 'session'  });

    this.render(hbs`{{nav-bar}}`);

    assert.equal(this.$().find('li').last().text().trim(), 'Logout');
});
