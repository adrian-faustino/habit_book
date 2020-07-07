import React from 'react'
/** Styles **/
import './UserCard.css';

const UserCard = ({ userObj }) => {
  const {
    avatar_url,
    created_at,
    email,
    first_name,
    last_name,
    is_active,
    username
  } = userObj;

  return (
    <div className="UserCard__container">
      <div className="UserCard__left-container">
        <img
          className="UserCard__avatar"
          src={avatar_url}/>

        <span
          className="UserCard__username">
            @{username}
        </span>
      </div>

      <div className="UserCard__right-container">
        <span
          className="UserCard__full-name">
            {first_name} {last_name}
        </span>

        <span
          className="UserCard__email">
          Email: {email}
        </span>

        <span
          className="UserCard__created-at">
            Member since {created_at}
        </span>
      </div>
    </div>
  )
}

export default UserCard
