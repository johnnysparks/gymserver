var LoginModel = Backbone.Model.extend({
  defaults: {
    state: "unauthed", // validating, failed, signup, logout, authed
    shown: false,
  },
  
  initialize: function(){
    this.bind('change:state', this.toggle, this);
  },

});
