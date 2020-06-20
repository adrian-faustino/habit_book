import React from 'react';

/** Reactstrap **/
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
/** Styles **/
import './SignUpPage.css';

const SignUpPage = () => {

  const registerFormHandler = e => {
    e.preventDefault();
    console.log('form submitted', e)
  }

  return (
    <div className="SignUpPage__form-container">
      <Form onSubmit={registerFormHandler}>
        
        <FormGroup>
          <Label for="exampleEmail">Username:</Label>
          <Input valid={null}/>
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>Invalid username</FormFeedback>
          <FormText>12 character limit</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">First name:</Label>
          <Input invalid={null}/>
          <FormFeedback invalid>Please enter your first name</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Last name:</Label>
          <Input />
          <FormFeedback invalid>Please enter your last name</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Email:</Label>
          <Input />
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>Invalid email</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Password:</Label>
          <Input />
          <FormFeedback valid>Valid username</FormFeedback>
          <FormFeedback invalid>Invalid username</FormFeedback>
          <FormText>Passwords must be at least 6 characters long</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Confirm password:</Label>
          <Input />
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