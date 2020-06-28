import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { logout } from '../../actions';
import { clearUser } from '../../actions/userActions';

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

  if (!username) return null;
  return (
    <div>
      <h4>
        {`Welcome ${first_name}`}
      </h4>

      <Button
        onClick={handleLogout}>
        logout
      </Button>
    </div>
  )
}

export default NavDashboard
