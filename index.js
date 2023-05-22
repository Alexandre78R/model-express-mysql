require('dotenv').config();
var express = require('express');
var app = express();
const http = require('http').createServer(app);
const PORT = process.env.SERVER_PORT;
const database = require("./database.js");
const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers.js");


app.use(express.json()); 

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
app.post("/api/movies", movieHandlers.postMovie);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", usersHandlers.getUsers);
app.post("/api/users", usersHandlers.postUser);
app.get("/api/users/:id", usersHandlers.getUsersById);

http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });