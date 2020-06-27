import { login } from '../actions/';
import { setUser } from '../actions/userActions';

export const getUserData = async (dispatch) => {
  const userData = await JSON.parse(localStorage.user);
  if (!userData) return;
  dispatch(login());
  dispatch(setUser(userData));
};