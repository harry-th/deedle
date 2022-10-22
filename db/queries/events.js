const db = require('../connection');

const getEvents = () => {
  return db.query('SELECT title FROM events;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getEvents };
