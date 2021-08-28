-- Drop and recreate the User-Spots JOIN table

DROP TABLE IF EXISTS user_spots CASCADE;

CREATE TABLE user_spots (
  id SERIAL PRIMARY KEY NOT NULL,
  partner VARCHAR(255) NOT NULL,
  selected BOOLEAN,
  visited BOOLEAN DEFAULT 'false',
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  spot_id INTEGER REFERENCES spots(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);