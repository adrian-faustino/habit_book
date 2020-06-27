import React from 'react';
import TestComponent from './components/TestComponent';

/** Views **/
import { SignUpPage, HomePage, WelcomePage, LoginPage, LandingPage } from './views';
/** Components **/
import { Navbar, ProtectedRoute } from './components';
/** React router **/
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/** Styles **/
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/welcome" component={LandingPage}/>
      {/* <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/signup" component={SignUpPage}/> */}

      <ProtectedRoute component={HomePage}/>
          {/* <Route exact path="/home" component={HomePage}/> */}


        <div className="App">
          <Navbar />
          <Route exact path="/test" component={TestComponent}/>
          <Route exact path="/" component={WelcomePage}/>
        </div>
    </Router>
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