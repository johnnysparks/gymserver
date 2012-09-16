var AppView = Backbone.View.extend({
  el: $('body'),
  events: {
    "click #menu_login" : "toggleLoginModal",
  },
  toggleLoginModal: function() {
    loginView.toggle();
  }
});
