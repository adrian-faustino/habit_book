import React, { useState } from 'react';

/** Subcomponents **/
import { RegistrationForm } from '../../components';
/** Reactstrap **/
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
/** Styles **/
import './SignUpPage.css';
/** Custom hooks **/
import useInput from '../../hooks/useInput';
/** Helpers **/
import userValidationHelpers from '../../helpers/userValidationHelpers';
import constants from '../../constants';

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
    password: `Password is too short`,
    password__: `Password does not match`
  });

  const [flags, setFlags] = useState({
    usernameFlag: null,
    first_nameFlag: null,
    last_nameFlag: null,
    emailFlag: null,
    passwordFlag: null,
    password__Flag: null
  });


  const registerFormHandler = e => {
    e.preventDefault();
    const flags = {};
    // check if anything null
    !username && (flags.usernameFlag = `Please enter a username`);
    !first_name && (flags.first_nameFlag = `Please enter your first_name`);
    !last_name && (flags.last_nameFlag= `Please enter your last_name`);
    !email && (flags.emailFlag = `Please enter an email`);
    !password && (flags.passwordFlag = `Please enter a password`);
    !password__ && (flags.password__Flag = `Please confirm your password`);

    if (!isEmptyObj(flags)) {
      setFlags(flags);
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
    <div>
      <RegistrationForm />
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