/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


router.post('/login', (request, response) => {
  let {email, password} = request.body;
  userQueries.getUsers().then((res) => {
    for (let set of res) {
      if (set.email === email && set.password === password) {
        request.session.userId = set.id;
        response.redirect('/');
        return;
      }
    }
  });
});
router.post('/register', (req, res) => {

  let {email, password} = req.body;
  userQueries.getUsers().then((res) => {
    for (let set of res) {
      if (set.email === email) {
        return;
      }
    }
    userQueries.createUser(email, password).then((id) => {
      req.session.userId = id;
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
