import React, { useState } from 'react'
/** Subcomponents **/
import { UserSearchBar, UserCard } from '../../components/';
/** Styles **/
import './SearchPage.css';

const SearchPage = () => {
  const [queryHits, setQueryHits] = useState([]);

  // map for rendering
  const _queryHits = queryHits.map(userObj => {
    return (
      <UserCard
        key={userObj.user_id}
        userObj={userObj}/>
    )
  });

  return (
    <section className="SearchPage">
      <h3>Search for other users to follow</h3>
      <UserSearchBar
        setQueryHits={setQueryHits}/>
          {_queryHits}
    </section>
  )
}

export default SearchPage
