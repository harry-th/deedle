-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  organizer_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description text
);
