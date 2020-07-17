import React, { useEffect, useState } from 'react'
/** Redux **/
import { useSelector } from 'react-redux';
/** Subcomponents **/
import { UserCard } from '../../components';
/** Helpers **/
import { getUserFollowers } from '../../helpers/followDataHelpers';
import { getUserAPIData } from '../../helpers/getDataHelpers';
/** Styles **/
import './FollowersPage.css';

const FollowersPage = () => {
  /** State **/
  const [users, setUsers] = useState([]);

  /** Redux **/
  const user = useSelector(state => state.user);

  useEffect(() => {
    getUserFollowers(user.user_id, (data, err) => {
      if (err) return console.log(err);

      // take follower ID and get full user info
      data.forEach(user => {
        getUserAPIData(user.follower_id, userObj => {
          setUsers(prev => [...prev, userObj]);
        })
      });
    });
  }, []);

  // map for rendering
  const _users = users.map(userObj => {
    return (
      <UserCard
        key={userObj.user_id}
        userObj={userObj} />
    )
  });

  return (
    <section className="navbar-offset">
      followers page
      {_users}
    </section>
  )
}

export default FollowersPage
