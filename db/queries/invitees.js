const db = require('../connection');

const createGuest = (email, name) => {
  return db.query(`INSERT INTO invitees (email, name) VALUES ($1, $2) returning id;`,
    [email, name]).then((data) =>{
    return data.rows[0];
  });
};

module.exports = { createGuest };