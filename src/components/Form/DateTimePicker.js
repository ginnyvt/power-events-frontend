import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './DateTimePicker.css';

const DateTimePicker = ({
  label,
  htmlFor,
  name,
  onChange,
  maxDate,
  selectedTime,
  filterTime,
  readOnly,
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={htmlFor}>{label}</label>
      <DatePicker
        wrapperClassName='datetime-picker'
        className='form-control'
        readOnly={readOnly}
        name={name}
        onChange={onChange}
        selected={selectedTime}
        filterTime={filterTime}
        minDate={new Date()}
        maxDate={maxDate}
        showTimeSelect='true'
        timeFormat='HH:mm'
        timeIntervals={15}
        timeCaption='Time'
        dateFormat='MMMM dd, yyyy hh:mm aa'
      />
    </div>
  );
};

export default DateTimePicker;
