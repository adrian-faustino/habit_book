import React from 'react';
/** Styles **/
import './WelcomePage.css';
/** Views **/
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';
/** Redux **/
import { useSelector } from 'react-redux';

const WelcomePage = () => {
  /** Redux **/
  const isLogged = useSelector(state => state.isLogged);
  const user = useSelector(state => state.user);

  if (isLogged) {
    return (
      <div className="WelcomePage">
        <h1
          className="WelcomePage__site-banner">
            {`Welcome to Habitbook, ${user.username}!`}
        </h1>

        {/* stretch: link to dashboard etc */}
      </div>
    );
  };

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
