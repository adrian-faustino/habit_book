import { getDateYYYYMMDD } from '../helpers/dateObjHelpers';

// Return an array of days that the user has marked 
/** Input: start date (no time). Output:  **/
export const getCompletedDays = (start, end) => {
  // 
};


// sets the color of the last selected date tile
export const highlightRange = ({ date, view }) => {
  /** Constants **/
  // to add successful day highlight css class
  const CALENDAR_SELECTED = 'CalendarComponent__selected';

  if (view === 'month') {
    const _date = getDateYYYYMMDD(date);
    // const _value = getDateYYYYMMDD(null);
    if (_date === _date) {
      return CALENDAR_SELECTED;
    }
  }
};
