$(function(){ // begin dom load

var loginView 	= new LoginView({ model: new LoginModel() });
var contactView = new ContactView({ model: new ContactModel() });
var appView   	= new AppView();

// Initiate the router
var mainRouter = new MainRouter();

// Start Backbone history a neccesary step for bookmarkable URL's
Backbone.history.start(); //{pushState: true});

$('a').on('click', function(e){
  e.preventDefault();
  mainRouter.navigate( $(this).attr('href'), true);
});


// submit contact form
$('form.contact').on('submit', function(e){
    e.preventDefault();
    var $submit = $(this).find('submit');
    $submit.attr('disabled','disabled');
    $.ajax({
        url:'/contact',
        type:'post',
        data:$(this).serialize(),
        success: function(o){
            $submit.addClass('btn');
            $submit.addClass('btn-success');
        },
        complete: function(o){
            $submit.prop('disabled', false);
            console.log(o);
        }
    });
});

}); // end dom load
