import React, { useState } from 'react';

/** Reactstrap **/
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
/** Styles **/
import './SignUpPage.css';
/** Custom hooks **/
import useInput from '../../hooks/useInput';
/** Helpers **/
import userValidationHelpers from '../../helpers/userValidationHelpers';
import constants from '../../constants';
import { matchPath } from 'react-router-dom';
const { USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH } = constants;
const {
  isValidEmail, 
  isValidUsername,
  isValidPassword,
  isEmptyObj
} = userValidationHelpers;


const SignUpPage = () => {
  const [username, bindUsername, resetUsername] = useInput('');
  const [first_name, bindFirst_name, resetFirst_name] = useInput('');
  const [last_name, bindLast_name, resetLast_name] = useInput('');
  const [email, bindEmail, resetEmail] = useInput('');
  const [password, bindPassword, resetPassword] = useInput('');
  const [password__, bindPassword__, resetPassword__] = useInput('');

  const [error, setErrors] = useState({
    username: `Username is too long`,
    first_name: `Please enter your first name`,
    last_name: `Please enter your last name`,
    email: `Invalid email`,
    password: `Invalid password`,
    password__: `Password does not match`
  });

  const registerFormHandler = e => {
    e.preventDefault();

    // check if anything null
    if (!username || !first_name || !last_name || !email || !password || !password__) {
      alert('emptu field')
    }

    // check if username valid : Length

    // check if email is valid : @

    // check if password is valid :Length

    // check if password matches


    // if it all passes, make axios

  
    
    const newUser = {
      username,
      first_name,
      last_name,
      email,
      password,
      password__
    }
    console.log('User info!', newUser);
  }

  /* =================================/
   * BEGIN: Validation error messages /
   * ================================*/
  // const usernameErr = isValidUsername(username) ? 'Username'

  /* ===============================/
   * END: Validation error messages /
   * ==============================*/

  return (
    <div className="SignUpPage__form-container">
      <Form onSubmit={registerFormHandler}>
        
        <FormGroup>
          <Label for="exampleEmail">Username:</Label>
          <Input {...bindUsername}
          invalid={username.length !== 0 && !isValidUsername(username)}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>{error.username}</FormFeedback>
          {isValidUsername(username) && <FormText>Characters remaining: {USERNAME_MAX_LENGTH - username.length}</FormText>}
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">First name:</Label>
          <Input 
          {...bindFirst_name}
          invalid={null}/>
          <FormFeedback invalid>{error.first_name}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Last name:</Label>
          <Input
          {...bindLast_name}/>
          <FormFeedback invalid>{error.last_name}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Email:</Label>
          <Input {...bindEmail}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>{error.email}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Password:</Label>
          <Input
          {...bindPassword}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>{error.password}</FormFeedback>
          <FormText>Passwords must be at least 6 characters long</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Confirm password:</Label>
          <Input
          {...bindPassword__}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>{error.password__}</FormFeedback>
          <FormText>Re-enter your password</FormText>
        </FormGroup>

        <Button color="primary">Register</Button>
      </Form>
    </div>
  );
};

export default SignUpPage;

/* Reactstrap form notes:
 * Useful component attributes:
 * - <Input /> => valid, invalid
 * - <FormFeedback></> => valid (green text), invalid (red text)
 * - <Input /> valid/invalid is a switch for FormFeedback
 * - Use case: 2 statements for valid/invalid situations
 * - <FormText></> simply describes the input field  */