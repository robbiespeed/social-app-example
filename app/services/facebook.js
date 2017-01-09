import Ember from 'ember';
import ENV from 'social-app-example/config/environment';

const { computed, RSVP } = Ember;

export default Ember.Service.extend({
  loggedIn: computed.equal('loginStatus', 'connected'),

  init () {
    return new RSVP.Promise((resolve) => {
      window.fbAsyncInit = () => {
        FB.init({
          appId      : ENV.APP.facebookAppId,
          xfbml      : true,
          version    : 'v2.8'
        });
        FB.getLoginStatus((response) => {
          console.log(response);
          if (response.status === 'connected') {
            this.getUserData(response.authResponse.userID);
          }
          // else {
          //   this.set('loggedIn', false);
          // }
        });
        FB.AppEvents.logPageView();

        this.set('api', FB);

        resolve();
      };
    });
  },

  login () {
    FB.login((response) => {
      console.log(response);
      const loginStatus = this.set('loginStatus', response.status);
      if (loginStatus === 'connected') {
        this.getUserData(response.authResponse.userID);
        // Logged into your app and Facebook.
      }
    }, { return_scopes: true });
  },

  getUserData (userID) {
    const user = this.set('user', Ember.Object.create({ id: userID }));

    FB.api(`/${userID}?fields=first_name,last_name`, (data) => {
      user.set('firstName', data.first_name);
      user.set('lastName', data.last_name);
    });

    FB.api(`/${userID}/picture?height=64&width=64`, (data) => {
      user.set('picture', data.data.url);
    });
  },

  logout () {
    FB.logout((response) => {
      console.log(response);
      this.set('loggedIn', false);
    });
  }
});
