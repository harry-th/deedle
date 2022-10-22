const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT id, email, password FROM users;')
    .then(data => {
      return data.rows;
    });
};
const createUser = (name, email, password) => {
  return db.query(`INSERT INTO users (name, email, password) 
  values($1, $2, $3) RETURNING id`, [name, email, password]).then(data => {
    return data.rows;
  });
};
module.exports = { getUsers, createUser };
