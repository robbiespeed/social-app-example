import Ember from 'ember';

const { computed, inject } = Ember;

// use as abstraction in the future to allow login from multiple sources.
export default Ember.Service.extend({
  facebook: inject.service(),

  loggedIn: computed.alias('facebook.loggedIn'),
  name: computed.alias('facebook.name'),

  signOut () {
    const facebook = this.get('facebook');

    if (facebook.get('loggedIn') === true) {
      facebook.logout();
    }
  }
});
