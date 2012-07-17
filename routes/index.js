var SendGrid = require('sendgrid').SendGrid;
var Email    = require('sendgrid').Email;
var sendgrid = new SendGrid('johnnyfuchs', 'taped99zeSt*');



exports.sendemail = function(res, req){
  var result = {"status": "error", "message": "Failed to send email.", "data": {}};
  var params = req.body || {};
  var valid  = true;

  // validate emails
  if( !params.from || !validishEmail(params.from)){
    valid = false;
  }
  var to_addrs = ['johnny@daily.do', 'johnnyfuchs@gmail.com', 'johnny.fuchs@shoutlet.com'];
//  var to_addrs = [ 'hgrigg@supremehealthfitness.com', 'shannon@supremehealthfitness.com', 'johnnyfuchs@gmail.com'];

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

  // Fire off the sendgrid email
  if(valid){
    sendgrid.send( email , 
      function(success, message){
        if(!success){
          result.message = "Email Server Error.";
          result.data    = message;
        } else {
          result.status  = "success";
          result.message = "Email Sent";
          result.data    = message;
        }
        res.send(result);
    });
  } else {
    result.message = "Invalid email address";
    result.data    = params;
    res.send(result);
  }
}



/**
 * The most basic of email validators,
 * sendgrid will fail if it "looks" valid but isn't anyway
 **/
function validishEmail(str) {
    var lastAtPos = str.lastIndexOf('@');
    var lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
}

