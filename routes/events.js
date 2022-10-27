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
const eventTimesQueries = require('../db/queries/eventTimes');
const moment = require('moment');



router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/:id', (req, res) => {
  console.log('hello');
  let { id } = req.params;
  if (req.query.AuthToken) {
    jwt.verify(req.query.AuthToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return console.log('fail'), res.sendStatus(403);
      else {
        req.user = user;
      }
    });
  } else {
    if (!req.session.userId) {
      req.session.userId = { events: [id], contact: { name: undefined, email: undefined } };
    } else if (!req.session.userId.events.includes(id)) {
      req.session.userId.events.push(id);
    }
  }
  //need to find a way to get the eventid by userid

  eventQueries.getEventsDetails(id)
    .then((data) => {
      if (!data) {
        res.redirect('/');
        return;
      }
      eventTimesQueries.getEventTimesByEventId(data.id)
        .then((eventTimesData) => {
          res.render('event',
            {
              // var d = "06-24-2016 02:18:13 PM";
              // alert(moment(d, "MM-DD-YYYY HH:mm:ss A").format("MMMM Do YYYY"))
              eventTimes: eventTimesData.map((time) => ({
                id: time.id,
                startDate: moment(time.start_time, "MM-DD-YYYY HH:mm:ss A").format('MMMM Do YYYY'),
                endDate: moment(time.end_time, "MM-DD-YYYY HH:mm:ss A").format('MMMM Do YYYY'),
                startTime: moment(time.start_time, "MM-DD-YYYY HH:mm:ss A").format('h:mm a'),
                endTime: moment(time.end_time, "MM-DD-YYYY HH:mm:ss A").format('h:mm a')
              })),
              event:
              {
                id: data.id, title: data.title, description: data.description,
              },
              user: req.user,
              guest: req.session.userId || false,
            });
        });
    });
});



// router.get('/placeEvent', (req, res) => {
//   let id;

// });
// event:
// {
//   title: data.title, hostname: data.hostname, phone: data.phone, email: data.email, description: data.description,
//   address: data.address, city: data.city, province: data.province, post_code: data.post_code, country: data.country, date: data.date
// },




module.exports = router;
