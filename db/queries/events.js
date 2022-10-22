const db = require('../connection');

const getEvents = (id) => {
  return db.query(`SELECT events.*, users.name AS hostname, users.email, users.phone FROM events
  INNER JOIN users ON users.id = events.organizer_id
  where events.id = ${id};`)
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { getEvents };
