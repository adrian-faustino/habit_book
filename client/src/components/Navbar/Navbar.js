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
      {isLogged && (<> 
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
            to="/search-users">
              Find Users
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className="Navbar__li"
            tag={Link}
            to="/my-followers">
              My Followers
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className="Navbar__li"
            tag={Link}
            to="/following">
              Following
          </NavLink>
        </NavItem>
      </>)}
      
      {!isLogged && (<>
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
      </>)}

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