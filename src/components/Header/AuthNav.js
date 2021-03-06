import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Nav } from 'react-bootstrap';

import LogoutBtn from '../Auth/LogoutBtn';
import SignupBtn from '../Auth/SignupBtn';
import LoginBtn from '../Auth/LoginBtn';

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Nav>
      {isAuthenticated ? (
        <LogoutBtn />
      ) : (
        <>
          <LoginBtn>Login</LoginBtn>
          <SignupBtn />
        </>
      )}
    </Nav>
  );
};

export default AuthNav;
