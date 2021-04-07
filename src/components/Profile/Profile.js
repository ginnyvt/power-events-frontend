import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Modal } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  // console.log(user);

  const { name, picture, email } = user;

  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  return (
    <section style={{ padding: '3rem' }}>
      <div className='container'>
        <div className='mb-3'>
          <img src={picture} alt='' style={{ borderRadius: '50%' }} />
        </div>
        <div>
          <h2>{name}</h2>
          <p>Email: {email}</p>
          <div>
            <Button onClick={showModalHandler} className='mr-3'>
              Update
            </Button>
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={closeModalHandler}
          size='md'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModalHandler}>
              Close
            </Button>
            <Button variant='primary' onClick={closeModalHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default Profile;
