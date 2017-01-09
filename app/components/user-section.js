import Ember from 'ember';
import Animate from 'social-app-example/mixins/animate';

export default Ember.Component.extend(Animate, {
  classNames: ['user-section'],

  signOut () {
    const user = this.get('user');
    if (user && user.signOut) {
      user.signOut();
    }
  }
});
