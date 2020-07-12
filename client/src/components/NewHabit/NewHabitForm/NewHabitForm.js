import React, { useState } from 'react';
import axios from 'axios';
/** Redux **/
import { useSelector, useDispatch } from 'react-redux';
/** Redux - actions **/
import { increment } from '../../../actions';
/** Reactstrap **/
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Spinner } from 'reactstrap';
/** Helpers **/
import useForm from '../../../hooks/useFormHook';
import { submitHabit_API } from '../../../helpers/postDataHelpers';
import { validateForm } from '../../../helpers/habitFormHelpers';
/** Styles **/
import './NewHabitForm.css';


const NewHabitForm = props => {
  /** State **/
  const [
    values,
    handleChange,
    handleSubmit,
    handleReset
  ] = useForm(submitHabit);
  const [formFeedback, setFormFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /** Redux **/
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function submitHabit() {
    // ensure no empty title, and trim text for whitespace
    const validated = validateForm(values);
    if (validated.err) return setError(validated.err);

    // if validation passes, send post request
    console.log('Submitting new habit...');
    setLoading(true);
    submitHabit_API(user.user_id, validated.habit, res => {
      console.log(res.data.msg);
      // reset form, set form feedback, and clear spinner
      handleReset();
      setFormFeedback(res.data.msg);
      setLoading(false);
      setError('');
  
      // trigger fetch data after crud operation
      dispatch(increment(1));
  
      // remove form feedback after 2 seconds
      setTimeout(() => {
        setFormFeedback('');
      }, 2000);
    });
  }

  return (
    <div className="NewHabitForm__container">
      <h4>Create a new habit!</h4>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">
            Title:
          </Label>
          <Input
            value={values.title || ''}
            onChange={handleChange}
            id="title"
            name="title"
            type="text"/>
        </FormGroup>
        <FormGroup>
          <Label for="description">
            Description:
          </Label>
          <Input
            value={values.description || ''}
            onChange={handleChange}
            id="textarea"
            name="description"
            type="textarea" />
        </FormGroup>

        <Button
          disabled={loading}
          type="submit">
            {loading ? <Spinner size="sm"/> : 'Submit'}
        </Button>
      </Form>

      {formFeedback && 
        (<Alert
          className="NewHabitForm__form-feedback"
          color="success">
            {formFeedback}
      </Alert>)}
      {error &&
        (<Alert
          className="NewHabitForm__error"
          color="danger">
            {error}
        </Alert>)
      }
    </div>
  );
};

export default NewHabitForm;
