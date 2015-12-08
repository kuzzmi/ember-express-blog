import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:user', 'Unit | Service | user', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
    beforeEach() {

        let sessionService = Ember.Service.extend({
            isAuthenticated: false,
            authorize(callback, isAdmin) {
                Ember.set(this, 'isAuthenticated', true);
                if (typeof callback === 'function') {
                    callback({ 
                        role: isAdmin ? 'admin' : 'user'
                    });
                } 
            }
        });
        this.register('service:session', sessionService);
        this.inject.service('session', { as: 'session'  });

    }
});

// Replace this with your real tests.
test('it exists', function(assert) {
    let service = this.subject();
    assert.ok(service);
});

test('it should set user object, if session gets authenticated', function(assert) {
    let service = this.subject();
    service.get('session').authorize(user => {
        service.set('user', user);
    }, true);
    assert.ok(service.get('user'));
});

test('it should return isAdmin === true if user object has role "admin"', function(assert) {
    let service = this.subject();
    service.get('session').authorize(user => {
        service.set('user', user);
    }, true);
    assert.equal(service.get('isAdmin'), true);
});

test('it should return isAdmin === false if user object has role other than "admin"', function(assert) {
    let service = this.subject();
    service.get('session').authorize(user => {
        service.set('user', user);
    }, false);
    assert.equal(service.get('isAdmin'), false);
});
