import React, { useState } from 'react';
import Select from 'react-select';
import { durationPickerOpts } from '../../utils/duration-picker-opts';

const DurationPicker = (props) => {
  const optChangeHandler = (newVal) => {
    console.log(newVal);
    props.setOptValue(newVal.value);
  };

  return (
    <Select
      options={durationPickerOpts}
      value={{ label: props.val, value: props.val }}
      onChange={(value) => optChangeHandler(value)}
      //defaultValue={{ label: 100, value: 100 }}
      isDisabled={props.readOnly}
    />
  );
};

export default DurationPicker;
