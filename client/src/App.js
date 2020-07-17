import React, { useEffect } from 'react';
import TestComponent from './components/TestComponent';
import { useDispatch, useSelector } from 'react-redux';

/** Views **/
import { SignUpPage, 
         HomePage, 
         WelcomePage, 
         LoginPage, 
         LandingPage, 
         SearchPage,
         UserPage,
         FollowingPage,
         FollowersPage } from './views';
/** Components **/
import { Navbar, ProtectedRoute } from './components';
/** React router **/
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/** Styles **/
import './App.css';
/** Helpers **/
import { getUserData } from './helpers/protectedRouteOnMount';

function App() {
  /** To persist user data when user refreshes app **/
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Fetching user data from local storage...');
    getUserData(dispatch);
  }, []);

  return (
    <div className="App">
      

      <Router>
        <Navbar />

        <Route exact path="/" component={WelcomePage}/>
        <Route exact path="/welcome" component={WelcomePage}/>
        <Route exact path="/signup" component={SignUpPage}/>
        <Route exact path="/login" component={LoginPage}/>

        <ProtectedRoute path="/home">
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/test">
          <TestComponent />
        </ProtectedRoute>
        <ProtectedRoute path="/search-users">
          <SearchPage />
        </ProtectedRoute>
        <ProtectedRoute path="/users">
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute path="/following">
          <FollowingPage />
        </ProtectedRoute>
        <ProtectedRoute path="/my-followers">
          <FollowersPage />
        </ProtectedRoute>
      </Router>
    </div>
  );
}

export default App;



/* React-router notes:
 * - We can use switch to stop at the first instance of a route
 * - we can use 'exact' attribute to render exact route
 * - Reference: https://www.youtube.com/watch?v=Law7wfdg_ls 
 * - Use imported <Link to="/route"><Link/> to to navigate around */

/* General notes:
 * I'll be leaving notes throughout the code regarding things
 * that I've learned while building this project. Search for
 * 'notes' to browse through them. */

 /* For next project notes:
  * - Have a file that contains all endpoints in the
  * event I want to change endpoints
  * - Have a file with all CRUD functions on client
  * AND server side 
  * - Have clearer error messages with more info about
  * where an error came from */