const db = require('../connection');

const makeDate = (eventId, inviteeId, eventTimeId) => {
  console.log(eventId, inviteeId, eventTimeId);
  return db.query(`INSERT INTO invitees_dates (event_id, invitee_id, event_time_id) VALUES ($1, $2, $3) returning *;`,
    [eventId, inviteeId, eventTimeId]).then((data) => {
    return data.rows[0];
  });
};

module.exports = { makeDate };