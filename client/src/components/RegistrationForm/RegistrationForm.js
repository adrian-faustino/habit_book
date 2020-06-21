import React, { useState } from 'react'

/** Reactstrap **/
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row, Col } from 'reactstrap';
/** Styles **/
import './RegistrationForm.css';
/** Custom hooks **/
import useForm from '../../hooks/useFormHook';
/** Helpers **/
import useRegistrationFormData from '../../hooks/useRegistrationFormData';
import userValidationHelpers from '../../helpers/userValidationHelpers';
import constants from '../../constants';

const {
  USERNAME_MAX_LENGTH, 
  PASSWORD_MIN_LENGTH } = constants;
const {
  isValidEmail, 
  isValidUsername,
  isValidPassword,
  isEmptyObt,
  isValidRegistration } = userValidationHelpers;

const RegistrationForm = () => {
  const {errors, setError, setErrors } = useRegistrationFormData();

  /** Output: boolean */
  const validate = () => {
    console.log('Validating...');

    return true;
  };
 
  const register = () => {
    if (validate()) {
      // axios request
      console.log('Registering...');
    }
  };


  const [values, handleChange, handleSubmit, handleReset] = useForm(register);

  return (
    <div className="RegistrationForm__form-container">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <Label for="first_name">First Name:</Label>
                <Input
                  name="first_name"
                  type="text"
                  value={values.first_name || ''}
                  onChange={handleChange}
                  valid={null} />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="last_name">Last Name:</Label>
                <Input
                  name="last_name"
                  type="text"
                  value={values.last_name || ''}
                  onChange={handleChange}
                  valid={null} />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="username">Username:</Label>
            <Input
              name="username"
              type="text"
              value={values.username || ''}
              onChange={handleChange}
              valid={null} />
          <FormFeedback invalid>Invalid username</FormFeedback>
          <FormText>Usernames must be within 12 characters</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="email">E-mail:</Label>
            <Input
              name="email"
              type="email"
              value={values.email || ''}
              onChange={handleChange}
              valid={null} />
          <FormFeedback>Invalid email</FormFeedback>
        </FormGroup>

        <Row>
          <Col>
            <FormGroup>
              <Label for="password">Password:</Label>
                <Input
                  name="password"
                  type="password"
                  value={values.password || ''}
                  onChange={handleChange}
                  valid={null} />
              <FormText>Passwords must be at least 6 characters long</FormText>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="_password">Confirm Password:</Label>
                <Input 
                  name="_password"
                  type="password"
                  value={values._password || ''}
                  onChange={handleChange}
                  valid={null} />
              <FormText>Please re-enter your password</FormText>
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" block color="secondary">Register</Button>
      </Form>
    </div>
  )
}

export default RegistrationForm

/* Reactstrap form notes:
 * Useful component attributes:
 * - <Input /> => valid, invalid
 * - <FormFeedback></> => valid (green text), invalid (red text)
 * - <Input /> valid/invalid is a switch for FormFeedback
 * - Use case: 2 statements for valid/invalid situations
 * - <FormText></> simply describes the input field  */