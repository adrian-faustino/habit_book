import React from 'react'
/** Redux **/
import { useSelector, useDispatch } from 'react-redux';
/** Redux actions */
import { clearUser } from '../../actions/userActions';
import { logout } from '../../actions';
/** Reactstrap */
import { Button } from 'reactstrap';
/** React router **/
import { useHistory } from 'react-router';
/** Styles **/
import './NavDashboard.css';

const NavDashboard = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {
    first_name,
    last_name,
    username,
    email
  } = user;

  const { push } = useHistory();

  const handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    dispatch(logout());
    dispatch(clearUser());

    // refresh local storage
    window.location.reload();

    // trigger view change
    push('/');
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
