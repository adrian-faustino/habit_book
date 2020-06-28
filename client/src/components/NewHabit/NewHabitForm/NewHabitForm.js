import React from 'react';
import axios from 'axios';
import './NewHabitForm.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import useForm from '../../../hooks/useFormHook';

const NewHabitForm = () => {
  const [
    values,
    handleChange,
    handleSubmit,
    handleReset
  ] = useForm(submitHabit);

  function submitHabit() {
    const endpoint = 
      process.env.REACT_APP_API + 'habits/newHabit';
    console.log('Submitting...', values);

    axios
      .post(endpoint, values)
      .then(res => {
        console.log('Successfully posted habit')
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
            onChange={handleChange}
            id="textarea"
            name="description"
            type="textarea" />
        </FormGroup>

        <Button>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewHabitForm;
