import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const MySingleEvent = ({
  event,
  showModal,
  closeModalHandler,
  showModalHandler,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  dayjs.extend(relativeTime);
  const history = useHistory();

  const checkPastTime = () => {
    const current = dayjs().format();
    return current > event.startTime;
  };

  const cancelEventHandler = async () => {
    const token = await getAccessTokenSilently();
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/events/${event._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { status: 'cancelled' },
      });

      console.log(data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Subtitle className='mb-4 '>
            Location: {event.address}
          </Card.Subtitle>
          {/* <Card.Text>something</Card.Text> */}
          <Card.Text>
            Date: {dayjs(event.startTime).format('DD MMMM, YYYY')}
            <br></br>
            Time:{' '}
            {`${dayjs(event.startTime).format('HH:mm')} - ${dayjs(
              event.endTime
            ).format('HH:mm')}`}{' '}
            <br></br>
            Number of max participants: {event.maxParticipants} <br></br>
            Register before:{' '}
            {dayjs(event.registerBefore).format('DD MMMM, YYYY - HH:mm')}{' '}
            <br></br>
            Cancel before:{' '}
            {dayjs(event.cancelBefore).format('DD MMMM, YYYY - HH:mm')}
            <br></br>
            Description: {event.description || 'N/G'}
          </Card.Text>
          <>
            <Button
              variant='info'
              className='mr-3'
              onClick={() => {
                history.push(`/edit/${event._id}`);
              }}
              disabled={
                event.status === 'cancelled' || checkPastTime() ? true : false
              }
            >
              Edit Event
            </Button>
            <Button
              variant='warning'
              onClick={cancelEventHandler}
              disabled={
                event.status === 'cancelled' || checkPastTime() ? true : false
              }
            >
              Cancel Event
            </Button>

            <Modal
              show={showModal}
              onHide={closeModalHandler}
              backdrop='static'
              keyboard={false}
              centered
            >
              <Modal.Body>Are you sure to cancel this event?</Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={closeModalHandler}>
                  Close
                </Button>
                <Button variant='primary' onClick={cancelEventHandler}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Card.Body>

        <Card.Footer border='info' className='text-center'>
          <small className='text-muted'>{`Created ${dayjs(
            event.createdAt
          ).fromNow()}`}</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default MySingleEvent;
