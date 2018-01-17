import React from 'react';
import styled from 'styled-components';

export const Alert = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: #FFF;
  background: #999;
  border-radius: 100%;
`;

export const AlertIcon = () => (
  <Alert>!</Alert>
);
