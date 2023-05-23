const database = require("./database.js");

  const getUsers = (req, res) => {
    database
      .query("select * from users")
      .then(([users]) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    database
    .query(`select * from users where id = ${id}`)
    .then(([users]) => {
      if (users.length !== 0) {
        res.json(users);
      } else {
        res.status(404).send("Not found.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
  };

  const postUser = (req, res) => {
    console.log("req", req.body);
    // res.json("test")
    const { firstname, lastname, email, city, language } = req.body;
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.json("created");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the users");
      });
  };

  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
    console.log("id", id);
    console.log("req.body", req.body)
    database
    .query(
        "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
        [firstname, lastname, email, city, language, id]
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
        res.status(500).send ("Error editing user");
    })
  };
  
  module.exports = {
    getUsers,
    getUsersById,
    postUser,
    updateUser,
  };