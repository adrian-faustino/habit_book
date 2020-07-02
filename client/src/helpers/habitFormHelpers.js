/** Output: valid title **/
// no repeated whitespace
const isValidTitle = title => {
  const REGEX = /^[a-z\d\-_\s]+$/i; // simple alpha numeric regex with whitespace for now
  return REGEX.test(title);
};

const trimTitle = title => {
  const _title = title.trim().replace(/\s\s+/g, ' ');
  console.log('Cleaned up?', _title);
  return _title;
}

/** Input: object. Output: boolean **/
export const validateForm = values => {
  const { title, description } = values;

  if (!title) return { err: 'Please enter a title.' };
  if (!isValidTitle(title)) return { err: 'Invalid characters used.' };

  const habit = {
    title: trimTitle(title),
    description
  };

  return { err: null, habit };
};