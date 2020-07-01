import React, { useState } from 'react';
import axios from 'axios';
/** Redux **/
import { useSelector } from 'react-redux';
/** Reactstrap **/
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Spinner } from 'reactstrap';
/** Helpers **/
import useForm from '../../../hooks/useFormHook';
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

  /** Redux **/
  const user = useSelector(state => state.user);

  function submitHabit() {
    const endpoint = 
      process.env.REACT_APP_API + 'habits/newHabit';

    const payload = { user, habit: values };

    const config = {
      headers: {
        authorization : `Bearer ${localStorage.accessToken}`
      }
    };
    // set loading to display spinner
    setLoading(true);
    axios
      .post(endpoint, payload, config)
      .then(res => {
        console.log(res.data.msg);
        // reset form, set form feedback, and clear spinner
        handleReset();
        setFormFeedback(res.data.msg);
        setLoading(false);

        // remove form feedback after 2 seconds
        setTimeout(() => {
          setFormFeedback('');
        }, 2000);
      })
      .catch(err => console.log(err));
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
    </div>
  );
};

export default NewHabitForm;
