import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory, useParams } from 'react-router-dom';

import Spinner from '../../Spinner/Spinner';
import InputField from '../../Form/InputField';
import DurationPicker from '../../Form/DurationPicker';
import DateTimePicker from '../../Form/DateTimePicker';
import { Modal, Button } from 'react-bootstrap';
import './EditEvent.css';

const EditEvent = () => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const { eventId } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [registerDate, setRegisterDate] = useState(null);
  const [cancelDate, setCancelDate] = useState(registerDate);
  const [fetchedEvent, setFetchedEvent] = useState(null);
  const [optValue, setOptValue] = useState(null);
  const [readonly, setReadonly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [goBack, setGoBack] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    maxParticipants: '',
    minParticipants: '',
    description: '',
  });

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterRegisterTime = (time) => {
    const currentDate = startDate;
    const selectedDate = new Date(time);
    return currentDate.getTime() > selectedDate.getTime();
  };

  const inputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const startDateHandler = (date) => {
    setStartDate(date);
  };

  const registerDateHandler = (date) => {
    setRegisterDate(date);
  };

  const cancelDateHandler = (date) => {
    setCancelDate(date);
  };

  const checkEditTime = (time) => {
    const current = dayjs().format;
    if (current > time) {
      return false;
    }
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setMessage('');
    if (goBack) {
      history.push('/my-events');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const startTime = dayjs(startDate).format();
    const endTime = dayjs(startTime).add(optValue, 'h').format();
    const updatedEvent = {
      ...formData,
      startTime,
      endTime,
      registerBefore: dayjs(registerDate).format(),
      cancelBefore: dayjs(cancelDate).format(),
    };
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/events/${eventId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: updatedEvent,
      });
      setMessage(data.message);
      setGoBack(true);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/events/${eventId}`
      );
      const e = data.results;
      if (checkEditTime(e.registerBefore) || checkEditTime(e.cancelBefore)) {
        setReadonly(true);
      }

      const duration =
        (dayjs(data.results.endTime) - dayjs(data.results.startTime)) / 3600000;
      setOptValue(duration);
      setFormData({
        ...formData,
        title: e.title,
        address: e.address,
        maxParticipants: e.maxParticipants,
        minParticipants: e.minParticipants,
        description: e.description || '',
      });
      setStartDate(dayjs(e.startTime).toDate());
      setRegisterDate(dayjs(e.registerBefore).toDate());
      setCancelDate(dayjs(e.cancelBefore).toDate());
      setFetchedEvent(data.results);
    };

    fetchEvent();
  }, []);

  return fetchedEvent === null ? (
    <Spinner />
  ) : (
    <div className='edit-event'>
      <h3>Edit your event here</h3>

      <form onSubmit={submitHandler}>
        <InputField
          label='Title'
          type='text'
          name='title'
          value={formData.title}
          onChange={inputChangeHandler}
          readOnly={readonly}
        />

        <InputField
          label='Address'
          type='text'
          name='address'
          value={formData.address}
          onChange={inputChangeHandler}
          readOnly={readonly}
        />

        {/* Starting at */}
        <DateTimePicker
          htmlFor='start-at'
          label='Starts at'
          name='startDate'
          selectedTime={startDate}
          filterTime={filterPassedTime}
          onChange={startDateHandler}
          readOnly={readonly}
        />

        {/* Duration Picker */}
        <div className='form-group'>
          <label>Duration (in hours)</label>
          <DurationPicker
            val={optValue}
            setOptValue={setOptValue}
            readOnly={readonly}
          />
        </div>

        {/* No. max participants */}
        <InputField
          label='Number of Max Participants'
          type='number'
          placeHolder='No. Max Participant'
          name='maxParticipants'
          value={formData.maxParticipants}
          onChange={inputChangeHandler}
          readOnly={readonly}
        />

        {/* Register before */}
        <DateTimePicker
          htmlFor='register-before'
          label='Register before'
          name='registerDate'
          selectedTime={registerDate}
          filterTime={filterRegisterTime}
          maxDate={startDate}
          onChange={registerDateHandler}
          readOnly={readonly}
        />

        {/* Cancel before */}
        <DateTimePicker
          htmlFor='cancel-before'
          label='Cancel before'
          name='cancelDate'
          selectedTime={cancelDate}
          filterTime={filterRegisterTime}
          maxDate={startDate}
          onChange={cancelDateHandler}
          readOnly={readonly}
        />

        {/* Description */}
        <InputField
          label='Description'
          type='textarea'
          placeHolder='Description'
          name='description'
          value={formData.description}
          onChange={inputChangeHandler}
          readOnly={readonly}
        />

        <button
          type='submit'
          className='btn btn-primary mr-3'
          onClick={showModalHandler}
        >
          Submit
        </button>

        <Modal
          show={showModal}
          onHide={closeModalHandler}
          backdrop='static'
          keyboard={false}
          centered
        >
          <Modal.Body>{!message ? <Spinner /> : `${message}`}</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModalHandler}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <button
          className='btn btn-primary'
          onClick={() => {
            history.push('/my-events');
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
