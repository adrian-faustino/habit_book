import React, { useEffect, useState } from 'react'
/** Helpers **/
import { getHabitsAPIData, getUserAPIData } from '../../helpers/getDataHelpers';
import { getUserFollowers, getUserFollowing } from '../../helpers/followDataHelpers';
/** npm **/
import { v4 as uuidv4 } from 'uuid';
/** Subcomponents **/
import { UserCard } from '../../components/';
/** Styles **/
import './UserPage.css';
import HabitCard from '../../components/HabitCard/HabitCard';
/** Redux **/
import { useSelector } from 'react-redux';
/** Reactstrap **/
import { ButtonGroup, Button } from 'reactstrap';

/** Constants **/
/* these variables are for the 3 buttons
 * in the button group */
const HABITS = 'Habits';
const FOLLOWERS = 'Followers';
const FOLLOWING = 'Following';

// This view is used to display another user's page (not current user)
const UserPage = () => {
  /** State **/
  const [userObj, setUserObj] = useState({});
  const [userHabits, setUserHabits] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [toggledData, setToggledData] = useState(HABITS);

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

  const handleSwitchTab = e => {
    e.preventDefault();

    console.log(e.target.innerHTML);
    switch (e.target.innerHTML) {
      case HABITS:
        setToggledData(HABITS);
        getHabitsAPIData(user_id, data => {
          // stretch: set error
          setUserHabits(data);
        });
        break;
      case FOLLOWERS:
        setToggledData(FOLLOWERS);
        getUserFollowers(user_id, data => {
          console.log('followers:', data);
          setUserFollowers(data);
        });
        break;
      case FOLLOWING:
        setToggledData(FOLLOWING);
        getUserFollowing(user_id, data => {
          console.log('following:', data)
          setUserFollowing(data);
        });
        break;
    }
  }

  // returns a mapped array for rendering based on the current toggled view (3 buttons)
  const spreadToggledData = () => {
    switch (toggledData) {
      case HABITS:
        return userHabits.map(habit => {
          return <HabitCard key={uuidv4()} habit={habit} />
        });
      case FOLLOWERS:
        return userFollowers.map(userObj => {
          return <UserCard key={uuidv4()} userObj={userObj} />
        });
      case FOLLOWING:
        return userFollowing.map(userObj => {
          return <UserCard key={uuidv4()} userObj={userObj} />
        });
    }
  }

  // return jsx based on current toggled data
  const spread = spreadToggledData();

  return (
    <section className="UserPage">
      <UserCard userObj={userObj} />

      <ButtonGroup>
        <Button onClick={handleSwitchTab}>
          {HABITS}
        </Button>
        <Button onClick={handleSwitchTab}>
          {FOLLOWERS}
        </Button>
        <Button onClick={handleSwitchTab}>
          {FOLLOWING}
        </Button>
      </ButtonGroup>

      {spread}
      
      {/* <div className="UserPage__habits-container">
        {userHabits.map(habit => (
          <HabitCard key={uuidv4()} habit={habit} />
        ))}
      </div> */}

      {userHabits.length === 0 && (
        <span className="UserPage__no-habits">
          This user has no habits yet.
        </span>
      )}
    </section>
  )
}

export default UserPage
