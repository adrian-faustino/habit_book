const initialState = {
  username: null,
  first_name: null,
  last_name: null,
  email: null,
  created_at: null,
  avatar_url: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'CLEAR_USER':
      return initialState;
    default:
      return state;
  }
}

export default userReducer;