var express  = require('express');
var SendGrid = require('sendgrid').SendGrid;
var sendgrid = new SendGrid('johnnyfuchs', 'taped99zeSt*');

var app = express.createServer();
app.use(express.logger());
app.use(express.bodyParser());



app.get('/', function(req, res) {
  res.send('Gymput. Coming to a gym near you.');
});

app.post('/sendemail', function(req, res){
  var result = {"status": "success", "message":"Email sent.", "data": {}};
  var params = req.body;
  var valid  = true;

  if( !params.to   || !validishEmail(params.to))  { valid = false; }
  if( !params.from || !validishEmail(params.from)){ valid = false; }

  // data to be passed to sendgrid servers
  var email = {
      to        : params.to,
      from      : params.from,
      subject   : params.subject,
      text      : params.body,
  };

  if( params.attBody && params.attName ){
      email.files = [{
        filename : params.attName,
        content  : new Buffer(params.attBody)
      }];
  }

  if(valid){
    // Fire off the sendgrid email
    sendgrid.send( email , 
      function(suc, err){
        if(err){
          result.status  = "error";
          result.message = "sendgrid error";
          result.data    = err;
        } else {
          result.data    = suc;
        }
        res.send(result);
    });

  } else {
    result.status = "error";
    result.message= "Invalid email address";
    result.data   = params;
    res.send(result);
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
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

