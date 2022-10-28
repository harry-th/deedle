-- Widgets table seeds here (Example)
INSERT INTO
  events (
    PARAMETER,
    name,
    email,
    phone,
    title,
    description,
    location
  )
VALUES
  (
    'COXNv6',
    'evan trippel',
    'evan@trippel.com',
    '555 669 1234',
    'Party',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    'My Place'
  );

  INSERT INTO
    event_times (
      event_id,
      start_time,
      end_time
    )
    VALUES(
      1,
      NOW(),
      NOW()
    );
