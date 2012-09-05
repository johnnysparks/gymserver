$(function(){ // begin dom load


var MainRouter = Backbone.Router.extend({
  routes: {
    "faq"        : "faq",
    "contact"    : "contact",
    "login"      : "login",
    "signup"     : "signup",
    "client/:id" : "client",
    "/"          : "index",
    ""           : "index",
  },
  index: function(){
    $('#main').html(ich.main_intro());
  },

  faq: function(){
    $('#main').html(ich.main_faq());
  },

  contact: function(){
    $('#main').html(ich.main_contact());
  },
});

var LoginModel = Backbone.Model.extend({
  defaults: {
    state: "unauthed", // validating, failed, signup, logout, authed
    shown: false,
  },
  
  initialize: function(){
    this.bind('change:state', this.toggle, this);
  },

});

var LoginView = Backbone.View.extend({
  templates: {
    "unauthed" : ich.login_unauth(),
  },

  initialize: function(){
    $('body').append(this.render().el);
  },

  render: function(){
    console.log(this.model.get('shown'));
    if(this.model.get("shown")){
      $(this.el).empty().html( this.templates[this.model.get("state")] ).fadeIn();
    } else {
      $(this.el).fadeOut();
    }
    return this;
  },

  toggle: function(){
    this.model.set("shown", !this.model.get("shown"));
    this.render()
  }
});

var AppView = Backbone.View.extend({
  el: $('body'),
  events: {
    "click #menu_login" : "toggleLoginModal",
  },
  toggleLoginModal: function() {
    loginView.toggle();
  }
});

var loginView = new LoginView({ model: new LoginModel() });
var appView   = new AppView;





// Initiate the router
var mainRouter = new MainRouter();

// Start Backbone history a neccesary step for bookmarkable URL's
Backbone.history.start(); //{pushState: true});

$('a').on('click', function(e){
  e.preventDefault();
  mainRouter.navigate( $(this).attr('href'), true);
});

}); // end dom load
