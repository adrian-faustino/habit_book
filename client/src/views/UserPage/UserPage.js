import React, { useEffect, useState } from 'react'
import axios from 'axios';
/** Subcomponents **/
import { UserCard } from '../../components/';
/** Styles **/
import './UserPage.css';
import HabitCard from '../../components/HabitCard/HabitCard';
/** Redux **/
import { useSelector } from 'react-redux';

// This view is used to display another user's page (not current user)

const UserPage = () => {
  /** State **/
  const [userObj, setUserObj] = useState([]);
  const [userHabits, setUserHabits] = useState([]);

  /** Redux **/
  const counter = useSelector(state => state.counter);

  // get user_id from browser window
  const user_id = window.location.href.split('users/')[1];

  useEffect(() => {
    getUserInfo(user_id);
    getHabits(user_id);
  }, [counter]);

  const getUserInfo = async user_id => {
    console.log('Fetching user data for:', user_id);

    const endpoint = process.env.REACT_APP_API +
      `users/${user_id}`;
    
    axios
      .get(endpoint)
      .then(res => {
        console.log('Data', res.data);
        setUserObj(res.data);
      })
      .catch(err => console.log(err));
  };

  const getHabits = async user_id => {
    console.log('Fetching user habits for:', user_id);
    const endpoint = process.env.REACT_APP_API +
      `habits/${user_id}`;
    
    axios
      .get(endpoint)
      .then(res => {
        console.log('This user habits', res.data);
        setUserHabits(res.data);
      })
      .catch(err => console.log(err));
  };


  return (
    <section className="UserPage">
      {userObj.map(user => (<UserCard key={user_id} userObj={user} />))}

      <div className="UserPage__habits-container">
        {userHabits.map(habit => (
          <HabitCard key={habit.habit_id} habit={habit} />
        ))}
      </div>
    </section>
  )
}

export default UserPage
