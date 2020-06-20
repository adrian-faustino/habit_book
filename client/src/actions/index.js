/** This is an example file for reference **/

export const login = () => {
  return {
    type: 'LOGIN'
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const increment = int => {
  return {
    type: 'INCREMENT',
    payload: int
  };
};

export const decrement = int => {
  return {
    type: 'DECREMENT',
    payload: int
  };
};