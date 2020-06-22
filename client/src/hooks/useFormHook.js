import { useState } from 'react';

const useForm = submitCallback => {
  const [state, setState] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    submitCallback();
  };

  const handleReset = () => {
    const resetState = {};
    for (let key in state) resetState[key] = '';
    setState(resetState);
  }

  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name] : value }));
  };

  return [state, handleChange, handleSubmit, handleReset];
};

export default useForm;

/* Custom hook notes:
 * This way of writing custom hooks can handle
 * any input and also the submission. Compared to
 * the other useInput custom hook I wrote, this is
 * cleaner. */