DROP TABLE IF EXISTS invitees_dates CASCADE;

CREATE TABLE invitees_dates (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER references events(id),
  invitee_id INTEGER references invitees(id),
  event_time_id INTEGER references event_times(id),
  is_attending BOOLEAN default true NOT NULL
);