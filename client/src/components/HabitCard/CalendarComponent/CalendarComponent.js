import React, { useState } from 'react';
/** Subcomponents **/
import Calendar from 'react-calendar';
/** Styles **/
import './CalendarComponent.css';
/** Helpers **/
import { getDateYYYYMMDD } from '../../../helpers/dateObjHelpers';

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
    /** Constants **/
    // to add successful day highlight css class
    const CALENDAR_SELECTED = 'CalendarComponent__selected';
    if (view === 'month') {
      const _date = getDateYYYYMMDD(date);
      if (completedAt.includes(_date)) return CALENDAR_SELECTED;
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

      <hr />
      <button onClick={e => {
        e.preventDefault();
      }}>
        stats
      </button>
    </section>
  );
};

export default CalendarComponent;
