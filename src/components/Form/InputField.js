import React, { useState } from 'react';

const InputField = ({ value, label, placeHolder, type, onChange, name }) => {
  // const inputChangeHandler = (e) => {
  //   const { value } = e.target;
  //   onChange(value);
  // };

  return (
    <div className='form-group'>
      {label && <label htmlFor={name}>{label}</label>}
      {type === 'textarea' ? (
        <textarea
          className='form-control'
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          name={name}
        ></textarea>
      ) : (
        <input
          type={type}
          className='form-control'
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          name={name}
        />
      )}
    </div>
  );
};

export default InputField;
