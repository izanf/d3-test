import React from 'react';
import { string } from 'prop-types';

const RegisterInput = ({ label, name, width, placeholder, value, onChange, children }) => (
  <div className="register-input" style={{ width }}>
    {label && (<label htmlFor={`input-${name}`}>{label}</label>)}
    <input
      type="text"
      id={`input-${name}`}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {children}
  </div>
);

RegisterInput.propTypes = {
  label: string.isRequired,
  name: string.isRequired
};

export default RegisterInput;
