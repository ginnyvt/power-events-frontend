import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LoginBtn = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    // <button
    //   className='btn btn-primary btn-block'
    //   onClick={() => loginWithRedirect()}
    // >
    //   Log In
    // </button>

    <Button onClick={() => loginWithRedirect()}>Log In</Button>
  );
};

export default LoginBtn;
