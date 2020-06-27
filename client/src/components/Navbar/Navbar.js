import React, { useState } from 'react';

/** Reactstrap **/
import { Nav, NavItem, NavLink } from 'reactstrap';
/** React router **/
import { Link, Redirect } from 'react-router-dom'; 
/** Styles **/
import './Navbar.css';


const Navbar = () => {
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
          to="/signup">
            Register
        </NavLink>
      </NavItem>

      <button onClick={() => {
        console.log(localStorage)
      }}>show localstorage</button>

      <button onClick={() => {
        localStorage.clear();
      }}>LOGOUT</button>
    </Nav>
  );
};

export default Navbar;



/* React-router with Reactstrap notes:
 * - Use tag attribute to prevent page reload when changing page */