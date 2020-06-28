import React from 'react';
import axios from 'axios';
import './NewHabitForm.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import useForm from '../../../hooks/useFormHook';
import { useSelector } from 'react-redux';

const NewHabitForm = () => {
  const [
    values,
    handleChange,
    handleSubmit,
    handleReset
  ] = useForm(submitHabit);
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

    axios
      .post(endpoint, payload, config)
      .then(res => {
        console.log(res.data.msg);
        // handleReset
        handleReset();
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
            value={values.title}
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
            value={values.description}
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
