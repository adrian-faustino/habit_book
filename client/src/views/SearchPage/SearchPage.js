import React, { useState, useEffect } from 'react'
import axios from 'axios';
/** Subcomponents **/
import { UserSearchBar, UserCard } from '../../components/';
/** Styles **/
import './SearchPage.css';
/** Reactstrap **/
import { Spinner, Button } from 'reactstrap';

const SearchPage = () => {
  const [queryHits, setQueryHits] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // on render, load a list of random users
  useEffect(() => {
    setIsLoading(true);
    getRandomUsers(users => {
      setIsLoading(false);
      setRandomUsers(users);
    });
  }, []);

  const getRandomUsers = async callback => {
    const endpoint = process.env.REACT_APP_API +
      `search/explore`;
    
    axios
      .get(endpoint)
      .then(res => {
        callback(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleRefresh = e => {
    e.preventDefault();
    setIsLoading(true);
    getRandomUsers(users => {
      setIsLoading(false);
      setRandomUsers(users);
    });
  };

  // map for rendering
  const _queryHits = queryHits.map(userObj => {
    return (
      <UserCard
        key={userObj.user_id}
        userObj={userObj}/>
    )
  });

  const _randomUsers = randomUsers.map(userObj => {
    return (
      <UserCard
        key={userObj.user_id}
        userObj={userObj}/>
    )
  });

  return (
    <section className="SearchPage">
      <h3>Search for other users to follow</h3>
      <div className="SearchPage__top-div">
        <UserSearchBar
          setIsLoading={setIsLoading}
          setQueryHits={setQueryHits}/>

        <Button
          color="warning"
          onClick={handleRefresh}
          className="SearchPage__refresh-button">
            refresh
        </Button>
      </div>

      {isLoading && <Spinner 
        className="SearchPage__spinner"/>}

          {_queryHits}
          {_queryHits.length === 0 && _randomUsers}

    </section>
  )
}

export default SearchPage
