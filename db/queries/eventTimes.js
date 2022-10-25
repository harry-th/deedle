const db = require('../connection');


const createEventTimes = (eventId, dateStart, dateEnd) => {
  return db.query(`INSERT INTO event_times (event_Id, start_time, end_time) 
    VALUES ($1, $2, $3) returning *;`,
  [eventId, dateStart, dateEnd]);
};

module.exports = {createEventTimes};