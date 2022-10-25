DROP TABLE IF EXISTS event_times CASCADE;
CREATE TABLE event_times (
  id SERIAL PRIMARY KEY NOT NULL,
 event_id integer references events(id),
 start_time DATE,
 end_time DATE
);