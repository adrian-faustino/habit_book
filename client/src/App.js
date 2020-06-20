import React from 'react';
import './App.css';
import TestComponent from './components/TestComponent';

/** Views **/
import { SignUpPage } from './views';

/** Components **/
import { Nav } from './components';

function App() {
  return (
    <div className="App">
      <Nav />
      <TestComponent />
      <SignUpPage />
    </div>
  );
}

export default App;
