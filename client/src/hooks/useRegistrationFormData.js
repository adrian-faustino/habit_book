import { useState } from 'react';

const useRegistrationFormData = () => {
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    _password: ''
  });

  /** For setting a specific error **/
  const setError = (error, msg) => {
    setErrors(prev => ({ ...prev, [error]: msg }));
  };

  return {
    errors,
    setError,
    setErrors
  };
};

export default useRegistrationFormData;

/* Design notes:
 * By having the state of the component here, I can
 * choose which states can be updated, and all the
 * logic for updating states can all be put in this
 * one file. */