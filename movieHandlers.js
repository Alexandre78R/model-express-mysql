const database = require("./database.js");

const movies = [
    {
      id: 1,
      title: "Citizen Kane",
      director: "Orson Wells",
      year: "1941",
      colors: false,
      duration: 120,
    },
    {
      id: 2,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      year: "1972",
      colors: true,
      duration: 180,
    },
    {
      id: 3,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      year: "1994",
      color: true,
      duration: 180,
    },
  ];
  
  // const getMovies = (req, res) => {
  //   res.json(movies);
  // };
  const getMovies = (req, res) => {
    database
      .query("select * from movies")
      .then(([movies]) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };
  
  // const getMovieById = (req, res) => {
  //   const id = parseInt(req.params.id);
  
  //   const movie = movies.find((movie) => movie.id === id);
  
  //   if (movie != null) {
  //     res.json(movie);
  //   } else {
  //     res.status(404).send("Not Found");
  //   }
  // };

  const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
    database
    .query(`select * from movies where id = ${id}`)
    .then(([movies]) => {
      if (movies.length !== 0) {
        res.json(movies);
      } else {
        res.status(404).send("Not found.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
  };

  const postMovie = (req, res) => {
    const { title, director, year, color, duration } = req.body;
  
    database
      .query(
        "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
        [title, director, year, color, duration]
      )
      .then(([result]) => {
        // wait for it
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.status(200).send("INSERT OK");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the movie");
      });
  };

  const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, director, year, color, duration } = req.body;
  
    database
      .query(
        "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
        [title, director, year, color, duration, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.status(200).send("update");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the movie");
      });
  };
  
  const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("delete from movies where id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the movie");
      });
  };
  
  module.exports = {
    getMovies,
    getMovieById,
    postMovie,
    updateMovie,
    deleteMovie,
  };