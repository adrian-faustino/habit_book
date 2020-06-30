import React from 'react';
/** Reactstrap **/
import { Tooltip } from 'reactstrap';
/** Styles **/
import './HabitCard.css';
/** Helpers **/
import { formatToWords } from '../../helpers/formatHelpers';

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

  return (
    <div className="HabitCard__container">
      <div className="HabitCard__calendar">
        calendar
      </div>
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
