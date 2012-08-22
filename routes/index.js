// email services
var SendGrid = require('sendgrid').SendGrid,
    Email    = require('sendgrid').Email,
    CONFIG   = require('../config'),
    Parse    = require('../lib/parse-1.0.15.js').Parse,
    Emailer  = require('../lib/classes/emailer.js');
    Client   = require('../lib/classes/client.js');

Parse.initialize( CONFIG.parse.appid, CONFIG.parse.jsKey );



/**
 * SEND EMAILS
 **/
exports.sendemail = function(req, res){
  req.body = req.body || {};
  console.log(req.body);
  var to_addrs = ['johnny@daily.do', 'johnnyfuchs@gmail.com', 'johnny.fuchs@shoutlet.com'];
//  var to_addrs = [ 'hgrigg@supremehealthfitness.com', 'shannon@supremehealthfitness.com', 'johnnyfuchs@gmail.com'];

  var emailer = new Emailer();
  emailer.to(to_addrs);
  emailer.to(req.body.to);
  emailer.from(req.body.from);
  emailer.subject(req.body.subject);
  emailer.body(req.body.body);
  emailer.attach(req.body.attName, req.body.attBody);
  emailer.send(function(response){
    res.send(response);
  });
}


exports.login = function(req, res){ }

exports.signup = function(req, res){
  var response = { error: false, message: "User Created!", data: {}};
  req.body = req.body || {};

  var user = new Client();
  user.create( req.body.email, req.body.password,
    function(err, newUser){
      if(err){
        response.error = true;
        response.message = "There was a problem creating your account.";
        response.data = { user: newUser, errorDetail : err };
      }
      res.send(response);
    }
  );
}

exports.insert = function(req, res){ res.send("not implimented"); }
