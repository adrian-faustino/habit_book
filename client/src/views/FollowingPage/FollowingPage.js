import React, { useState, useEffect } from 'react';
/** Helpers **/
import { getMyFollows, getUserFollowers } from '../../helpers/followDataHelpers';
import { getUserAPIData } from '../../helpers/getDataHelpers';
/** Subcomponents **/
import { UserCard } from '../../components';


const FollowingPage = () => {
  /** State **/
  const [users, setUsers] = useState([]);


  // get a list of users the user follows
  useEffect(() => {
    getMyFollows(data => {
      console.log(data)
      data.forEach(user => {
        console.log(user)
        getUserAPIData(user.target_user_id, userObj => {
          setUsers(prev => [...prev, userObj]);
        });
      });
    });
  }, []);

  // map for rendering
  const _users = users.map(userObj => {
    return (
      <UserCard 
        key={userObj.user_id}
        userObj={userObj} />
    );
  });

  return (
    <div className="FollowingPage navbar-offset">
      <h3>
        {users.length === 0 ? 'You are not following anyone.' : 'Here are the users you follow!'}
      </h3>

      {_users}
    </div>
  );
};

export default FollowingPage;
