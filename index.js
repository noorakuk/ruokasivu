var express = require('express');
var app = express();
var path = require('path');

// Määritellään polku hakemaan kaikki tiedostot yms
var htmlPath = path.join(__dirname, 'html');

app.use(express.static(htmlPath));

// Käynnistetään ohjelma
var server = app.listen(8080, function() {
  var host = 'localhost';
  var port = server.address().port;
  console.log('Käynnistetty!');
});

const pg = require('pg');
const pool = new pg.Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: '5432'
});

pool.query("SELECT* FROM ruuat", (err, res) => {
  console.log(res);
  pool.end();
})
