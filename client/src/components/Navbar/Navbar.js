import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


/** Reactstrap **/
import { Nav, NavItem, NavLink } from 'reactstrap';
/** React router **/
import { Link, Redirect } from 'react-router-dom'; 
/** Styles **/
import './Navbar.css';
import NavDashboard from './NavDashboard';


const Navbar = () => {
  const isLogged = useSelector(state => state.isLogged);

  return (
    <Nav className="Navbar__container">
      <NavItem>
        <NavLink
          className="Navbar__li"
          tag={Link}
          to="/home">
            Home
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          className="Navbar__li"
          tag={Link}
          to="/test">
            Test
        </NavLink>
      </NavItem>
      
      <NavItem>
        <NavLink
          className="Navbar__li"
          tag={Link}
          to="/login">
            Login
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          className="Navbar__li"
          tag={Link}
          to="/signup">
            Register
        </NavLink>
      </NavItem>

      <button onClick={() => {
        console.log(localStorage)
      }}>show localstorage</button>

      {isLogged && (
        <NavItem>
          <NavDashboard />
        </NavItem>
      )}
    </Nav>
  );
};

export default Navbar;



/* React-router with Reactstrap notes:
 * - Use tag attribute to prevent page reload when changing page */