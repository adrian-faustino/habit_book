import React from 'react';
/** Redux **/
import { useSelector } from 'react-redux';
/** Subcomponents **/
import { RegistrationForm } from '../../components';
/** Styles **/
import './SignUpPage.css';

const SignUpPage = () => {
  /** Redux **/
  const isLogged = useSelector(state => state.isLogged);

  if (isLogged) {
    return (
      <div className="SignUpPage">
        You are already logged in!
      </div>
      // stretch: logout button
    );
  }
  return (
    <section
      className="SignUpPage">
      <RegistrationForm />
    </section>
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