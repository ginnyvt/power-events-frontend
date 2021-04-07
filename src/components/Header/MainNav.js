import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import LogoutBtn from '../Auth/LogoutBtn';

const MainNav = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Nav className='mr-auto'>
      {/* <LinkContainer to='/home'>
        <Nav.Link>Home</Nav.Link>
      </LinkContainer> */}

      <LinkContainer to='/upcoming-events'>
        <Nav.Link>Upcoming Events</Nav.Link>
      </LinkContainer>

      <LinkContainer to='/past-events'>
        <Nav.Link>Past Events</Nav.Link>
      </LinkContainer>

      <LinkContainer to='/my-profile'>
        <Nav.Link>My Account</Nav.Link>
      </LinkContainer>

      {isAuthenticated ? (
        <NavDropdown title='Manage Events' id='basic-nav-dropdown'>
          <NavDropdown.Item>
            <LinkContainer to='/my-events'>
              <Nav.Link>My Events</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <LinkContainer to='/joined-events'>
              <Nav.Link>Joined Event</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <LinkContainer to='/new-event'>
              <Nav.Link>Create Event</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
        </NavDropdown>
      ) : null}
    </Nav>
  );
};

export default MainNav;
