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
const createEvent = (parameter, name, email, title, description, location) => {
  return db.query(`INSERT INTO events (parameter, name, email, title, description, location) 
  VALUES ($1, $2, $3, $4, $5, $6) returning id;`,
  [parameter, name, email, title, description, location]).then(data => {
    return data.rows[0];
  });
};
module.exports = { getEvents, getEventsDetails, createEvent };




// return db.query(`SELECT events.*, users.name AS hostname, users.email, users.phone FROM events
//   INNER JOIN users ON users.id = events.organizer_id
//   where events.parameter = $1;`,[id])