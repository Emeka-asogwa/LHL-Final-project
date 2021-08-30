const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM user_spots;`)
    .then((data) => {
      res.json(data.rows);
    })
  });

  router.get('/mutual', (req, res) => {
    db.query(`SELECT spot_id FROM user_spots;`)
    .then((data) => {
      res.json(data.rows);
    })
  });

  router.post('/', (req, res) => {
    const { partner, selected, user_id, spot_id } = req.body;
    db.query(
      `
      INSERT INTO user_spots(partner, selected, user_id, spot_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [partner, selected, user_id, spot_id]
    )
    .then((data) => {
      console.log("User Spot created successfully")
      res.sendStatus(200);
    })
  });

  return router;
};