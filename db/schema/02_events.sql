-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS event_attendees CASCADE;
DROP TABLE IF EXISTS events CASCADE;

-- All the details of a particular event
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  organizer_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  is_virtual BOOLEAN NOT NULL DEFAULT FALSE,
  meeting_link TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  post_code TEXT NOT NULL,
  country TEXT
);

-- Junction table to track emails of invitees
CREATE TABLE event_attendees (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id),
  attendee_email TEXT,
  is_attending BOOLEAN NOT NULL,
  UNIQUE (event_id, attendee_email)
  -- this means that only one unique email for each event can attend
  -- eliminates duplicate emails per event
);

-- Comments specific to an event
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id),
  date DATE,
  description TEXT
);
