const db = require('../connection');

const makeDate = (eventId, inviteeId, eventTimeId, truth) => {
  if (!truth) {
    return db.query(`INSERT INTO invitees_dates (event_id, invitee_id, event_time_id, is_attending) VALUES ($1, $2, $3, $4) returning *;`,
      [eventId, inviteeId, eventTimeId, truth]).then((data) => {
      return data.rows[0];
    });
  } else
    return db.query(`INSERT INTO invitees_dates (event_id, invitee_id, event_time_id, is_attending) VALUES ($1, $2, $3, $4) returning *;`,
      [eventId, inviteeId, eventTimeId, truth]).then((data) => {
      return data.rows[0];
    });
};
//start and end time, name, is_attending
const getDateList = (id) => {
  console.log('getDateList');
  return db.query(`SELECT event_times.start_time,
  event_times.end_time,
  invitees.name,
  invitees_dates.is_attending
   FROM invitees_dates join event_times
   on invitees_dates.event_id = event_times.event_id
   join invitees on invitees.id = invitees_dates.invitee_id
    WHERE invitees_dates.event_id = $1`, [id]).then((data) =>{
    return data.rows;
  });
};

module.exports = { makeDate, getDateList };