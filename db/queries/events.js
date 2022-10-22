const db = require('../connection');

const getEvents = (id) => {
  return db.query(`SELECT title FROM events
  where id = ${id};`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getEvents };
