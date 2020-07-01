import { login } from '../actions/';
import { setUser } from '../actions/userActions';

// sync local storage user data with redux
export const getUserData = async (dispatch) => {
  if (!localStorage.user) return;
  const userData = await JSON.parse(localStorage.user);
  dispatch(login());
  dispatch(setUser(userData));
};