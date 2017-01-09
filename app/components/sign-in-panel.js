import Ember from 'ember';
import Animate from 'social-app-example/mixins/animate';

const { inject } = Ember;

export default Ember.Component.extend(Animate, {
  facebook: inject.service(),

  classNames: ['sign-in-panel'],
  animation: 'slide-top',

  facebookSignIn () {
    this.get('facebook').login();
  },
});
