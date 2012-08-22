var SendGrid = require('sendgrid').SendGrid,
    Email    = require('sendgrid').Email,
    CONFIG   = require('../../config'),
    Class    = require('./class.js');

var Emailer = Class.extend({
  response:   null,
  sendgrid:   null,
  email:      null,
  _to:        null,
  _from:      null,
  _body:      null,
  _subject:   null,
  _files:     null,

  /**
   * fire up sendgrid, set defaults
   **/
  init: function(){
    this.response   = {
      status: "error",
      message: "",
      data: {}
    }
    this.sendgrid   = new SendGrid( CONFIG.sendgrid.login, CONFIG.sendgrid.password  );
    this._to        = [];
    this._body      = "No message.";
    this._subject   = "No subject.";
    this._from      = "no-reply@daily.do";
    this._files     = [];
  },

  /**
   * Add target Email.
   **/
  to: function(tos){
    var recip;
    if(tos instanceof Array){
      for(recip in tos){
        if(this.validEmail(tos[recip])){
          this._to.push(tos[recip]);
        }
      }
    } else if(typeof tos == "string"){
      if(this.validEmail(tos)){
        this._to.push(tos);
      }
    }
  },

  /**
   * Validate email address
   **/
  validEmail: function(email){
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
  },

  /**
   * Check for valid parameters, send.
   **/
  send: function(fn){
    var recip, file, _this = this;
    if(this._to.length < 1){
      this.response.status  = "error";
      this.response.message = "No recipients set.";
      fn(this.response);
    }
    this.email    = new Email({
      from:    this._from,
      subject: this._subject,
      text:    this._body,
    });

    for(recip in this._to){
      this.email.addTo(this._to[recip]);
    }

    if(this._files.length){
      for(file in this._files){
        this.email.addFile(this._files[file]);
      }
    }
    
    this.sendgrid.send(this.email, function(success, message){
      if(success) {
        _this.response.status  = "success";
        _this.response.message = "Email sent.";
        _this.response.data = message;
      } else {
        _this.response.status  = "error";
        _this.response.message = "Email failed to send.";
        _this.response.data = message;
      }
      fn( _this.response );
    });
  },

  body: function(body){
    if(body){
       this._body = body;
    }
  },

  subject: function(subject){
    if(subject){
      this._subject = subject;
    }
  },

  from: function(from){
    if(from){
      this._from = from;
    }
  },

  attach: function(name, file){
    if(name && file){
      this._files.push({filename: name, content: new Buffer(file)});
    } else {
      this.response.message = "Failed to add attachment";
    }
  }
});

module.exports = Emailer;
