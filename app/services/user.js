import Ember from 'ember';

const { computed, inject } = Ember;

// use as abstraction in the future to allow login from multiple sources.
export default Ember.Service.extend({
  facebook: inject.service(),

  loggedIn: computed.alias('facebook.loggedIn'),
  firstName: computed.alias('facebook.user.firstName'),
  lastName: computed.alias('facebook.user.lastName'),
  picture: computed.alias('facebook.user.picture'),

  name: computed('firstName', 'lastName', function () {
    const firstName = this.get('firstName');
    const lastName = this.get('lastName');
    return firstName && lastName ?
      firstName + ' ' + lastName : firstName || lastName || 'Unkown';
  }),

  signOut () {
    const facebook = this.get('facebook');

    if (facebook.get('loggedIn') === true) {
      facebook.logout();
    }
  }
});
