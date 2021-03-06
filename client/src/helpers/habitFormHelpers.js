/** Output: valid title **/
// no repeated whitespace
const isValidTitle = title => {
  const REGEX = /^[a-z\d\-_\s]+$/i; // simple alpha numeric regex with whitespace for now
  return REGEX.test(title);
};

/** Input: string **/
// remove excess whitespace and tabs
const trimText = title => {
  if (!title) return;
  const _title = title.trim().replace(/\s\s+/g, ' ');
  return _title;
};

/** Input: object. Output: object **/
export const validateForm = values => {
  const { title, description } = values;

  if (!title) return { err: 'Please enter a title.' };
  if (!isValidTitle(title)) return { err: 'Invalid characters used.' };

  const habit = {
    title: trimText(title),
    description: trimText(description)
  };

  return { err: null, habit };
};