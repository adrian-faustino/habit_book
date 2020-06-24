import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to Habitbook!</h1>
      <h5>
        New users can register
        <Link to="/signup"> here!</Link>
      </h5>
    </div>
  )
}

export default WelcomePage
