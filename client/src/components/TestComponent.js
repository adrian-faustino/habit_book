/** This is an example file for reference **/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // useSelector for accessing state
import { login, logout, increment, decrement } from '../actions';
import { Redirect } from 'react-router-dom';

const TestComponent = () => {

  // return <Redirect to="/home"/>

  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch(); // this is for dispatching actions to change state

  const loginHandler = e => {
    e.preventDefault();
    isLogged ? dispatch(logout()) : dispatch(login());
  };

  return (
    <div>
      <h2>From TestComponent.js</h2>
      <h3>Counter: {counter}</h3>
      <button onClick={() => dispatch(increment(5))}>+</button>
      <button onClick={() => dispatch(decrement(5))}>-</button>

      <h4>
        {isLogged ? 'You are logged in.' : 'Please sign in.'}
      </h4>

      <button onClick={loginHandler}>
        {isLogged ? 'Log out' : 'Log in'}
      </button>
    </div>
  )
}

export default TestComponent
