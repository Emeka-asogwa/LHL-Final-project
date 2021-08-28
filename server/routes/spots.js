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

  return router;
};

