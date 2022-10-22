-- Widgets table seeds here (Example)
INSERT INTO events (organizer_id, title, description, date, address, city, province, post_code, country) VALUES (1, 'party','a party', '2022-05-23', '5 Muffin Lane', 'Toronto', 'Ontario', 'M6G3G9', 'Canada' );
INSERT INTO events (organizer_id,title, description, date, address, city, province, post_code, country) VALUES (2, 'concert', 'a concert', '2021-10-25', '80 Dream Ave', 'Montreal', 'Quebec', 'V2Q0U7', 'Canada');
-- INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);

INSERT INTO event_attendees (
  event_id,
  attendee_email,
  is_attending
) VALUES (
  1,
  'evan.trippel@yahoo.com',
  TRUE
);

INSERT INTO event_attendees (
  event_id,
  attendee_email,
  is_attending
) VALUES (
  1,
  'mnunes67@hotmail.com',
  FALSE
);

INSERT INTO event_attendees (
  event_id,
  attendee_email,
  is_attending
) VALUES (
  2,
  'mnunes67@hotmail.com',
  FALSE
);
