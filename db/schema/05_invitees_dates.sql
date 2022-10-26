DROP TABLE IF EXISTS event_times CASCADE;
CREATE TABLE event_times (
  id SERIAL PRIMARY KEY NOT NULL,
 event_id integer references events(id),
 invitee_id integer references invitees(id),
 event_time_id integer references event_times(id),
 is_attending BOOLEAN 
);