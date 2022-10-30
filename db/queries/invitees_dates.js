const db = require('../connection');

const makeDate = (eventId, inviteeId, eventTimeId, truth) => {
 
  return db.query(`INSERT INTO invitees_dates (event_id, invitee_id, event_time_id, is_attending) VALUES ($1, $2, $3, $4) returning *;`,
    [eventId, inviteeId, eventTimeId, truth]);
};
//start and end time, name, is_attending
const getDateList = (id) => {
  return db.query(`SELECT invitees_dates.id, event_times.start_time,
  event_times.end_time,
  invitees.name,
  invitees_dates.is_attending
   FROM invitees_dates join event_times
   on invitees_dates.event_id = event_times.event_id
   join invitees on invitees.id = invitees_dates.invitee_id
    WHERE invitees_dates.event_id = $1
    and event_times.id = event_time_id`, [id]).then((data) =>{
    return data.rows;
  });
};

const deleteDates = (inviteeId, eventId) => {
  return db.query(`Delete from invitees_dates where 
  invitee_id = $1 and
  event_id = $2;`, [inviteeId, eventId]);
};
module.exports = { makeDate, getDateList, deleteDates };