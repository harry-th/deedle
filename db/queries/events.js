const db = require('../connection');

const getEvents = (id) => {
  return db.query(`SELECT title FROM events
  where id = ${id};`)
    .then(data => {
      return data.rows;
    });
};
const getEventsDetails = (id) => {
  return db.query(`SELECT events.*, users.name AS hostname, users.email, users.phone FROM events
  INNER JOIN users ON users.id = events.organizer_id
  where events.parameter = $1;`,[id])
    .then(data => {
      return data.rows[0];
    });
};
module.exports = { getEvents, getEventsDetails };
