import React, { useState } from 'react'

/** Reactstrap **/
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row, Col, Spinner } from 'reactstrap';
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
  /** Form values state **/
  const [
    values,
    handleChange,
    handleSubmit,
    handleReset] = useForm(validate);
  /** For loading spinner */
  const [loading, setLoading] = useState(false);
 
  
  function validate() { // for hoisting
    console.log('Validating...', values);
    const error = isValidSubmission(values);
    /** If there are any errors at all, do not register **/
    if (!isEmptyObj(error)) return setError(error);
    register();
  };
  
  function register() {
    console.log('Registering...', values);
    const endpoint = 
      process.env.REACT_APP_API + 'users/newUser';
    setLoading(true);

    axios
      .post(endpoint, values)
      .then(res => {
        const successMsg = res.data;
        setLoading(false);
        console.log('Register successful:', successMsg)
        // clear form
        // redirect
      })
      .catch(err => {
        setLoading(false);
        /** This is an object containing all errors **/
        const error = err.response.data;
        console.log('Failed to register:', error);
        setError(error);
      });
  };

  /** Clear form values and clear errors **/
  const handleResetForm = e => {
    e.preventDefault();
    handleReset();
    setError({});
  };

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
                  valid={values.first_name}
                  invalid={error.first_name} />
                <FormFeedback invalid>
                  {error.first_name}
                </FormFeedback >
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
                  valid={values.last_name}
                  invalid={error.last_name} />
                <FormFeedback invalid>
                  {error.last_name}
                </FormFeedback >
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
                (values.username && !isValidUsername(values.username))
                || error.username} />
          <FormFeedback invalid>{error.username}</FormFeedback>
          <FormText>
            {values.username &&
            isValidUsername(values.username) ? 
              `Remaining characters: ${USERNAME_MAX_LENGTH - values.username.length}` :
              `Usernames must be within ${USERNAME_MAX_LENGTH} characters`}
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label for="email">E-mail:</Label>
            <Input
              name="email"
              type="email"
              value={values.email || ''}
              onChange={handleChange}
              valid={
                isValidEmail(values.email)}
              invalid={
                (values.email && !isValidEmail(values.email))
                || error.email} />
          <FormFeedback invalid>{error.email}</FormFeedback>
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
                    (values.password &&
                    !isValidPassword(values.password))
                    || error.password} />
              <FormFeedback invalid>
                {error.password}
              </FormFeedback>
              <FormText>
                {`Passwords must be at least ${PASSWORD_MIN_LENGTH} characters long`}
              </FormText>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="_password">Confirm:</Label>
                <Input 
                  name="_password"
                  type="password"
                  value={values._password || ''}
                  onChange={handleChange}
                  valid={
                    isValidPassword(values.password) &&
                    values.password === values._password} 
                  invalid={
                    (values.password !== values._password &&
                    isValidPassword(values.password))
                    || error._password} />
              <FormFeedback invalid>
                {error._password}
              </FormFeedback>
              <FormText>Please re-enter your password</FormText>
            </FormGroup>
          </Col>
        </Row>

        <Button
          disabled={loading}
          block
          type="submit"
          color={
            isEmptyObj(isValidSubmission(values)) ? "success" : "secondary"}>
            {loading ? <Spinner size="sm"/> : 'Register'}
        </Button>
      </Form>
      
      <Button
        className="RegistrationForm__form-resetBtn"
        disabled={loading}
        block
        color="warning"
        onClick={handleResetForm}>
          Reset Form
      </Button>
    </div>
  )
};

export default RegistrationForm;



/* Reactstrap form notes:
 * Useful component attributes:
 * - <Input /> => valid, invalid
 * - <FormFeedback></> => valid (green text), invalid (red text)
 * - <Input /> valid/invalid is a switch for FormFeedback
 * - Use case: 2 statements for valid/invalid situations
 * - <FormText></> simply describes the input field  */

/* Design notes:
 * I chose to write the functions using function declerations
 * for hoisting because originally I used arrows which forced
 * me to separate all the state declerations all over the place. Also for the sake of readabilty (the order the
 * functions will be read by a new dev, I wrote validate
 * and register to be hoisted
 * */