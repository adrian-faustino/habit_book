import React from 'react'
/** Reactstrap **/
import { Button } from 'reactstrap';
/** Styles **/
import './UserSearchBar.css';

const UserSearchBar = () => {
  return (
    <form className="UserSearchBar__form">
      <div className="UserSearchBar__input-group">
        <input
          className="UserSearchBar__input-field"
          placeholder="find other users..."/>
        <Button
          className="UserSearchBar__button"
          type="submit">
            Search
        </Button>
      </div>
    </form>
  )
}

export default UserSearchBar
