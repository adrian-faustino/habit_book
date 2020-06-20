import React, { useState } from 'react';

/** Reactstrap **/
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
/** Styles **/
import './SignUpPage.css';
/** Custom hooks **/
import useInput from '../../hooks/useInput';
/** Helpers **/
import { isValidEmail,
      isValidUsername,
      isValidPassword} from '../../helpers/userValidationHelpers';


const SignUpPage = () => {
  const [username, bindUsername, resetUsername] = useInput('');
  const [firstName, bindFirstName, resetFirstName] = useInput('');
  const [lastName, bindLastName, resetLastName] = useInput('');
  const [email, bindEmail, resetEmail] = useInput('');
  const [password, bindPassword, resetPassword] = useInput('');
  const [password__, bindPassword__, resetPassword__] = useInput('');

  

  const registerFormHandler = e => {
    e.preventDefault();
    
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      password,
      password__
    }
    console.log('User info!', newUser);
  }

  return (
    <div className="SignUpPage__form-container">
      <Form onSubmit={registerFormHandler}>
        
        <FormGroup>
          <Label for="exampleEmail">Username:</Label>
          <Input
          {...bindUsername}
          valid={null}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>Invalid username</FormFeedback>
          <FormText>12 character limit</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">First name:</Label>
          <Input 
          {...bindFirstName}
          invalid={null}/>
          <FormFeedback invalid>Please enter your first name</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Last name:</Label>
          <Input
          {...bindLastName}/>
          <FormFeedback invalid>Please enter your last name</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Email:</Label>
          <Input
          {...bindEmail}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>Invalid email</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Password:</Label>
          <Input
          {...bindPassword}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>Invalid username</FormFeedback>
          <FormText>Passwords must be at least 6 characters long</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Confirm password:</Label>
          <Input
          {...bindPassword__}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>Invalid username</FormFeedback>
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