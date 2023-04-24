var express = require('express');
var app = express();
const http = require('http').createServer(app);
const PORT = "3000";

app.get('/', function(req, res) {
  res.send('hello world');
});

http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });