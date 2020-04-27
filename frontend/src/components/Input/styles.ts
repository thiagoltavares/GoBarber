import styled, { css } from 'styled-components';
import ToolTip from '../ToolTip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}


    ${(props) =>
      props.isErrored &&
      css`
        border-color: #c53030;
      `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
      -webkit-transition-delay: 9999s;
    }

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(ToolTip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
