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
import axios from 'axios';

const {
  USERNAME_MAX_LENGTH, 
  PASSWORD_MIN_LENGTH } = constants;
const {
  isValidEmail, 
  isValidUsername,
  isValidPassword,
  isEmptyObj,
  isValidSubmission,
  inputWithinRange } = userValidationHelpers;

const RegistrationForm = () => {
  /** Form errors state **/
  const { error, setError } = useRegistrationFormData();
 
  const register = () => {
    // axios request
    console.log('Registering...', values);
  };

  const validate = () => {
    /** If there are any errors at all, do not register **/
    const error = isValidSubmission(values);
    if (!isEmptyObj(error)) return setError(error);
    register();
  };

  /** Form values state **/
  const [values, handleChange, handleSubmit, handleReset] = useForm(validate);


  return (
    <div className="RegistrationForm__form-container">
      {/* handleSubmit is the function passed into useForm hook */}
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
                  valid={values.first_name} />
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
                  valid={values.last_name} />
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
              valid={
                inputWithinRange(values.username, 1, USERNAME_MAX_LENGTH)}
              invalid={
                values.username && !isValidUsername(values.username)} />
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
              valid={
                isValidPassword(values.email)}
              invalid={
                values.email && !isValidEmail(values.email)} />
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
                  valid={
                    isValidPassword(values.password)}
                  invalid={
                    values.password &&
                    !isValidPassword(values.password)} />
              <FormText>
                {`Passwords must be at least ${PASSWORD_MIN_LENGTH} characters long`}
              </FormText>
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
                  valid={
                    isValidPassword(values.password) &&
                    values.password === values._password} 
                  invalid={
                    values.password !== values._password &&
                    isValidPassword(values.password)} />
              <FormText>Please re-enter your password</FormText>
            </FormGroup>
          </Col>
        </Row>

        <Button block
          type="submit"
          color={
            isEmptyObj(isValidSubmission(values)) ? "success" : "secondary"}>
            Register
        </Button>
      </Form>

      <button onClick={e => {
        e.preventDefault();
        console.log(error);
      }}>show errors</button>
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