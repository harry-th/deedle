const db = require('../connection');

const createGuest = (email, name) => {
  return db.query(`INSERT INTO invitees (email, name) VALUES ($1, $2) returning id;`,
    [email, name]);
};

module.exports = { createGuest };