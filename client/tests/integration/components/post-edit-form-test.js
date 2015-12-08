import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('post-edit-form', 'Integration | Component | post edit form', {
    integration: true
});

test('it should show time passed since the dateCreated', function(assert) {
    let post = Ember.Object.create({
        title: 'Title',
        markdown: 'Markdown',
        description: 'Description'
    });

    this.set('post', post);
    this.set('form-title', 'Test');
    this.render(hbs`{{post-edit-form post=post}}`);

    assert.equal(this.$('.current-time').text().trim(), 'a few seconds ago');
});

test('it should show form title', function(assert) {
    this.set('form-title', 'Test');
    this.render(hbs`{{post-edit-form form-title=form-title}}`);

    assert.equal(this.$('.form-title').text().trim(), 'Test');
});

test('it should show time passed since the dateCreated', function(assert) {
    let post = Ember.Object.extend({
        title: 'Title'
    });

    this.set('post', post);
    this.render(hbs`{{post-edit-form post=post form-title=form-title}}`);

    assert.equal(this.$('#title').val().trim(), 'Title');
});


test('it should show time passed since the dateCreated', function(assert) {
    let post = Ember.Object.extend({
        description: 'Description'
    });

    this.set('post', post);
    this.render(hbs`{{post-edit-form post=post form-title=form-title}}`);

    assert.equal(this.$('#description').val().trim(), 'Description');
});

test('it should show time passed since the dateCreated', function(assert) {
    let post = Ember.Object.extend({
        markdown: 'Markdown'
    });

    this.set('post', post);
    this.render(hbs`{{post-edit-form post=post form-title=form-title}}`);

    assert.equal(this.$('#editor-body textarea').val().trim(), 'Markdown');
});
