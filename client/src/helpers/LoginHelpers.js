import axios from 'axios';

export const login = (userLogin, callback) => {
  console.log('Logging in with:', userLogin)
  const endpoint = 
  process.env.REACT_APP_API + 'login';

  axios
    .post(endpoint, userLogin)
    .then(res => {
      const { accessToken, user } = res.data;
      console.log('Successfully logged in', 
      user)

      // save to local storage ** this method takes a key and val
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', user);

      // trigger redirect
      callback();
    })
    .catch(err => console.log(err));
};
