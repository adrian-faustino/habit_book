import React, { useState } from 'react';
/** Redux **/
import { useDispatch, useSelector } from 'react-redux';
/** Redux actions */
import { login } from '../../actions';
/** Reactstrap **/
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
/** Styles **/
import './LoginPage.css';
/** Helpers **/
import useForm from '../../hooks/useFormHook';
import { Redirect } from 'react-router-dom';
import { loginReq } from '../../helpers/LoginHelpers';
import { getUserData } from '../../helpers/protectedRouteOnMount';

const LoginPage = () => {
  /** State **/
  const [redirectURL, setRedirectURL] = useState(null);
  const [
    userLogin, 
    handleChange, 
    handleSubmit, 
    handleReset] = useForm(requestLogin);
  const [errFlag, setErrFlag] = useState(false);
  
  /** Redux **/
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.isLogged);

  function requestLogin() {
    loginReq(userLogin, (success, err) => {
      if (err) {
        setErrFlag(true);
        setTimeout(() => {
          setErrFlag(false);
        }, 3000);
        return;
      }
      
      
      // sync local storage user info with redux
      getUserData(dispatch);
      dispatch(login());
      setRedirectURL('/home')
    });
  };
  
  // if logged in do not show login form
  if (isLogged) {
    return (
      <div className="LoginPage">You are already logged in!</div>
      // stretch: logout button
    )
  };
  return (
    redirectURL ? (
      <Redirect to={redirectURL} />
    ) : (
    <section
      className="LoginPage">
        <div className="LoginPage__form-container">
        <h1>Login</h1>
        <Form 
          formNoValidate
          onSubmit={handleSubmit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label 
              for="email"
              className="mr-sm-2">
              Email:
            </Label>
            <Input
              onChange={handleChange} 
              type="email" 
              name="email" 
              id="email"/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label 
              for="password"
              className="mr-sm-2">
              Password:
            </Label>
            <Input
              onChange={handleChange} 
              type="password"
              name="password" 
              id="password"/>
          </FormGroup>
          <Button
            color="primary"
            className="LoginPage__submit-btn">
            Login
          </Button>

        </Form>

          {errFlag && (
            <Alert
            color="danger"
            className="LoginPage__error">
              Invalid email or password.
            </Alert>
          )}
        </div>
    </section>
    )
  );
};

export default LoginPage;
