var Class  = require('./class.js'),
    Parse  = require('./parse-1.0.15.js').Parse,
    CONFIG = require('./config');

/**
 * Client
 **/

Client = Class.extend({
  user:     null,
  username: null,
  password: null,
  email:    null,
  settings: null,

  init: function(){
    Parse.initialize( CONFIG.parse.appid, CONFIG.parse.jsKey );
    this.user = new Parse.User();
  },
  create: function(email, pass, fn){
    this.user.set("username", email);
    this.user.set("password", password);
    Parse.signUp(null, {
      success: function(user){
        fn(false, user);
      },
      error: function(user, err){
        fn(err, user);
      }
    }
  },
  login: function(email, pass, fn){
    Parse.User.logIn(email, pass, {
      success: function(user) {
        fn(false, user); // Do stuff after successful login.
      },
      error: function(user, error) {
        fn(err, user); // The login failed. Check error to see why.
      }
    });
  }
}


exports.module = Client;
