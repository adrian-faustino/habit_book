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
    console.log('On mount user_id', user_id);
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

    // if current mode is selected again, do nothing
    // stretch: add cooldown?
    if (e.target.innerHTML === toggledData) return;


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

  // feedback for when user has no habits/followers/following
  const displayEmptyFieldMsg = () => {
    switch (toggledData) {
      case HABITS:
        return (
          <div className="UserPage__no-habits">This user has no habits yet.</div>
        );
      case FOLLOWERS:
        return (
          <div className="UserPage__no-habits">This user has no followers yet.</div>
        );
      case FOLLOWING:
        return (
          <div className="UserPage__no-habits">This user is not following anyone yet.</div>
        );
    }
  }

  // return jsx based on current toggled data
  let spread = spreadToggledData();

  // check if empty
  if (spread.length === 0) {
    spread = displayEmptyFieldMsg();
  }

  return (
    <section className="UserPage">
      <UserCard userObj={userObj} />

      <ButtonGroup className="UserPage__button-group">
        <Button
          color={toggledData === HABITS ? 'primary' : 'secondary'}
          onClick={handleSwitchTab}>
            {HABITS}
        </Button>
        <Button
          color={toggledData === FOLLOWERS ? 'primary' : 'secondary'}
          onClick={handleSwitchTab}>
            {FOLLOWERS}
        </Button>
        <Button
          color={toggledData === FOLLOWING ? 'primary' : 'secondary'}
          onClick={handleSwitchTab}>
            {FOLLOWING}
        </Button>
      </ButtonGroup>

      {spread}
    </section>
  )
}

export default UserPage
