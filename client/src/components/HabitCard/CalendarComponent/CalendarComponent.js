import React, { useState } from 'react';
/** Subcomponents **/
import Calendar from 'react-calendar';
/** Styles **/
import './CalendarComponent.css';
/** Helpers **/
import { highlightRange, getRange } from '../../../helpers/CalendarHelpers';


const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());

  const handleClickDay = (value, e) => {
    console.log('Cicked day,', value, e);
    setValue(value);
  }

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
