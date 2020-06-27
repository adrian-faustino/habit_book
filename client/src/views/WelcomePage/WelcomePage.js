import React from 'react';
/** Styles **/
import './WelcomePage.css';
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';

const WelcomePage = () => {
  return (
    <div>
      <h1
        className="WelcomePage__site-banner">
          Welcome to Habitbook!
      </h1>

      <section 
        className="WelcomePage__form-section">
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

export default WelcomePage;
