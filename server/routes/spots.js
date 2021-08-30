const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM spots;`)
    .then((data) => {
      res.json(data.rows);
    })
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM spots WHERE id = $1;`, [id])
    .then((data) => {
      res.json(data.rows[0]);
    })
  });

  router.post('/', (req, res) => {
    const { title, description, spotLocation, url, imageUrl } = req.body;
    console.log(req.body);
    db.query(
      `
      INSERT INTO spots(title, description, location, url, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [title, description, spotLocation, url, imageUrl]
    )
    .then((data) => {
      console.log("Spot created successfully")
      res.sendStatus(200);
    })
    .catch(e => console.log(e));
  });

  return router;
};

