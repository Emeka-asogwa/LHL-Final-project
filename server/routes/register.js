const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
  // const user = req.body;
  // const templateVars = {};

  // // If inputs blank, error
  // // Hash password
  // user.password = bcrypt.hashSync(user.password, 12);

  // // If email already registered, error
  // // Else store new user in database: register query
  // db.query(
  //   `
  //   INSERT INTO users(name, email, password)
  //   VALUES ($1, $2, $3)
  //   RETURNING *;
  //   `,
  //   [user.firstName + user.lastName, user.email, user.password]
  // )
  // .then((data) => {
  //   const newUser = data.rows[0];
  //   req.session.userId = newUser.id;
  //   res.redirect("/");
  // })
  // .catch((e) => {
  //   res.status(500);
  //   if (e.constraint === "users_email_key") {
  //     templateVars.error = "Email already registered";
  //     res.send("Email already registered");
  //   } else {
  //     res.send(e);
  //   }
  // });
});

module.exports = router;
