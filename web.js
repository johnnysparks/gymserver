var express  = require('express'),
    routes  = require('./routes');

var app = express.createServer();

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.set("view options", {layout: false});     // disable layout
app.register('html', { compile: function(str, options){ return function(locals){ return str; }; } });// make a custom html template
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.get( '/', function(req, res) { res.render('index.html'); });

app.post('/sendemail', routes.sendemail );

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



