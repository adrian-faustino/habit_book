import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions';

/** Reactstrap **/
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
/** Styles **/
import './LoginPage.css';
/** Helpers **/
import useForm from '../../hooks/useFormHook';
import { Redirect } from 'react-router-dom';
import { loginReq } from '../../helpers/LoginHelpers';

const LoginPage = () => {
  const [redirectURL, setRedirectURL] = useState(null);
  const dispatch = useDispatch();

  const [
    userLogin, 
    handleChange, 
    handleSubmit, 
    handleReset] = useForm(requestLogin);

  function requestLogin() {
    loginReq(userLogin, () => {
      dispatch(login());
      setRedirectURL('/home')
    });
  };

  return (
    redirectURL ? (
      <Redirect to={redirectURL} />
    ) : (
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
    </div>
    )
  );
};

export default LoginPage;