import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-dark text-center text-lg-start fixed-bottom'>
      <div
        className='text-center p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2021 Copyright:{' '}
        <a className='text-light' href='https://github.com/quynh-vt'>
          Quynh Tran
        </a>
      </div>
    </footer>
  );
};

export default Footer;
