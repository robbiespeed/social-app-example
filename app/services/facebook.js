import Ember from 'ember';
import ENV from 'social-app-example/config/environment';

const { computed, RSVP } = Ember;

export default Ember.Service.extend({
  loggedIn: computed.equal('loginStatus', 'connected').readOnly(),

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
    const scope = 'user_friends,user_likes,user_actions.video,user_actions.books,' +
      'user_actions.music,user_actions.fitness,user_tagged_places';
    FB.login((response) => {
      console.log(response);
      const loginStatus = this.set('loginStatus', response.status);
      if (loginStatus === 'connected') {
        this.getUserData(response.authResponse.userID);
        // Logged into your app and Facebook.
      }
    }, { return_scopes: true, scope });
  },

  getUserData (userID) {
    const user = this.set('user', Ember.Object.create({ id: userID }));

    FB.api(`/${userID}?fields=first_name,last_name,likes`, (data) => {
      console.log(data);
      user.set('firstName', data.first_name);
      user.set('lastName', data.last_name);
      user.set('likes', data.likes.data);
    });

    FB.api(`/${userID}/picture?height=64&width=64`, (data) => {
      user.set('picture', data.data.url);
    });


  },

  logout () {
    FB.logout((response) => {
      console.log(response);
      this.set('loginStatus', undefined);
    });
  }
});
