import React from 'react'
/** Subcomponents **/
import { UserSearchBar } from '../../components/';
/** Styles **/
import './SearchPage.css';

const SearchPage = () => {
  return (
    <section className="SearchPage">
      <h3>Search for other users to follow</h3>
      <UserSearchBar />
    </section>
  )
}

export default SearchPage
