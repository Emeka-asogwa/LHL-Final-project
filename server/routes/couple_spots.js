const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM couple_spots;`)
    .then((data) => {
      res.json(data.rows);
    })
  });

  router.post('/mutual', (req, res) => {
    const { userID } = req.body;
    db.query(`
      SELECT spot_id FROM couple_spots
      WHERE (partner1_id = $1 OR partner2_id = $2)
      AND partner1_selected = 't' AND partner2_selected = 't'; 
    `, [userID, userID])
    .then((data) => {
      res.json(data.rows);
    })
  });

  router.post('/', (req, res) => {
    console.log(req.body);
    const { user_id, partner_id, spot_id, selected } = req.body;
    db.query(
      `
      SELECT * FROM couple_spots
      WHERE partner2_id = $1 AND spot_id = $2;
      `,
      [partner_id, spot_id]
    )
    .then((data) => {
      if(data.rows.length !== 0) {
        db.query(
          `
          UPDATE couple_spots
          SET partner1_id = $1, partner1_selected = $2
          WHERE id = $3;
          `, [user_id, selected, data.rows[0].id]
        )
      } 
      else {
        db.query(
          `
          SELECT * FROM couple_spots
          WHERE partner1_id = $1 AND spot_id = $2;
          `,
          [partner_id, spot_id]
        )
        .then((data) => {
          if(data.rows.length !== 0) {
            db.query(
              `
              UPDATE couple_spots
              SET partner2_id = $1, partner2_selected = $2
              WHERE id = $3;
              `, [user_id, selected, data.rows[0].id]
            )
          } else {
            db.query(
              `
              INSERT INTO couple_spots(partner1_id, partner1_selected, spot_id)
              VALUES($1, $2, $3);
              `, [user_id, selected, spot_id]
            )
          }
        })
      }
      res.sendStatus(200);
    })
  });

  return router;
};