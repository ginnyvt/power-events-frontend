import React from 'react';
import axios from 'axios';

const Footer = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <footer className='bg-light text-center text-lg-start fixed-bottom'>
      <div className='container p-4'>
        <form onSubmit={submitHandler}>
          <div className='row d-flex justify-content-center'>
            <div className='col-auto'>
              <p className='pt-2'>
                <strong>Sign up for our latest events</strong>
              </p>
            </div>

            <div className='col-md-5 col-12'>
              <div className='form-outline mb-2 form-white'>
                <input
                  type='email'
                  name='subscribers'
                  id='subscribers-input'
                  className='form-control'
                  placeholder='Email address'
                />
              </div>
            </div>

            <div className='col-auto'>
              <button type='submit' className='btn btn-light mb-4'>
                Subscribe
              </button>
            </div>
          </div>
        </form>
      </div>

      <div
        className='text-center p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        © 2021 Copyright:{' '}
        <a
          className='text-dark'
          href='https://github.com/quynh-vt'
          style={{ fontWeight: 'bold' }}
        >
          Quynh Tran
        </a>
      </div>
    </footer>
  );
};

export default Footer;
