import counterReducers from './counterReducer';
import loggedReducers from './loggedReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter : counterReducers,
  isLogged : loggedReducers
});

export default allReducers;