/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const bcrypt = require('bcryptjs');


router.post('/login', (request, response) => {
  let {email, password} = request.body;
  userQueries.getUsers().then((res) => {
    for (let set of res) {
      //will need to descrypt passwords
      if (set.email === email && set.password === password) {
        request.session.userId = set.id;
        response.redirect('/');
        return;
      }
    }
    response.redirect('/');
  });
  
});
router.post('/register', (request, response) => {
  let {name, email, password} = request.body;
  userQueries.getUsers().then((res) => {
    for (let set of res) {
      if (set.email === email) {
        response.redirect('/');
        return;
      }
    }
  }).then(() => {
    password = bcrypt.hashSync(password, 10);
    userQueries.createUser(name, email, password).then((id) => {
      request.session.userId = id[0].id;
      response.redirect('/');
      return;
    });
  });
});


// router.get('/', (req, res) => {
//   userQueries.getUsers()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

module.exports = router;
