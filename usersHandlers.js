const database = require("./database.js");

  const getUsers = (req, res) => {
    const initialSql = "select * from users";
    const where = [];
    if (req?.query?.language) {
      where.push({
        column: "language",
        value: req.query.language,
        operator: "=",
      });
    }
  
    if (req?.query?.city) {
      where.push({
        column: "city",
        value: req.query.city,
        operator: "=",
      });
    }

    console.log("initialSql", initialSql)
    database
      // .query(sql, sqlValues)
      .query(
        where.reduce(
          (sql, { column, operator }, index) =>
            `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
          initialSql
        ),
        where.map(({ value }) => value)
      )
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
  
  const deleteUsers = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("delete from users where id = ?", [id])
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
    getUsers,
    getUsersById,
    postUser,
    updateUser,
    deleteUsers,
  };