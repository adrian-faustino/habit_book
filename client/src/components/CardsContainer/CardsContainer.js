import React, { useEffect, useState } from 'react';
/** Subcomponents **/
import HabitCard from '../HabitCard/HabitCard';
/** Redux **/
import { useSelector } from 'react-redux';
/** Helpers **/
import { getUserHabits } from '../../helpers/habitDataHelpers';
/** Styles **/
import './CardsContainer.css';

// props will be a list of components
const CardsContainer = props => {
  const [habits, setHabits] = useState([]);
  const user_id = useSelector(state => state.user.user_id)
  
  // on load, get all of the user's habits
  useEffect(() => {
    getUserHabits(user_id, data => {
      console.log('Setting habits...', data);
      setHabits(data);
    });
  }, []);

  // spread for rendering
  const renderHabits = habits.map(habit => {
    return <HabitCard key={habit.habit_id} habit={habit}/>;
  });

  return (
    <div className="CardsContainer">
      {renderHabits}

      <button onClick={e => {
        e.preventDefault();
        console.log(habits)
      }}>
        click
      </button>
    </div>
  );
};

export default CardsContainer;
