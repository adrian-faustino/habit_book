import React from 'react'
import axios from 'axios';
/** Reactstrap **/
import { Button } from 'reactstrap';
/** Styles **/
import './UserSearchBar.css';
/** Custom hooks **/
import useForm from '../../hooks/useFormHook';


const UserSearchBar = props => {
  const { setQueryHits } = props;

  /** State **/
  const [ values,
          handleChange,
          handleSubmit,
          handleReset ] = useForm(searchUser);

  function searchUser() {
    // check if empty
    if (!values.query) return;
    
    console.log('submitting', values.query)
    // ajax request
    const name = values.query;
    const endpoint = process.env.REACT_APP_API + 
      `search?name=${name}`
    axios
      .get(endpoint)
      .then(res => {
        console.log('Searching...', res.data.queryHits)
        setQueryHits(res.data.queryHits);
      })
      .catch(err => console.log(err));
  }

  return (
    <form
      className="UserSearchBar__form"
      onSubmit={handleSubmit}>
        <div className="UserSearchBar__input-group">
          <input
            name="query"
            type="text"
            value={values.query || ''}
            onChange={handleChange}
            className="UserSearchBar__input-field"
            placeholder="find other users..."/>
          <Button
            className="UserSearchBar__button"
            type="submit">
              Search
          </Button>
      </div>
    </form>
  )
}

export default UserSearchBar
