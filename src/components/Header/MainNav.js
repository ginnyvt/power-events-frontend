import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import LogoutBtn from '../Auth/LogoutBtn';

const MainNav = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Nav className='mr-auto'>
      <LinkContainer to='/'>
        <Nav.Link>Home</Nav.Link>
      </LinkContainer>

      <LinkContainer to='/my-profile'>
        <Nav.Link>Profile</Nav.Link>
      </LinkContainer>

      {isAuthenticated ? (
        <NavDropdown title='Manage Events' id='basic-nav-dropdown'>
          <NavDropdown.Item>
            <LinkContainer to='/my-events'>
              <Nav>My Events</Nav>
            </LinkContainer>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <LinkContainer to='/new-event'>
              <Nav>Create Event</Nav>
            </LinkContainer>
          </NavDropdown.Item>
        </NavDropdown>
      ) : null}
    </Nav>
  );
};

export default MainNav;
