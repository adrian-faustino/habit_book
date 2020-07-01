import React, { useEffect } from 'react';
/** Redux **/
import { useSelector, useDispatch } from 'react-redux';
/** Helpers **/
import { getUserData } from '../../helpers/protectedRouteOnMount';
/** React router **/
import { Redirect } from 'react-router-dom';
/** Subcomponents */
import NewHabit from '../../components/NewHabit/NewHabit';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import HabitCard from '../../components/HabitCard/HabitCard';

const HomePage = () => {
  /** Redux **/
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const refreshCount = useSelector(state => state.counter);
  const user = useSelector(state => state.user);
  const {
    first_name,
    last_name,
    username,
    email,
    user_id
  } = user;

  /** On mount **/
  // sync local storage user info with redux
  useEffect(() => {
    getUserData(dispatch);
  }, []);

  if (!isLogged) return <Redirect to="/welcome"/>
  return (
    <div>
      <h2>
        Welcome to your dashboard {`${username}`}!
      </h2>
      <h4>
        Your stats:
        <ul>
          <li>First name: {first_name}</li>
          <li>Last name: {last_name}</li>
          <li>Username: {username}</li>
          <li>Email: {email}</li>
          <li>Refresh count: {refreshCount}</li>
        </ul>
      </h4>

      <NewHabit />
      {user_id && <CardsContainer />}
    </div>
  )
}

export default HomePage
