import { useState } from 'react';

const useRegistrationFormData = () => {
  const [error, setError] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    _password: ''
  });

  return { error, setError };
};

export default useRegistrationFormData;

/* Design notes:
 * By having the state of the component here, I can
 * choose which states can be updated, and all the
 * logic for updating states can all be put in this
 * one file. */