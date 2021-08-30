const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const user = req.body;
    const name = `${user.firstName} ${user.lastName}`;
  
    // If inputs blank, error
    // Hash password
    user.password = bcrypt.hashSync(user.password, 12);

    // If email already registered, error
    // Else store new user in database: register query
    db.query(
      `
      INSERT INTO users(name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [name, user.email, user.password]
    )
    .then((data) => {
      const newUser = data.rows[0];
      req.session.userId = newUser.id;
      console.log("User created successfully")
      res.send("User created");
    })
    .catch((e) => {
      res.status(500);
      if (e.constraint === "users_email_key") {
        res.send("Email already registered");
      } else {
        res.send(e);
      }
    });
  });

  return router;
};