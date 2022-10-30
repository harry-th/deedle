// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
let cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'session',
  keys: ['hello'],
  maxAge: 60 * 60 * 1000
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const accountRoutes = require('./routes/account');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const eventsRoutes = require('./routes/events');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/', accountRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/events', eventsRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
const eventQueries = require('./db/queries/events');
const eventTimesQueries = require('./db/queries/eventTimes');
const inviteeQueries = require('./db/queries/invitees');
const inviteeDates = require('./db/queries/invitees_dates');

const { makeId } = require('./helper');


app.post('/user/create', (req, res) => {

  let { name, email, eventId, attending, timeId } = req.body;
  if (Array.isArray(name)) {
    name = name.filter(item => item)[0]
  }
  if (attending === 'false') {
    attending = false;
  } else {
    attending = true;
  }
  if (req.session.userId?.contact?.name) {
    console.log('deleting')
    inviteeDates.deleteDates(req.session.userId.id, eventId)
  }
  req.session.userId.contact.name = name;
  req.session.userId.contact.email = email;
  console.log(name, email, eventId, attending, timeId)
  let thing = inviteeQueries.createGuest(email, name).then((id) => {
    console.log(id)
    for (const item in req.body) {
      if (!attending) {
        inviteeDates.makeDate(eventId, id.id, timeId, false)
        break;
      } else if (Number(item) && req.body[item] === 'on') {
        inviteeDates.makeDate(eventId, id.id, item, true)
      }
    }
    req.session.userId.id =id.id
     res.redirect(`back`);
  });
});
app.post('/createEvent', (req, res) => {
  let dates = [];
  let { name, email, phone, title, description, location } = req.body;
  for (let item in req.body) {
    if (item.startsWith('dateStart')) {
      let end = item[item.length - 1] !== 't' ? 'dateEnd' + item[item.length - 1] : 'dateEnd';
      dates.push({ [item]: req.body[item], [end]: req.body[end] });
    }
  }
  let parameter = makeId();
  if (dates) {
    eventQueries.createEvent(parameter, name, email, title, description, location, phone).then((id) => {
      eventTimesQueries.createEventTimes(id.id, dates);

      const accessToken = jwt.sign({ name, email }, process.env.ACCESS_TOKEN_SECRET);
      res.redirect(`/events/${parameter}?AuthToken=${accessToken}`);
    });
  }

});



app.get('/', (req, res) => {
  const templateVars = { events: null };
  // if (req.session.userId) {
  //   eventQueries.getEvents(req.session.userId).then((res) => {
  //     templateVars.events = [];
  //     if (res.length > 0) {
  //       for (let event of res) {
  //         templateVars.events.push(event.title);
  //       }
  //     }
  //   }).then(() => {
  //     res.render('index', templateVars);
  //   });
  //   return;
  // }
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
