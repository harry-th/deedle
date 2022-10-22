/*
 * All routes for events are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const userQueries = require('../db/queries/events');

router.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(404);
    return;
  }
  const event = userQueries.getEvents(req.params.id)
    .then(data => {
      res.render('event',
        {
          event:
          {
            title: data.title, hostname: data.hostname, phone: data.phone, email: data.email, description: data.description,
            location: `${data.address}, ${data.city}, ${data.province}, ${data.post_code}, ${data.country}`, date: data.date
          }
        });
    });
});

module.exports = router;
