DROP TABLE IF EXISTS invitees CASCADE;
CREATE TABLE invitees (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id),
  email TEXT,
  is_attending BOOLEAN
  -- this means that only one unique email for each event can attend
  -- eliminates duplicate emails per event
);