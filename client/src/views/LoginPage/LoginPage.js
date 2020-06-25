import React from 'react';
import axios from 'axios';

/** Reactstrap **/
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
/** Styles **/
import './LoginPage.css';
/** Helpers **/
import useForm from '../../hooks/useFormHook';

const LoginPage = () => {
  const [
    userLogin, 
    handleChange, 
    handleSubmit, 
    handleReset] = useForm(requestLogin);

  function requestLogin() {
    console.log(userLogin);
  };

  return (
    <div className="LoginPage__form-container">
      <h1>Login</h1>
      <Form 
        formNoValidate
        onSubmit={handleSubmit}>
        <FormGroup clssName="mb-2 mr-sm-2 mb-sm-0">
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
  );
};

export default LoginPage;
