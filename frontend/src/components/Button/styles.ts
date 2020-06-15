import styled, { keyframes } from 'styled-components';
import { FiLoader } from 'react-icons/fi';

import { shade } from 'polished';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#FF9000')};
  }
`;

export const Loader = styled(FiLoader)`
  animation: ${spin} 2s infinite ease-in-out;
`;
