export const setUser = userObj => {
  return {
    type: 'SET_USER',
    payload: userObj
  }
};

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
};