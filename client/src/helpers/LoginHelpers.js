import axios from 'axios';

export const loginReq = (userLogin, callback) => {
  const endpoint = 
  process.env.REACT_APP_API + 'login';

  axios
    .post(endpoint, userLogin)
    .then(async res => {
      const { accessToken, user } = res.data;
      const _user = await JSON.stringify(user);

      // save to local storage ** this method takes a key and val
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', _user);

      // refresh local storage
      window.location.reload();

      // trigger redirect
      callback();
    })
    .catch(err => {
      console.log(err)
      callback(null, err);
    });
};