/*
 * All routes for events are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const eventQueries = require('../db/queries/events');

router.get('/', (req, res) => {
  res.redirect('/');
});
router.get('/:id', (req, res) => {
  // if (!req.params.id) {
  //   res.status(404);
  //   return;
  // }
  let { id } = req.params;
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
          }
        });
    });
});

module.exports = router;
