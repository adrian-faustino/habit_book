import React, { useState } from 'react';
/** Subcomponents **/
import Calendar from 'react-calendar';
/** Styles **/
import './CalendarComponent.css';
/** Helpers **/
import { getDateYYYYMMDD } from '../../../helpers/dateObjHelpers';
import { createCompletedAt } from '../../../helpers/CalendarHelpers';

/** Calendar classnames constants **/
const CALENDAR_SELECTED = 'CalendarComponent__selected';
const CALENDAR_TODAY = 'CalendarComponent__today';

/* Props notes:
/* completedAt is an array of dates in the same format as what is 
/*  returned from getDateYYYYMMDD function */
const CalendarComponent = props => {
  const { completedAt, user_id, habit_id } = props;
  const [value, setValue] = useState(new Date());


  const handleClickDay = (value, e) => {
    setValue(value);
    
    console.log('Cicked day,', getDateYYYYMMDD(value));
    console.log('List of days', completedAt);
    // check if day is not in completedAt[]


    // request to create completed_at
    const date = getDateYYYYMMDD(value);
    createCompletedAt(date, user_id, habit_id);

    // trigger change
  }

  const highlightRange = ({ date, view }) => {
    if (view === 'month') {
      const _date = getDateYYYYMMDD(date);
      const today = getDateYYYYMMDD(new Date());

      // highlight completed days in the past
      if (completedAt.includes(_date)) return CALENDAR_SELECTED;
      // highlight today
      if (_date === today) return CALENDAR_TODAY;
    }
  };

  return (
    <section
      className="CalendarComponent">
      <Calendar
        value={value}
        onClickDay={handleClickDay}
        tileClassName={highlightRange}
      />

      {/* <hr />
      <button onClick={e => {
        e.preventDefault();
      }}>
        stats
      </button> */}
    </section>
  );
};

export default CalendarComponent;
