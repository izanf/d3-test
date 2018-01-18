import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  color: #999;
  margin-right: 1rem;
  white-space: nowrap;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  width: ${props => props.widthSize ? props.widthSize : '0'};
  min-height: 76px;
  padding: .5rem 1rem;
  position: relative;

  button {
    text-decoration: underline;
    color: #999;
    border: none;
    background: transparent;
    margin-left: 1rem;
    white-space: nowrap;

    &:hover {
      color: #555;
    }

    &:focus {
      outline: none;
    }
  }

@media (max-width: 576px) {
  align-items: flex-end;
  flex-wrap: wrap;
  width: ${props => props.widthMobileSize && props.widthMobileSize};
  min-height: 102px;

  button {
    margin: 0 auto;
  }
}
`;

const Input = styled.input`
  font-size: 2rem;
  text-indent: 1rem;
  width: 100%;
  padding: 1.7rem;
  border: 2px solid #CCC;
  border-color: ${props => inputStatus(props.error)};
  border-radius: 50px;

  &::-webkit-input-placeholder {
    visibility: hidden;
  }
    
  &:-moz-placeholder {
    visibility: hidden;
  }
    
  &::-moz-placeholder {
    visibility: hidden;
  }
    
  &:-ms-input-placeholder {  
    visibility: hidden;
  }

  &:focus {
    outline: none;

    &::-webkit-input-placeholder {
      visibility: visible;
    }
      
    &:-moz-placeholder {
      visibility: visible;
    }
      
    &::-moz-placeholder {
      visibility: visible;
    }
      
    &:-ms-input-placeholder {  
      visibility: visible;
    }
  }
`;

const InputErrorIcon = styled.span`
  position: absolute;
  right: 3rem;
  
  &:after {
    content: "!";
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    color: #FFF;
    background: #999;
    border-radius: 100%;
  }

@media (max-width: 576px) {
  margin-top: -2.3rem;
}
`;

const inputStatus = (status) => {
  switch (status) {
    case false:
      return '#64a80b';
    case true:
      return '#b7102c';
    case '':
    default:
      return '#CCC';
  }
};

const SelectBox = styled.div`
  font-size: 2rem;
  text-indent: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 66px;
  padding: 1.7rem;
  border: 2px solid #CCC;
  border-color: ${props => inputStatus(props.error)};
  border-radius: 50px;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    right: 2rem;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #999;
  }

@media (max-width: 576px) {
  height: 66px;
}
`;

const SelectList = styled.ul`
  display: ${props => props.dropdownVisible === props.name ? 'block' : 'none'};
  position: absolute;
  top: calc(100% - 1rem);
  left: 0;
  width: 100%;
  max-height: 150px;
  background: #FFF;
  border: 2px solid #CCC;
  border-radius: 5px;
  padding: 0;
  overflow-y: auto;
  z-index: 2;
`;

const SelectOption = styled.li`
  list-style: none;
  cursor: pointer;

  &:hover {
    background: #EEE;
  }
`;

const SelectOverlay = styled.div`
  display: ${props => props.dropdownVisible === props.name ? 'block' : 'none'};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: default;
`;

export const RegisterInput = ({
  label,
  name,
  width,
  widthMobile,
  placeholder,
  value,
  onChange,
  error,
  children
}) => (
    <Box widthSize={width} widthMobileSize={widthMobile}>
      {label && (<Label htmlFor={`input-${name}`}>{label}</Label>)}
      <Input
        type="text"
        id={`input-${name}`}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        error={error}
      />
      {error && <InputErrorIcon />}
      {children}
    </Box>
  );

export const RegisterSelect = ({
  label,
  name,
  width,
  widthMobile,
  dropdownVisible,
  options,
  value,
  onChange,
  onChangeDropdownVisible,
  error
}) => (
    <Box widthSize={width} widthMobileSize={widthMobile}>
      {label && (<Label htmlFor={`input-${name}`}>{label}</Label>)}
      <SelectBox onClick={() => onChangeDropdownVisible(name)} error={error}>
        <span>{value}</span>
        <SelectOverlay
          dropdownVisible={dropdownVisible}
          name={name}
          onClick={() => onChangeDropdownVisible('')}
        />
        <SelectList
          dropdownVisible={dropdownVisible}
          name={name}
        >
          {options.map(item => (
            <SelectOption
              key={item}
              onClick={() => {
                onChange(item);
                onChangeDropdownVisible('');
              }}
            >{item}</SelectOption>
          ))}
        </SelectList>
      </SelectBox>
    </Box>
  );

RegisterInput.propTypes = {
  label: string.isRequired,
  name: string.isRequired
};

export default RegisterInput;
