var express  = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    fs       = require('fs'),
    routes   = require('./routes'),
    User     = require('./models').User;

var app = express.createServer();

// express middleware
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret:'something'}));

// views and routes
app.use(app.router);
app.use(express.cookieParser());
app.use(express.session({ secret: '9h8adfs9hnlka2f101avVAS' }));

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne(id, function (err, user) {
    done(err, user);
  });
});


// view rendering
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

app.get('/',        function(req, res) { res.render('index.html');   });
app.get('/contact', function(req, res) { res.render('contact.html'); });
app.get('/faq',     function(req, res) { res.render('faq.html');     });

app.get('/login',       routes.login); 
app.get('/insert',      routes.insert); 
app.post('/sendemail',  routes.sendemail );

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



