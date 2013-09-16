// Express server will serve static content from the `bases`
// configuration within Gruntfile.js

var express = require('express');
var app = express();

// Additional endpoints can be addeded to server
app.get('/hello', function(req, res) {
  res.send('hello!');
});

module.exports = app;