import React, { useEffect, useState } from 'react'
/** npm **/
import { getHabitsAPIData, getUserAPIData } from '../../helpers/getDataHelpers';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
  const [userObj, setUserObj] = useState({});
  const [userHabits, setUserHabits] = useState([]);

  /** Redux **/
  const counter = useSelector(state => state.counter);

  // get user_id from browser window
  const user_id = window.location.href.split('users/')[1];

  useEffect(() => {
    getUserAPIData(user_id, data => {
      // stretch: set error
      setUserObj(data);
    });
    getHabitsAPIData(user_id, data => {
      // stretch: set error
      setUserHabits(data);
    });
  }, [counter]);

  return (
    <section className="UserPage">
      <UserCard userObj={userObj} />

      <div className="UserPage__habits-container">
        {userHabits.map(habit => (
          <HabitCard key={habit.habit_id} habit={habit} />
        ))}
      </div>

      {userHabits.length === 0 && (
        <span className="UserPage__no-habits">
          This user has no habits yet.
        </span>
      )}
    </section>
  )
}

export default UserPage
