import React from 'react';
import { string } from 'prop-types';

const RegisterSelect = ({
  label,
  name,
  width,
  dropdownVisible,
  options,
  value,
  onChange,
  onChangeDropdownVisible
}) => (
  <div
    className="register-select"
    style={{ width }}
  >
    {label && (<label htmlFor={`input-${name}`}>{label}</label>)}
    {/* <input
      type="text"
      id={`input-${name}`}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    /> */}
    <div
      className="register-select__select"
      onClick={() => onChangeDropdownVisible(name)}
    >
      <span>{value}</span>
      <ul className={dropdownVisible === name && 'show'}>
        <div className="overlay" />
        {options.map(item => (
          <li onClick={() => {
            onChange(item);
            onChangeDropdownVisible('');
          }}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

RegisterSelect.propTypes = {
  label: string.isRequired,
  name: string.isRequired
};

export default RegisterSelect;
