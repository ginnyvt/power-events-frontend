import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import MainNav from './MainNav';
import AuthNav from './AuthNav';
import logo from '../../images/logo-192x192.png';
const Header = () => {
  return (
    <header>
      <Navbar bg='light' variant='light' collapseOnSelect expand='md'>
        <Container>
          <Navbar.Brand>
            <img src={logo} alt='PowerEvent Logo' width='30' height='30' />
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
