const db = require('../connection');

const getEvents = (id) => {
  return db.query(`SELECT title FROM events
  where id = ${id};`)
    .then(data => {
      return data.rows;
    });
};
const getEventsDetails = (id) => {
  return db.query(`SELECT * from events
  where parameter = $1;`,[id])
    .then(data => {
      return data.rows[0];
    });
};
const createEvent = (parameter, title, description) => {
  return db.query(`INSERT INTO events (parameter, title, description) VALUES ($1, $2, $3);`,[parameter, title, description]);
};
module.exports = { getEvents, getEventsDetails, createEvent };




// return db.query(`SELECT events.*, users.name AS hostname, users.email, users.phone FROM events
//   INNER JOIN users ON users.id = events.organizer_id
//   where events.parameter = $1;`,[id])