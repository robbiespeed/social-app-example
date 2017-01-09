import Ember from 'ember';
import ENV from 'social-app-example/config/environment';

const { RSVP } = Ember;

export default Ember.Service.extend({
  loggedIn: false,

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
            this.handleLogin(response.authResponse.userID);
          }
          else {
            this.set('loggedIn', false);
            // FB.login();
          }
        });
        FB.AppEvents.logPageView();

        this.set('api', FB);

        resolve();
      };
    });
  },

  login () {
    FB.login((response) => {
      this.handleLogin(response.authResponse.userID);
    }, { scope: 'public_profile'});
  },

  handleLogin (userID) {
    FB.api(userID, (data) => {
      this.set('name', data.name);

      this.set('loggedIn', true);
    });
  },

  logout () {
    FB.logout((response) => {
      console.log(response);
      this.set('loggedIn', false);
    });
  }
});
