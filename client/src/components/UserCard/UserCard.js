import React, { useEffect, useState } from 'react'
/** Helpers **/
import { getUserHabitCountAPIData } from '../../helpers/getDataHelpers';
import { formatToWords } from '../../helpers/formatHelpers';
/** Styles **/
import './UserCard.css';
/** React router **/
import { Link } from 'react-router-dom';
/** Redux **/
import { useSelector } from 'react-redux';
/** Reactstrap **/
import { Button } from 'reactstrap';

const UserCard = ({ userObj }) => {
  const {
    user_id,
    avatar_url,
    created_at,
    email,
    first_name,
    last_name,
    is_active,
    username
  } = userObj;

  /** State **/
  const [habitCount, setHabitCount] = useState('');

  /** Redux **/
  const counter = useSelector(state => state.counter);
  const user = useSelector(state => state.user);

  useEffect(() => {
    getUserHabitCountAPIData(user_id, data => {
      setHabitCount(data);
    });
  }, [counter]);

  const handleFollowUser = e => {
    e.preventDefault();

    console.log('following user...');
  }

  return (
    <div className="UserCard__container">

      <Link to={`/users/${user_id}`}>
        <div className="UserCard__left-container">
          <img
            className="UserCard__avatar"
            src={avatar_url}/>

          <span
            className="UserCard__username">
              @{username}
          </span>
        </div>
      </Link>

      <div className="UserCard__right-container">
        <span
          className="UserCard__full-name">
            <Link to={`/users/${user_id}`}>
              {first_name} {last_name}
            </Link>
        </span>

        <span
          className="UserCard__email">
          Email: {email}
        </span>

        <span
          className="UserCard__habit-count">
            Habits: {habitCount}
        </span>

        <span
          className="UserCard__created-at">
            Member since {formatToWords(created_at)}
        </span>

        {user.user_id !== user_id && (
          <Button
            onClick={handleFollowUser}
            className="UserCard__follow-button">
              Follow user
          </Button>
        )}
      </div>
    </div>
  )
}

export default UserCard
