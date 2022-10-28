const db = require('../connection');


const createEventTimes = (eventId, dates) => {
  console.log(dates, "test1");
  let query = `INSERT INTO event_times (event_id, start_time, end_time) VALUES ($1, $2, $3)`;
  for (let i = 1; i < dates.length; i++) {
    query += `,($${3 + i}, $${4 + i}, $${5 + i})`;
  }
  query += ' returning *;';
  let values = [eventId, dates[0].dateStart, dates[0].dateEnd];
  for (let i = 1; i < dates.length; i++) {
    values.push(eventId, dates[i]['dateStart' + i], dates[i]['dateEnd' + i]);
  }
  return db.query(query, values).then((data) => {
    console.log(data.rows);
  });
};

const getEventTimesByEventId = (eventId) => {
  return db.query(`SELECT * from event_times
  WHERE event_id = $1;`, [eventId])
    .then(data => {
      return data.rows;
    });
};

module.exports = { createEventTimes, getEventTimesByEventId };
