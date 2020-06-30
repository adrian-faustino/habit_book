import React, { useState } from 'react';
/** Subcomponents **/
import Calendar from 'react-calendar';
/** Styles **/
import './CalendarComponent.css';
/** Helpers **/
import { getDateYYYYMMDD } from '../../../helpers/dateObjHelpers';


/** Constants **/
const CALENDAR_SELECTED = 'CalendarComponent__selected';

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());

  const handleClickDay = (value, e) => {
    console.log('Cicked day,', value, e);
    setValue(value);
  }

  // sets the color of the last selected date tile
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const _date = getDateYYYYMMDD(date);
      const _value = getDateYYYYMMDD(value);
      if (_date === _value) {
        return CALENDAR_SELECTED;
      }
    }
  };


  return (
    <section
      className="CalendarComponent">
      <Calendar
        value={value}
        onClickDay={handleClickDay}
        tileClassName={tileClassName}
      />

      <hr />
      <button onClick={e => {
        e.preventDefault();
        console.log(getDateYYYYMMDD(value));
      }}>
        stats
      </button>
    </section>
  );
};

export default CalendarComponent;
