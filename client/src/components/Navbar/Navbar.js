import React from 'react';

/** Reactstrap **/
import { Nav, NavItem, NavLink } from 'reactstrap';
/** React router **/
import { Link } from 'react-router-dom'; 
/** Styles **/
import './Navbar.css';


const Navbar = () => {
  return (
    <Nav>
      <NavItem>
        <NavLink tag={Link} to="/signup">Register</NavLink>
      </NavItem>
    </Nav>
  );
};

export default Navbar;



/* React-router with Reactstrap notes:
 * - Use tag attribute to prevent page reload when changing page */