import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const SingleEvent = ({ event, disableBtn }) => {
  dayjs.extend(relativeTime);
  const history = useHistory();
  const [createdBy, setCreatedBy] = useState('');

  const fromNow = dayjs(event.createdAt).fromNow();

  useEffect(() => {
    const getEvent = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/events/${event._id}`
      );
      const fetchedEvent = data.results;
      setCreatedBy(fetchedEvent.creator.name);
    };

    getEvent();
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle className='mb-4 '>
          Location: {event.address}
        </Card.Subtitle>
        <Card.Text>
          Date: {dayjs(event.startTime).format('DD MMMM, YYYY')}
          <br></br>
          Time: {dayjs(event.startTime).format('HH:mm')} <br></br>
          Hosted by: {createdBy}
        </Card.Text>

        <Button
          variant='info'
          disabled={disableBtn}
          onClick={() => {
            history.push(`/events/${event._id}`);
          }}
        >
          Details
        </Button>
      </Card.Body>
      <Card.Footer border='info' className='text-center'>
        <small className='text-muted'>Created {fromNow}</small>
      </Card.Footer>
    </Card>
  );
};

export default SingleEvent;
