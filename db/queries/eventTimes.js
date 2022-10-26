const db = require('../connection');


const createEventTimes = (eventId, dates) => {
  console.log(dates);
  let query = `INSERT INTO event_times (event_Id, start_time, end_time) 
  VALUES ($1, $2, $3)`;
  for (let i = 1; i < dates.length; i++) {
    query += `,($${3 + i}, $${4 + i}, $${5 + i})`;
  }
  query += ' returning *;';
  let values = [eventId, dates[0].dateStart, dates[0].dateEnd];
  for (let i = 1; i < dates.length; i++) {
    values.push(eventId,dates[i]['dateStart' + i],dates[i]['dateEnd' + i]);
  }
  console.log(query, values);
  return db.query(query, values).then((data) =>{
    console.log(data.rows);
  });
};

module.exports = {createEventTimes};