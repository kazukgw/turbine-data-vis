var express = require('express');
var app = express();
var basicAuth = require('basic-auth-connect');
app.use(basicAuth('naist', '20naist15'), express.static(__dirname));
var port = process.env.PORT || 5000;
var server = app.listen(port);

