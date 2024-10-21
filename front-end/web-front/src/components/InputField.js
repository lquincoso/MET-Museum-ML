import React from 'react';
import './InputField.css';

const STYLES = ['input--credentials'];

export const InputField = ({ inputStyle, type, placeholder, name, value, onChange }) => {
  const checkInputStyle = STYLES.includes(inputStyle) ? inputStyle : STYLES[0];

  return (
    <input 
      className={`input ${checkInputStyle}`}
      type={type}
      placeholder={placeholder} 
      name={name}
      value={value} 
      onChange={onChange}
    /> 
  )
}

