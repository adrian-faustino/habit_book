import React from 'react';
/** React router **/
import { Link } from 'react-router-dom'; 
/** Styles **/
import './LandingPage.css';
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';

const LandingPage = () => {
  return (
    <div>
      <h1
        className="LandingPage__site-banner">
          Welcome to Habitbook!
      </h1>

      <section 
        className="LandingPage__form-section">
        <div>
          <h4>
            Welcome back! Please sign in.
          </h4>
          <LoginPage />
        </div>
        <div>
          <h4>
            New user? Register here!
          </h4>
          <SignUpPage />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
