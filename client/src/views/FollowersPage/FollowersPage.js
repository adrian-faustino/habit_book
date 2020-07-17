import React, { useEffect, useState } from 'react'
/** Helpers **/
import { getUserFollowers } from '../../helpers/followDataHelpers';
/** Styles **/
import './FollowersPage.css';

const FollowersPage = () => {
  /** State **/
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserFollowers(1, (data, err) => {
      if (err) return console.log(err);
      console.log('Data!', data);
      setUsers(data);
    });
  }, []);

  return (
    <section className="navbar-offset">
      followers page
    </section>
  )
}

export default FollowersPage
