$(function(){ // begin dom load

var loginView 	= new LoginView({ model: new LoginModel() });
var appView   	= new AppView();
var contactView = new ContactView();

// Initiate the router
var mainRouter = new MainRouter();

// Start Backbone history a neccesary step for bookmarkable URL's
Backbone.history.start(); //{pushState: true});

$('a').on('click', function(e){
  e.preventDefault();
  mainRouter.navigate( $(this).attr('href'), true);
});

}); // end dom load
