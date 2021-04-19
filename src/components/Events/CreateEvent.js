import React, { useState } from 'react';
import Select from 'react-select';
import dayjs from 'dayjs';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import InputField from '../Form/InputField';
import { options } from '../../utils/duration-opts';

import './CreateEvent.css';

const CreateEvent = () => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [registerDate, setRegisterDate] = useState(new Date());
  const [cancelDate, setCancelDate] = useState(registerDate);
  const [selectedOpt, setSelectedOpt] = useState(null);

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

    const { value: duration } = selectedOpt;
    const startTime = dayjs(startDate).format();
    const endTime = dayjs(startTime).add(parseInt(duration), 'h').format();
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
      console.log(err);
    }
  };

  return (
    <section>
      <div className='container'>
        <h3 className='text-center'>You can create new event here</h3>
        <div className='col-lg-12'>
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
            <div className='form-group'>
              <label htmlFor='start-at'>Starts at</label>
              <DatePicker
                name='startDate'
                wrapperClassName='date-picker'
                className='form-control'
                selected={startDate}
                filterTime={filterPassedTime}
                onChange={startDateHandler}
                showTimeSelect='true'
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='Time'
                dateFormat='MMMM dd, yyyy hh:mm aa'
              />
            </div>

            {/* Durations */}
            <div className='form-group'>
              <label>Duration (in hours)</label>
              <Select
                options={options}
                defaultValue={selectedOpt}
                onChange={setSelectedOpt}
              />
            </div>

            {/* Register Before */}
            <div className='form-group'>
              <label htmlFor='start-at'>Register before</label>
              <DatePicker
                name='registerDate'
                wrapperClassName='date-picker'
                className='form-control'
                selected={registerDate}
                filterTime={filterRegisterTime}
                minDate={new Date()}
                maxDate={startDate}
                onChange={registerDateHandler}
                showTimeSelect='true'
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='Time'
                dateFormat='MMMM dd, yyyy hh:mm aa'
              />
            </div>

            {/* Cancel Before */}
            <div className='form-group'>
              <label htmlFor='start-at'>Cancel before</label>
              <DatePicker
                name='cancelDate'
                wrapperClassName='date-picker'
                className='form-control'
                selected={cancelDate}
                filterTime={filterRegisterTime}
                minDate={new Date()}
                maxDate={startDate}
                onChange={cancelDateHandler}
                showTimeSelect='true'
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='Time'
                dateFormat='MMMM dd, yyyy hh:mm aa'
              />
            </div>

            {/* No. min participants */}
            {/* <InputField
              label='Number of Min Participants'
              type='number'
              placeHolder='No. Min Participants'
              name='minParticipants'
              value={formData.minParticipants}
              onChange={inputChangeHandler}
            /> */}

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

            <button className='btn btn-primary' type='submit'>
              Create
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateEvent;
