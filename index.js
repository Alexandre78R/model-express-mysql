require('dotenv').config();
var express = require('express');
var app = express();
const http = require('http').createServer(app);
const PORT =  process.env.SERVER_PORT;
console.log(`I am ${process.env.MY_NAME}, wilder in ${process.env.MY_CITY}, and I love ${process.env.MY_LANGUAGE}`);

app.get('/', function(req, res) {
  res.send('hello world');
});

http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });