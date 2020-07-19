import axios from 'axios';

export const loginReq = (userLogin, callback) => {
  console.log('Logging in with:', userLogin)
  const endpoint = 
  process.env.REACT_APP_API + 'login';

  axios
    .post(endpoint, userLogin)
    .then(async res => {
      const { accessToken, user } = res.data;
      console.log('Successfully logged in', user);
      console.log('Access token:', accessToken);
      const _user = await JSON.stringify(user);

      // save to local storage ** this method takes a key and val
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', _user);

      // refresh local storage
      window.location.reload();

      // trigger redirect
      callback();
    })
    .catch(err => console.log(err));
};