var Class     = require('./class.js'),
    CONFIG    = require('../../config'),
    mongoUri  = process.env.MONGOLAB_URI,
    db        = require('mongoose').connect( mongoUri );
    Schema    = db.Schema;


var ClientSchema = new Schema({
  name: {
    display: String,
    full:    String,
    first:   String,
    last:    String,
  },
  email: {
    primary: String,
  },
  password: String,
});



/**
 * Client
 **/

var Client = Class.extend({
  user:     null,
  username: null,
  password: null,
  email:    null,
  settings: null,

  init: function(){
  },

  create: function(email, password, fn){
    this.user = new Parse.User();
    this.user.set("username", email);
    this.user.set("email",    email);
    this.user.set("password", password);
    this.user.signUp(null, {
      success: function(user){
        fn(false, user);
      },
      error: function(user, err){
        fn(err, user);
      }
    });
  },

  login: function(email, pass, fn){
    this.user = Parse.User.logIn(email, pass, {
      success: function(user) {
        fn(false, user); // Do stuff after successful login.
      },
      error: function(user, error) {
        fn(err, user); // The login failed. Check error to see why.
      }
    });
  }
});


module.exports = Client;
