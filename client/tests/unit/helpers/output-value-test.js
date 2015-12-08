import { outputValue } from '../../../helpers/output-value';
import { module, test } from 'qunit';

module('Unit | Helper | output value');

test('it works', function(assert) {
    let result = outputValue([ { foo: 'bar' }, 'foo' ]);
    assert.ok(result);
});

test('it returns a value of object by key name', function(assert) {
    let result = outputValue([ { foo: 'bar' }, 'foo' ]);
    assert.equal(result, 'bar');
});

test('it returns undefined if object has no key passed as a second argument', function(assert) {
    let result = outputValue([ { foo: 'bar' }, 'bar' ]);
    assert.equal(result, undefined);
});

test('it throws error if the signature is not matching', function(assert) {
    assert.throws(outputValue);
});
