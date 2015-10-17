console.log("Starting App");

var user = require('./app/models/user.server.model');
var service = require('./app/models/service.server.model');

console.log("Models Defined.");

// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var crypto         = require('crypto');


console.log("Modules Defined");
// configuration ===========================================
	
// config files
var db = require('./config/db');
console.log("DB Defined");

var port = process.env.PORT || 3000; // set our port
console.log("Port Defined");

// connect to our mongoDB database
console.log("Connecting to DB...");
mongoose.connect(db.url);
console.log("DB Connected");


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
var routes = require('./app/routes')(app); // pass our application into our routes
console.log("Routes Defined");

console.log("Starting App");
// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
console.log("App is exposed. Time to play!");