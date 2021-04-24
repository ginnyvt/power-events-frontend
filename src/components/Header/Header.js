import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import MainNav from './MainNav';
import AuthNav from './AuthNav';
import logo from '../../images/logo-192x192.png';

import { useHistory } from 'react-router-dom';
const Header = () => {
  const history = useHistory();
  return (
    <header>
      <Navbar bg='light' variant='light' collapseOnSelect expand='md'>
        <Container>
          <Navbar.Brand>
            <img
              style={{ cursor: 'pointer' }}
              src={logo}
              alt='PowerEvent Logo'
              width='30'
              height='30'
              onClick={() => history.push('/')}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <MainNav />
            <AuthNav />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
