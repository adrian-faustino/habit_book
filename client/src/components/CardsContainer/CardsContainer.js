import React, { useEffect, useState } from 'react';
import { getUserHabits } from '../../helpers/habitDataHelpers';
import { useSelector } from 'react-redux';
import HabitCard from '../HabitCard/HabitCard';

// props will be a list of components
const CardsContainer = props => {
  const [habits, setHabits] = useState([]);
  const user_id = useSelector(state => state.user.user_id)
  
  // on load, get all of the user's habits
  useEffect(() => {
    getUserHabits(user_id, data => setHabits(data));
  }, []);

  // spread for rendering
  const renderHabits = habits.map(habit => {
    return <HabitCard habit={habit}/>;
  });

  return (
    <div>
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
