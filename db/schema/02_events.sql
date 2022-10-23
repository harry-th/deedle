-- Drop and recreate Widgets table (Example)

-- All the details of a particular event
DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  organizer_id INTEGER REFERENCES users(id),
  parameter VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  post_code TEXT NOT NULL,
  country TEXT
);

-- Junction table to track emails of invitees

-- DROP TABLE IF EXISTS events CASCADE;
-- CREATE TABLE events (
--   id SERIAL PRIMARY KEY NOT NULL,
--   organizer_id INTEGER REFERENCES users(id),
--   title VARCHAR(255) NOT NULL,
--   description TEXT,
--   date DATE NOT NULL,
--   is_virtual BOOLEAN NOT NULL DEFAULT FALSE,
--   meeting_link TEXT,
--   address TEXT NOT NULL,
--   city TEXT NOT NULL,
--   province TEXT NOT NULL,
--   post_code TEXT NOT NULL,
--   country TEXT
-- );

