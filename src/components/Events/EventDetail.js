import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Spinner from '../Spinner/Spinner';
import LoginBtn from '../Auth/LoginBtn';

const EventDetail = () => {
  dayjs.extend(relativeTime);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { eventId } = useParams();
  const [fetchedEvent, setFetchedEvent] = useState(null);
  const [createdBy, setCreatedBy] = useState('');
  const [numParticipants, setNumParticipants] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/events/${eventId}`
      );
      setFetchedEvent(data.results);
      setCreatedBy(data.results.creator.name);
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    const fetchCountParticipants = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/participants/count/${eventId}`
      );
      setNumParticipants(data.results);
    };

    fetchCountParticipants();
  }, [numParticipants, message]);

  const registerEventHandler = async () => {
    setShowModal(true);
    const token = await getAccessTokenSilently();
    try {
      const { data } = await axios({
        method: 'POST',
        url: `http://localhost:5000/participants/${eventId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setMessage(data.message);
    } catch (err) {
      console.log(err.response);
      setMessage(err.response.data);
    }
  };

  const cancelEventHandler = async () => {
    setShowModal(true);
    const token = await getAccessTokenSilently();
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/participants/${eventId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setMessage(data.message);
    } catch (err) {
      console.log(err.response);
      setMessage(err.response.data);
    }
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setMessage('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5rem auto',
      }}
    >
      <div>
        {fetchedEvent === null ? (
          <Spinner />
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>{fetchedEvent.title}</Card.Title>
              <Card.Subtitle className='mb-4 '>
                Location: {fetchedEvent.address}
              </Card.Subtitle>
              <Card.Text>{`${
                fetchedEvent.maxParticipants - numParticipants
              } spots left`}</Card.Text>
              <Card.Text>
                Date: {dayjs(fetchedEvent.startTime).format('DD MMMM, YYYY')}
                <br></br>
                Time:{' '}
                {`${dayjs(fetchedEvent.startTime).format('HH:mm')} - ${dayjs(
                  fetchedEvent.endTime
                ).format('HH:mm')}`}{' '}
                <br></br>
                Number of participants: {numParticipants} <br></br>
                Register before:{' '}
                {dayjs(fetchedEvent.registerBefore).format(
                  'DD MMMM, YYYY - HH:mm'
                )}
                <br></br>
                Cancel before:{' '}
                {dayjs(fetchedEvent.cancelBefore).format(
                  'DD MMMM, YYYY - HH:mm'
                )}
                <br></br>
                Hosted by: {createdBy}
              </Card.Text>
              <>
                {isAuthenticated ? (
                  <div>
                    <Button
                      variant='info'
                      onClick={registerEventHandler}
                      className='mr-3'
                    >
                      Register
                    </Button>
                    <Button variant='warning' onClick={cancelEventHandler}>
                      Cancel
                    </Button>

                    <Modal
                      show={showModal}
                      onHide={closeModalHandler}
                      backdrop='static'
                      keyboard={false}
                      centered
                    >
                      <Modal.Body>
                        {!message ? <Spinner /> : `${message}`}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant='secondary' onClick={closeModalHandler}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                ) : (
                  <div className='text-primary text-center'>
                    <p>Please login to register!</p>
                  </div>
                  // <LoginBtn>Login to register</LoginBtn>
                )}
              </>
            </Card.Body>

            <Card.Footer border='info' className='text-center'>
              {fetchedEvent && (
                <small className='text-muted'>{`Created ${dayjs(
                  fetchedEvent.createdAt
                ).fromNow()}`}</small>
              )}
            </Card.Footer>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
