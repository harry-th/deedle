DROP TABLE IF EXISTS event_times CASCADE;

CREATE TABLE event_times (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER references events(id),
  start_time TIMESTAMP,
  end_time TIMESTAMP
);
