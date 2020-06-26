import counterReducer from './counterReducer';
import loggedReducer from './loggedReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter : counterReducer,
  isLogged : loggedReducer,
  error: errorReducer,
  auth: authReducer
});

export default allReducers;