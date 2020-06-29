import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../../helpers/protectedRouteOnMount';
import { Redirect } from 'react-router-dom';
import NewHabit from '../../components/NewHabit/NewHabit';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import HabitCard from '../../components/HabitCard/HabitCard';

const HomePage = () => {
  const isLogged = useSelector(state => state.isLogged);
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

  if (!isLogged) return <Redirect to="/welcome"/>
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

      <NewHabit />
      <CardsContainer>
        <HabitCard />
      </CardsContainer>
    </div>
  )
}

export default HomePage
