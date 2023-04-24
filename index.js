require('dotenv').config();
var express = require('express');
var app = express();
const http = require('http').createServer(app);
const PORT = process.env.SERVER_PORT;
const database = require("./database.js");
const movieHandlers = require("./movieHandlers");
database
  .getConnection()
  .then(() => {
    console.log("Connexion à la bdd réussi !");
  })
  .catch((err) => {
    console.error(err);
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });