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
import { handleDeleteCard } from '../../helpers/habitDataHelpers';
/** Redux **/
import { useSelector, useDispatch } from 'react-redux';

const HabitCard = ({habit}) => {
  /** Props **/
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

  /** State **/
  const [completedAt, setCompletedAt] = useState([]);
  const [isMyHabit, setIsMyHabit] = useState(false);

  /** Redux **/
  const dispatch = useDispatch();

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
  
  // If this habit belongs to this user, display delete btn
  const _user_id = useSelector(state => state.user.user_id);
  useEffect(() => {
    if (habit.user_id === _user_id) {
      setIsMyHabit(true);
    }
  }, []);


  return (
    <div className="HabitCard__container">
      <CalendarComponent
        habit_id={habit_id}
        user_id={user_id}
        completedAt={completedAt}/>
      <div className="HabitCard__data-container">
        <h4 className="HabitCard__title">{title}</h4>
        <span
          className="HabitCard__description">
          {description ? description : <i>No description provided.</i>}
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

      {isMyHabit && (<button
        onClick={e => handleDeleteCard(e, _user_id, habit_id, dispatch)}
        className="HabitCard__delete-card-btn">
          delete
      </button>)}
    </div>
  )
}

export default HabitCard
