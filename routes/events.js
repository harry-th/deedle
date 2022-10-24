/*
 * All routes for events are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const eventQueries = require('../db/queries/events');
const jwt = require('jsonwebtoken');



router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/:id', (req, res) => {
  let { id } = req.params;

  if (req.query.AuthToken) {
    jwt.verify(req.query.AuthToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(user);
      if (err) return console.log('fail'), res.sendStatus(403);
      else {
        req.user = user;
      }
    });
  } else {
    if (!req.session.userId) {
      req.session.userId = {events:[id],contact: {name:undefined, email:undefined}};
    } else if (!req.session.userId.events.includes(id)) {
      req.session.userId.events.push(id);
    }
  }
  req.session.userId.contact.name = 'harry';
  console.log(req.session.userId, req.user);
  eventQueries.getEventsDetails(id)
    .then((data) => {
      if (!data) {
        res.redirect('/');
        return;
      }
      res.render('event',
        {
          event:
          {
            title: data.title, hostname: data.hostname, phone: data.phone, email: data.email, description: data.description,
            address: data.address, city: data.city, province: data.province, post_code: data.post_code, country: data.country, date: data.date
          },
          user: req.user,
          guest: req.session.userId
        });
    });
});



// router.get('/placeEvent', (req, res) => {
//   let id;
  
// });





module.exports = router;
