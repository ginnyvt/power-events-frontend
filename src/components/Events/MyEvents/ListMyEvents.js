import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import MySingleEvent from './MySingleEvent';
import Spinner from '../../Spinner/Spinner';

const ListMyEvents = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchedEvents = async () => {
      const token = await getAccessTokenSilently();
      const { data } = await axios({
        method: 'GET',
        url: `http://localhost:5000/events/myevents`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.results.length !== 0) {
        setMyEvents(data.results);
      }
      setLoading(false);
    };

    fetchedEvents();
  }, []);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const renderEvent = () => {
    return !myEvents.length ? (
      <Container>
        <p>You have no events</p>
      </Container>
    ) : (
      <Container>
        <h3>List my events here</h3>
        <Row>
          {myEvents.map((e) => {
            return (
              <Col key={e._id}>
                <MySingleEvent
                  event={e}
                  showModalHandler={showModalHandler}
                  closeModalHandler={closeModalHandler}
                  showModal={showModal}
                  disableBtn
                  disableBtnHandler
                />
              </Col>
            );
          })}
        </Row>
        <Button className='mt-4'>Back</Button>
      </Container>
    );
  };

  if (loading) {
    return <Spinner />;
  } else {
    return renderEvent();
  }
};

export default ListMyEvents;
