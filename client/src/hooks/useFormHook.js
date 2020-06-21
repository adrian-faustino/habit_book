import { useState } from 'react';

const useForm = submitCallback => {
  const [state, setState] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    submitCallback();
  };

  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    console.log(name, value);
    setState(prev => ({ ...prev, [name] : value }));
  };

  return [state, handleChange, handleSubmit];
};

export default useForm;