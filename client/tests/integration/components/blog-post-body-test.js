import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('blog-post-body', 'Integration | Component | blog post body', {
    integration: true
});

test('it renders', function(assert) {
    this.set('html', '<p>test</p>');

    this.render(hbs`
        {{#blog-post-body}}
            {{{html}}}
        {{/blog-post-body}}
    `);

    assert.equal(this.$().text().trim(), 'test');
    assert.equal(this.$().find('.post-body').html().trim(), '<p>test</p>');
});
