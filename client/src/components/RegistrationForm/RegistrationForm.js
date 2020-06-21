import React from 'react'

/** Reactstrap **/
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row, Col } from 'reactstrap';
/** Styles **/
import './RegistrationForm.css';
/** Custom hooks **/
import useForm from '../../hooks/useFormHook';
/** Helpers **/
import userValidationHelpers from '../../helpers/userValidationHelpers';
import constants from '../../constants';


const {
  USERNAME_MAX_LENGTH, 
  PASSWORD_MIN_LENGTH } = constants;
const {
  isValidEmail, 
  isValidUsername,
  isValidPassword,
  isEmptyObt } = userValidationHelpers;

const RegistrationForm = () => {

  const register = () => {
    console.log('Registered!', values);
  }

  const [values, handleChange, handleSubmit] = useForm(register);

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
              <Label for="exampleEmail">Last Name:</Label>
              <Input />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="examplePassword">Username:</Label>
          <Input />
          <FormFeedback invalid>Invalid username</FormFeedback>
          <FormText>Usernames must be within 12 characters</FormText>
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">E-mail:</Label>
          <Input />
          <FormFeedback>Invalid email</FormFeedback>
        </FormGroup>

        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleEmail">Password:</Label>
              <Input />

              <FormText>Passwords must be at least 6 characters long</FormText>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="examplePassword">Confirm Password:</Label>
              <Input />
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