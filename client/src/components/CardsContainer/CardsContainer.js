import React, { useEffect, useState } from 'react';
/** Subcomponents **/
import HabitCard from '../HabitCard/HabitCard';
/** Redux **/
import { useSelector } from 'react-redux';
/** Helpers **/
import { getUserHabits } from '../../helpers/habitDataHelpers';
/** Styles **/
import './CardsContainer.css';


const CardsContainer = () => {
  /** State **/
  const [habits, setHabits] = useState([]);

  /** Redux **/
  const user_id = useSelector(state => state.user.user_id)
  const counter = useSelector(state => state.counter);
  
  // on load, get all of the user's habits
  useEffect(() => {
    getUserHabits(user_id, data => {
      setHabits(data);
    });
  }, [counter]);

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
