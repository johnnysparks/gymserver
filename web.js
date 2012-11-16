var express  = require('express'),
    fs       = require('fs'),
    routes   = require('./routes'),
    CONFIG   = require('./config');

var app = express.createServer();

// express middleware
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session( CONFIG.session ));

// view rendering
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.set("view options", {layout: false});     // disable layout
app.register('html', { compile: function(str, options){ return function(locals){ return str; }; } });// make a custom html template
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/* routing (ssl handling)
app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect('https://localhost/'+req.url)
  else
    next() // Continue to other routes if we're not redirecting
})
*/

app.get('/',            function(req, res) { res.render('index.html');   });

app.post('/login',      routes.login); 
app.post('/signup',     routes.signup); 
app.post('/sendemail',  routes.sendemail );
app.post('/contact',    routes.contact );


//app.get('*',              function(req,res){ res.render('index.html');   });

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



