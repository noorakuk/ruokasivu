var express = require('express');
var app = express();
var path = require('path');
const db = require('./html/queries')
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');


// Defining all the files to the use
var htmlPath = path.join(__dirname, 'html');

app.use(express.static(htmlPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('cookie-parser')());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/food', db.getFoods)
app.get('/food/:stuff', db.getFoodByStuff)
app.post('/food', db.addFood)

require('./lib/routes.js')(app);

// Starting the application
var server = app.listen(8080, function() {
  var host = 'localhost';
  var port = server.address().port;
  console.log('Käynnistetty!');
});
