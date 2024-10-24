import React from 'react';
import './InputField.css';

const STYLES = ['input--credentials'];

export const InputField = ({ inputStyle, type, id, placeholder, name, onChange }) => {
  const checkInputStyle = STYLES.includes(inputStyle) ? inputStyle : STYLES[0];

  return (
    <input 
      className={`input ${checkInputStyle}`}
      type={type}
      id={id}
      placeholder={placeholder} 
      name={name}
      onChange={onChange}
    /> 
  )
}

