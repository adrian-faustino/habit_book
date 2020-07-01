import React, { useState } from 'react';
/** Subcomponents **/
import Calendar from 'react-calendar';
/** Styles **/
import './CalendarComponent.css';
/** Helpers **/
import { getDateYYYYMMDD } from '../../../helpers/dateObjHelpers';

/** Calendar classnames constants **/
const CALENDAR_SELECTED = 'CalendarComponent__selected';
const CALENDAR_TODAY = 'CalendarComponent__today';

/* Props notes:
/* completedAt is an array of dates in the same format as what is 
/*  returned from getDateYYYYMMDD function */
const CalendarComponent = props => {
  const { completedAt } = props;
  const [value, setValue] = useState(new Date());


  const handleClickDay = (value, e) => {
    console.log('Cicked day,', value, e);
    setValue(value);
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
