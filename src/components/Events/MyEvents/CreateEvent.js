import React, { useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

import InputField from '../../Form/InputField';
import DurationPicker from '../../Form/DurationPicker';
import DateTimePicker from '../../Form/DateTimePicker';

import './CreateEvent.css';

const CreateEvent = () => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [registerDate, setRegisterDate] = useState(new Date());
  const [cancelDate, setCancelDate] = useState(registerDate);
  const [optValue, setOptValue] = useState(null);

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
    setFormData((prevProps) => ({
      ...prevProps,
      [e.target.name]: e.target.value,
    }));
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

  const submitHandler = async (e) => {
    e.preventDefault();

    const startTime = dayjs(startDate).format();
    const endTime = dayjs(startTime).add(optValue, 'h').format();
    const registerBefore = dayjs(registerDate).format();
    const cancelBefore = dayjs(cancelDate).format();
    const event = {
      ...formData,
      startTime,
      endTime,
      registerBefore,
      cancelBefore,
    };

    try {
      const token = await getAccessTokenSilently();
      const result = await axios.post('http://localhost:5000/events', event, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      history.push('/');
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className='create-event'>
      <h3 className='text-center'>Create new event here</h3>

      <form onSubmit={submitHandler}>
        <InputField
          label='Title'
          type='text'
          placeHolder='Title'
          name='title'
          value={formData.title}
          onChange={inputChangeHandler}
        />

        <InputField
          label='Address'
          type='text'
          placeHolder='Address'
          name='address'
          value={formData.address}
          onChange={inputChangeHandler}
        />

        {/* Starting at */}
        <DateTimePicker
          htmlFor='start-at'
          label='Starts at'
          name='startDate'
          selectedTime={startDate}
          filterTime={filterPassedTime}
          onChange={startDateHandler}
        />

        {/* Durations */}
        <div className='form-group'>
          <label>Duration (in hours)</label>
          <DurationPicker val={optValue} setOptValue={setOptValue} />
        </div>

        {/* Register before */}
        <DateTimePicker
          htmlFor='register-before'
          label='Register before'
          name='registerDate'
          selectedTime={registerDate}
          filterTime={filterRegisterTime}
          maxDate={startDate}
          onChange={registerDateHandler}
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
        />

        {/* No. max participants */}
        <InputField
          label='Number of Max Participants'
          type='number'
          placeHolder='No. Max Participant'
          name='maxParticipants'
          value={formData.maxParticipants}
          onChange={inputChangeHandler}
        />

        {/* Description */}
        <InputField
          label='Description'
          type='textarea'
          placeHolder='Description'
          name='description'
          value={formData.description}
          onChange={inputChangeHandler}
        />

        <button className='btn btn-primary mr-3' type='submit'>
          Create
        </button>

        <button
          className='btn btn-primary'
          type='submit'
          onClick={() => history.push('/')}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
