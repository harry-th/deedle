const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT id, email, password FROM users;')
    .then(data => {
      return data.rows;
    });
};
const createUser = (email, password) => {
  return db.query(`INSERT INTO users (email, password) 
  values($1, $2) RETURNING id`, [email, password]);
};
module.exports = { getUsers, createUser };
