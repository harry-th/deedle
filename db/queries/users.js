const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT id, email, password FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
