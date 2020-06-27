import counterReducer from './counterReducer';
import loggedReducer from './loggedReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter : counterReducer,
  isLogged : loggedReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer
});

export default allReducers;