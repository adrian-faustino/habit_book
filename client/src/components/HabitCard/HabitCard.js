import React, { useEffect, useState } from 'react';
import axios from 'axios';
/** Subcomponents **/
import CalendarComponent from './CalendarComponent/CalendarComponent';
/** Reactstrap **/
import { Tooltip } from 'reactstrap';
/** Styles **/
import './HabitCard.css';
/** Helpers **/
import { formatToWords } from '../../helpers/formatHelpers';
/** Redux **/
import { useSelector } from 'react-redux';

const HabitCard = ({habit}) => {
  const {
    habit_id,
    title,
    description,
    created_at,
    last_completed_at,
    last_broken_at,
    is_edited,
    user_id
  } = habit;

  const [completedAt, setCompletedAt] = useState([]);

  /* STRETCH: use for auth later */
  const user = useSelector(state => state.user);

  // When each habit loads, get a list of completed days
  useEffect(() => {
    const endpoint =
      process.env.REACT_APP_API +
      `habits/${user_id}/${habit_id}`;

    axios
      .get(endpoint)
      .then(res => {
        const dates = res.data.map(date => {
          return date.completed_at.split('T')[0];
        });
        setCompletedAt(dates);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="HabitCard__container">
      {/* <div className="HabitCard__calendar">
        calendar
      </div> */}
      <CalendarComponent
        completedAt={completedAt}/>
      <div className="HabitCard__data-container">
        <h4 className="HabitCard__title">{title}</h4>
        <span
          className="HabitCard__description">
          {description}
        </span>
        <h5
          className="HabitCard__created-at">
          Created at {formatToWords(created_at)}
        </h5>
      </div>

      <footer className="HabitCard__footer">
        <button>like</button>
        <button>comments</button>
      </footer>
    </div>
  )
}

export default HabitCard
