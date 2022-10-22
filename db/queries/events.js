const db = require('../connection');

const getEvents = (req) => {
  return db.query(`SELECT title FROM events
  where id = ${req.session.userId};`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getEvents };
