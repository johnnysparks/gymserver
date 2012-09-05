var Class     = require('./class.js');
/*
    mongoUri  = process.env.MONGOLAB_URI || "mongodb://localhost/gymserver",
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

*/


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
  	fn("Not yet Implimented", {});
  },

  login: function(email, pass, fn){
  	fn("Not yet Implimented", {});
	}
});


module.exports = Client;
