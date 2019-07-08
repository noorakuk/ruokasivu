var express = require('express');

var app = express();
var path = require('path');
const db = require('./html/queries')
var bodyParser = require('body-parser');

// Määritellään polku hakemaan kaikki tiedostot yms
var htmlPath = path.join(__dirname, 'html');

app.use(express.static(htmlPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/food', db.getFoods)
app.post('/food', db.addFood)

// Käynnistetään ohjelma
var server = app.listen(8080, function() {
  var host = 'localhost';
  var port = server.address().port;
  console.log('Käynnistetty!');
});
