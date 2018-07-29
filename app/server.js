var express = require ('express');

var app = express();

app.set('view enigne', 'ejs');
app.set('views',__dirname + '/../public/views' );

app.use(express.static(__dirname + "/../public"));

require('./database.js');
require('./routes.js')(app);

module.exports = app;

