import React, { useEffect, useState } from 'react'
import axios from 'axios';
/** Subcomponents **/
import { UserCard } from '../../components/';
/** Styles **/
import './UserPage.css';

// This view is used to display another user's page (not current user)

const UserPage = () => {
  /** State **/
  const [userObj, setUserObj] = useState([]);
  const [userHabits, setUserHabits] = useState([]);

  useEffect(() => {
    // get user_id from browser window
    const user_id = window.location.href.split('users/')[1];

    getUserInfo(user_id);
    getHabits(user_id);
  }, []);

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
      ``;
  };


  return (
    <section className="UserPage">
      {userObj.map(user => (<UserCard userObj={user} />))}
    </section>
  )
}

export default UserPage
