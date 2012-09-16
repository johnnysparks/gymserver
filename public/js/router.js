
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
