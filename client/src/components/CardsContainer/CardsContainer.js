import React, { useEffect } from 'react';
import { getUserHabits } from '../../helpers/habitDataHelpers';
import { useSelector } from 'react-redux';

// props will be a list of components
const CardsContainer = props => {
  const user_id = useSelector(state => state.user.user_id)

  useEffect(() => {
    getUserHabits(user_id);
  }, []);

  return (
    <div>
      {props.children}
    </div>
  );
};

export default CardsContainer;
