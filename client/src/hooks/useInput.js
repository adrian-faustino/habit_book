import { useState } from 'react';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const reset = () => setValue(initialValue);
  const onChange = e => setValue(e.target.value);

  const bind = {
    value,
    onChange
  };

  return [value, bind, reset];
};

export default useInput;

/* Custom hook notes:
 * Reference: https://youtu.be/6am-yn3ZLEw
 * - We will use spread operator on bind
 * - This covers value and onChange attributes on an input element */