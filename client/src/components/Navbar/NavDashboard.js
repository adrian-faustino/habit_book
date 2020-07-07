import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { logout } from '../../actions';
import { clearUser } from '../../actions/userActions';
import './NavDashboard.css';

const NavDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {
    first_name,
    last_name,
    username,
    email
  } = user;

  const handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    dispatch(logout());
    dispatch(clearUser());
  };

  return (
    <div
      className="NavDashboard__container">
      <span 
        className="NavDashboard__welcome-span">
        {`Welcome, ${first_name}`}
      </span>

      <Button
        className="NavDashboard__button"
        onClick={() => console.log(localStorage)}>
        localstorage
      </Button>

      <Button
        className="NavDashboard__button"
        onClick={handleLogout}>
        logout
      </Button>
    </div>
  )
}

export default NavDashboard
