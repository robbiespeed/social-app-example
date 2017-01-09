import Ember from 'ember';
import AnimateMixin from 'social-app-example/mixins/animate';
import { module, test } from 'qunit';

module('Unit | Mixin | animate');

// Replace this with your real tests.
test('it works', function(assert) {
  let AnimateObject = Ember.Object.extend(AnimateMixin);
  let subject = AnimateObject.create();
  assert.ok(subject);
});
