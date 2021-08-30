const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((data) => {
      const user = data.rows[0];
      if (!user) res.send("Error: Email not found.");

      if (user && bcrypt.compareSync(password, user.password)) {
        res.send("User logged in");
      } else {
        //invalid password
        res.send("Error: Incorrect password");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("Error: An unknown error occurred.");
    });
  });

  return router;
};