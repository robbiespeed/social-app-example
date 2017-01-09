import Ember from 'ember';

export default Ember.Mixin.create({
  animation: 'fade',
  animationTime: 1000,

  didInsertElement () {
    const time = this.get('animationTime');
    switch (this.get('animation')) {
      case 'fade':
        this.$().hide().fadeIn(time);
        break;
      case 'slide-top':
        this.$().hide().slideDown(time);
        break;
    }

    this._super(...arguments);
  },

  willDestroyElement () {
    const animation = this.get('animationOut') || this.get('animation');
    const time = this.get('animationTimeOut') || this.get('animationTime');
    const clone = this.$().clone();
    this.$().parent().prepend(clone);

    function removeClone () {
      clone.remove();
    }

    switch (animation) {
      case 'fade':
        clone.fadeOut(time, removeClone);
        break;
      case 'slide-top':
        clone.slideUp(time, removeClone);
        break;
    }

    this._super(...arguments);
  }
});
