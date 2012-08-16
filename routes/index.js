var WebService = require('../lib/cloudmine-0.9.js'),
    // email services
    SendGrid = require('sendgrid').SendGrid,
    Email    = require('sendgrid').Email,
    CONFIG   = require('../config'),
    Parse    = require('../lib/parse-1.0.15.js').Parse;

Parse.initialize( CONFIG.parse.appid, CONFIG.parse.jsKey );

var sendgrid = new SendGrid( CONFIG.sendgrid  );
var wc       = new WebService( CONFIG.cloudmine );

var TestObj  = Parse.Object.extend('TestObj');
var t = new TestObj();

t.save({
  attr : "I am a test attribute",
  also : "And also schemaless",
  but : "We should try a user next"
}, {
  success: function(o){ console.log(o); }
});

/**
 * SEND EMAILS
 **/
exports.sendemail = function(req, res){
  var to_addrs = ['johnny@daily.do', 'johnnyfuchs@gmail.com', 'johnny.fuchs@shoutlet.com'];
//  var to_addrs = [ 'hgrigg@supremehealthfitness.com', 'shannon@supremehealthfitness.com', 'johnnyfuchs@gmail.com'];
  var xhr    = {"status": "error", "message": "Failed to send email.", "data": {}};
  var params = req.body || {};
  console.log("params are");
  console.log(params);


  // validate emails
  if( !params.from || !validishEmail(params.from)){ res.send( xhr ); res.end(); return true; }

  // data to be passed to sendgrid servers
  var email = new Email({
      to       : params.to,
      from     : params.from,
      subject  : params.subject,
      text     : params.body,
  });

  // add the extra emails
  for(var i in to_addrs){
    email.addTo(to_addrs[i]);
  }

  if( params.attName && params.attBody ){
    email.addFile({
      filename : params.attName,
      content  : new Buffer(params.attBody)
    });
  }

  console.log("getting to send email");
  // Fire off the sendgrid email
  sendgrid.send( email, function(success, message){
      if(!success){
        xhr.message = "Email Server Error.";
        xhr.data    = message;
      } else {
        xhr.status  = "success";
        xhr.message = "Email Sent";
        xhr.data    = message;
      }
      res.send(xhr);
  });

  /**
   * The most basic of email validators,
   * sendgrid will fail if it "looks" valid but isn't anyway
   **/
  function validishEmail(str) {
      var lastAtPos = str.lastIndexOf('@');
      var lastDotPos = str.lastIndexOf('.');
      return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
  }
  return true;
}


exports.login = function(req, res){ 


}

exports.insert = function(req, res){ res.send("not implimented"); }
