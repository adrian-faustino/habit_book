import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../../helpers/protectedRouteOnMount';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUserData(dispatch);
  }, []);

  const user = useSelector(state => state.user);
  const {
    first_name,
    last_name,
    username,
    email
  } = user;

  return (
    <div>
      <h2>
        Welcome to your dashboard {`${username}`}!
      </h2>
      <h4>
        Your stats:
        <ul>
          <li>{}</li>
          <li>First name: {first_name}</li>
          <li>Last name: {last_name}</li>
          <li>Username: {username}</li>
          <li>Email: {email}</li>
        </ul>
      </h4>
    </div>
  )
}

export default HomePage
