import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const SignupBtn = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className='ml-2'
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
          redirectUri: 'http://localhost:3000/my-profile',
        })
      }
    >
      Sign Up
    </Button>
  );
};

export default SignupBtn;
