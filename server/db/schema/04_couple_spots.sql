-- Drop and recreate the Couple-Spots JOIN table

DROP TABLE IF EXISTS couple_spots CASCADE;

CREATE TABLE couple_spots (
  id SERIAL PRIMARY KEY NOT NULL,
  partner1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  partner2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  spot_id INTEGER REFERENCES spots(id) ON DELETE CASCADE,
  partner1_selected BOOLEAN,
  partner2_selected BOOLEAN,
  visited BOOLEAN DEFAULT 'false',
  activities TEXT,
  time VARCHAR(255)
);