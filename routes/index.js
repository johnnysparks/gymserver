// email services
var SendGrid = require('sendgrid').SendGrid,
    Email    = require('sendgrid').Email,
    CONFIG   = require('../config'),
    Emailer  = require('../lib/classes/emailer.js'),
    ClientModel = require('../models/client.js');

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


exports.login = function(req, res){ 
  var response = { error: false, message: "Logged In.", data: {}};
  var user = new Client();
  user.login( req.body.email, req.body.password,
    function(err, loggedInUser){
      if(err){
        response.error = true;
        response.message = "There was a problem creating your account.";
        response.data = { user: loggedInUser, errorDetail : err };
      }
      res.send(response);
    }
  );

}

exports.signup = function(req, res){
  var response = { error: false, message: "User Created!", data: {}};
  req.body = req.body || {};

  var client = new ClientModel();
  client.name.display  = req.body.name;
  client.email.primary = req.body.email;
  client.password      = req.body.password;
  client.save(function(err){
    if(err){
      response.error = true;
      response.message = "Error Creating User";
      response.data = req.body;
    }
    res.send(response);
  });
}


exports.contact = function(req, res){
    var xhr = { error: true, message: "Message Failure", data: {req:{}, emailer:{}}};
    req.body    = req.body || {};
    var name    = req.body.name    || "No Name";
    var email   = req.body.email   || "No email";
    var message = req.body.message || "No message";
    var demo    = req.body.demo    || false;
    
    if(name || email){
        var emailer = new Emailer();
        emailer.to("johnnyfuchs@gmail.com");
        emailer.from("johnny@daily.do");
        emailer.subject("Gymput contact message");
        var body = "Message from: "+ name +", "+email+"\n\n";
        body    += message+"\n\n";
        if(demo) {
            body    += 'They would like you to talk to them about a demo.';
        } else {
            body    += 'Not interested in demo.';
        }
        emailer.body(body);
        emailer.send(function(response){
          if(response.status !== "error"){
            xhr.error = false; 
            xhr.message = "Message Sent"; 
          }
          xhr.data.req     = req.body;
          xhr.data.emailer = response;
          res.send(xhr);
        });
    } else {
        res.send(xhr);
    }
}

exports.insert = function(req, res){ res.send("not implimented"); }
