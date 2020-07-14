import React, { useState } from 'react';
/** Subcomponents **/
import Calendar from 'react-calendar';
/** Styles **/
import './CalendarComponent.css';
/** Helpers **/
import { getDateYYYYMMDD } from '../../../helpers/dateObjHelpers';
import { createCompletedAt } from '../../../helpers/CalendarHelpers';
/** Redux **/
import { useDispatch, useSelector } from 'react-redux';
/** Redux-actions **/
import { increment } from '../../../actions';

/** Calendar classnames constants **/
const CALENDAR_SELECTED = 'CalendarComponent__selected';
const CALENDAR_TODAY = 'CalendarComponent__today';

/** Constants **/
const ERR_TIMEOUT_FADE = 2000 // time in ms

/* Props notes:
/* completedAt is an array of dates in the same format as what is 
/*  returned from getDateYYYYMMDD function */
const CalendarComponent = props => {
  const { completedAt,
          user_id,
          habit_id,
          setErr,
          setSuccess } = props;

  /** State **/
  const [value, setValue] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  /** Redux **/
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  // when user clicks a tile on the calendar...
  const handleClickDay = async (value, e) => {
    setValue(value);
    // check if habit belongs to user
    if (user.user_id !== props.user_id) {
      setErr('This habit does not belong to you.');
      return console.log('This habit does not belong to you.');
    }
    
    // check if day is not in completedAt[]
    const isSelected = (e.target.className).includes(CALENDAR_SELECTED);
    if (isSelected) return console.log('Already marked blue.');

    // check if day is not in future
    if (getDateYYYYMMDD(value) > getDateYYYYMMDD(new Date())) {

      // clear present feedback and set new feedback
      setErr('');
      setSuccess('');
      setErr('Cannot set future date.');
      return setTimeout(() => {
        setErr('');
      }, ERR_TIMEOUT_FADE);
    }

    // request to create completed_at
    // TODO: change this to .ISOSstring
    console.log('Requesting new completed_at...');
    const date = getDateYYYYMMDD(value);

    setIsLoading(true);
    createCompletedAt(date, user_id, habit_id, res => {
      // trigger view update
      dispatch(increment(1));

      // clear present feedback and set new feedback
      setErr('');
      setSuccess('');
      setSuccess('Day marked complete!');
      setIsLoading(false);
      setTimeout(() => {
        setSuccess('');
      }, ERR_TIMEOUT_FADE);
    });
  };

  // this sets the color on completed days
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

  // if habit card doesn't belong to use, disable mouse events
  let unclickable;
  if (user.user_id !== props.user_id) {
    unclickable = 'unclickable';
  } else if (isLoading) {
    unclickable = 'unclickable';
  };

  return (
    <section
      className={`CalendarComponent ${unclickable}`}>
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
