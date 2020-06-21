import React from 'react';

/** Subcomponents **/
import { RegistrationForm } from '../../components';
/** Styles **/
import './SignUpPage.css';


const SignUpPage = () => {


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

 /* Design notes:
  * Based on MVC design concept, this will be strictly a VIEW
  * component. All the logic will be done in the subcomponents */